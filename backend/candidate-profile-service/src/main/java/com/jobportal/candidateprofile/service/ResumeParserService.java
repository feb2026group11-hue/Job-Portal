package com.jobportal.candidateprofile.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobportal.candidateprofile.dto.ai.*;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeParserService {

    @Value("${spring.ai.gemini.api-key:}")
    private String geminiApiKey;

    @Value("${spring.ai.gemini.model:gemini-3.5-flash}")
    private String geminiModel;

    private final Tika tika = new Tika();
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ExtractedResumeDto parseResumeFile(MultipartFile file) {
        if (geminiApiKey == null || geminiApiKey.isBlank()) {
            throw new IllegalStateException(
                    "Gemini API Key is missing. Please configure spring.ai.gemini.api-key in application.properties or set GEMINI_API_KEY environment variable.");
        }

        String rawText = "";
        try {
            rawText = tika.parseToString(file.getInputStream());
        } catch (Exception e) {
            throw new RuntimeException("Apache Tika failed to extract raw text from resume file: " + e.getMessage(), e);
        }

        System.out.println("=== STRICT GOOGLE GEMINI AI RESUME PARSER SERVICE ===");
        System.out.println("Extracted raw text length: " + (rawText != null ? rawText.length() : 0));
        if (rawText != null && !rawText.isBlank()) {
            System.out.println("Raw text snippet: "
                    + rawText.substring(0, Math.min(200, rawText.length())).replaceAll("\\s+", " "));
        }

        try {
            ExtractedResumeDto result = callGeminiAiParser(rawText);
            System.out.println("🤖 PARSED STRICTLY AND SUCCESSFULLY USING GOOGLE GEMINI AI!");
            return result;
        } catch (Exception e) {
            System.err.println("Strict Gemini AI Parsing Error: " + e.getMessage());
            throw new RuntimeException("Strict Gemini AI Parsing failed: " + e.getMessage(), e);
        }
    }

    private ExtractedResumeDto callGeminiAiParser(String rawText) throws Exception {
        List<String> modelsToTry = new ArrayList<>();
        if (geminiModel != null && !geminiModel.isBlank()) {
            modelsToTry.add(geminiModel.trim());
        }
        for (String m : List.of("gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-flash-latest")) {
            if (!modelsToTry.contains(m)) {
                modelsToTry.add(m);
            }
        }

        Exception lastException = null;
        for (String modelName : modelsToTry) {
            try {
                System.out.println("Attempting Gemini API request with model: " + modelName);
                return executeGeminiApiCall(rawText, modelName);
            } catch (Exception e) {
                System.err.println("Gemini API request failed for model '" + modelName + "': " + e.getMessage());
                lastException = e;
            }
        }
        throw lastException != null ? lastException : new RuntimeException("All Gemini AI models failed");
    }

    private ExtractedResumeDto executeGeminiApiCall(String rawText, String modelName) throws Exception {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key="
                + geminiApiKey;

        String prompt = """
                You are an expert HR resume parser. Extract candidate details strictly from the following resume text.
                Return STRICT JSON with keys:
                "summary" (string),
                "skills" (array of strings),
                "experiences" (array of objects with "title","company","startDate","endDate","description"),
                "educations" (array of objects with "degree","institution","passoutYear"),
                "projects" (array of objects with "title","description","projectUrl","technologies").
                Note: "technologies" should be a comma-separated string of technologies/tools used in that project (e.g. "Java, Spring Boot, MySQL").
                Do NOT include markdown formatting or extra commentary.

                Resume Content:
                %s
                """.formatted(rawText);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String jsonPayload = """
                {
                  "contents": [{
                    "parts": [{"text": %s}]
                  }]
                }
                """.formatted(objectMapper.writeValueAsString(prompt));

        HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            JsonNode root = objectMapper.readTree(response.getBody());
            String textResponse = root.path("candidates").get(0).path("content").path("parts").get(0).path("text")
                    .asText();

            int jsonStart = textResponse.indexOf("{");
            int jsonEnd = textResponse.lastIndexOf("}");
            if (jsonStart != -1 && jsonEnd != -1) {
                String cleanJson = textResponse.substring(jsonStart, jsonEnd + 1);
                System.out.println("🤖 PARSED SUCCESSFULLY USING GOOGLE GEMINI MODEL (" + modelName + ")!");
                return objectMapper.readValue(cleanJson, ExtractedResumeDto.class);
            }
        }

        throw new RuntimeException("Empty response body from Gemini model: " + modelName);
    }

    private ExtractedResumeDto parseExtractedTextDynamically(String text) {
        if (text == null)
            text = "";

        String summary = extractDynamicSummary(text);
        List<String> skills = extractDynamicSkills(text);
        List<ExtractedExperienceDto> experiences = extractDynamicExperiences(text);
        List<ExtractedEducationDto> educations = extractDynamicEducations(text);
        List<ExtractedProjectDto> projects = extractDynamicProjects(text);

        return ExtractedResumeDto.builder()
                .summary(summary)
                .skills(skills)
                .experiences(experiences)
                .educations(educations)
                .projects(projects)
                .build();
    }

    private String extractDynamicSummary(String text) {
        String section = extractSectionText(text, "SUMMARY", "PROFESSIONAL SUMMARY", "ABOUT ME", "OBJECTIVE",
                "PROFILE");
        if (!section.isEmpty()) {
            return section.trim();
        }

        String[] lines = text.split("\n");
        StringBuilder sb = new StringBuilder();
        int lineCount = 0;
        for (String l : lines) {
            String trimmed = l.trim();
            if (!trimmed.isEmpty() && !isHeading(trimmed) && lineCount < 4) {
                sb.append(trimmed).append(" ");
                lineCount++;
            }
        }
        return sb.toString().trim();
    }

    private List<String> extractDynamicSkills(String text) {
        Set<String> resultSet = new LinkedHashSet<>();
        String section = extractSectionText(text, "SKILLS", "TECHNICAL SKILLS", "TECHNOLOGIES", "CORE COMPETENCIES",
                "SKILL");

        String targetText = !section.isEmpty() ? section : text;

        List<String> techCatalog = Arrays.asList(
                "Java", "Spring Boot", "React", "JavaScript", "TypeScript", "SQL", "MySQL", "PostgreSQL",
                "Python", "HTML", "CSS", "REST API", "Microservices", "Docker", "Kubernetes", "Git", "C++", "C#",
                ".NET",
                "Angular", "Vue.js", "Node.js", "Express", "MongoDB", "Redis", "Kafka", "AWS", "GCP", "Linux");

        for (String tech : techCatalog) {
            Pattern p = Pattern.compile("(?i)\\b" + Pattern.quote(tech) + "\\b");
            if (p.matcher(targetText).find()) {
                resultSet.add(tech);
            }
        }

        if (!section.isEmpty()) {
            String[] tokens = section.split("[,;•|\\n\\r]+");
            for (String t : tokens) {
                String clean = t.replaceAll("[^a-zA-Z0-9+#.\\s-]", "").trim();
                if (clean.length() >= 2 && clean.length() <= 30 && !isHeading(clean)) {
                    resultSet.add(clean);
                }
            }
        }

        return new ArrayList<>(resultSet);
    }

    private List<ExtractedExperienceDto> extractDynamicExperiences(String text) {
        List<ExtractedExperienceDto> experiences = new ArrayList<>();
        String section = extractSectionText(text, "WORK EXPERIENCE", "EXPERIENCE", "EMPLOYMENT", "WORK HISTORY");
        String content = !section.isEmpty() ? section : text;

        String[] lines = content.split("\n");
        String currentTitle = null;
        String currentCompany = null;
        String startDate = null;
        String endDate = null;
        StringBuilder desc = new StringBuilder();

        for (String l : lines) {
            String line = l.trim();
            if (line.isEmpty())
                continue;

            Matcher dateMatcher = Pattern.compile(
                    "(\\b(?:19|20)\\d{2}(?:-\\d{2}-\\d{2})?\\b)\\s*(?:to|-|–)\\s*(\\b(?:19|20)\\d{2}(?:-\\d{2}-\\d{2})?|Present|Current\\b)",
                    Pattern.CASE_INSENSITIVE).matcher(line);
            if (dateMatcher.find()) {
                if (currentTitle != null || currentCompany != null) {
                    experiences.add(ExtractedExperienceDto.builder()
                            .title(currentTitle != null ? currentTitle : "Software Developer")
                            .company(currentCompany != null ? currentCompany : "Company")
                            .startDate(startDate)
                            .endDate(endDate)
                            .description(desc.toString().trim())
                            .build());
                    desc = new StringBuilder();
                }
                startDate = dateMatcher.group(1);
                endDate = dateMatcher.group(2);

                String lineWithoutDates = line.substring(0, dateMatcher.start()).trim();
                if (!lineWithoutDates.isEmpty()) {
                    String[] parts = lineWithoutDates.split("[-–|at]+");
                    if (parts.length >= 2) {
                        currentTitle = parts[0].trim();
                        currentCompany = parts[1].trim();
                    } else {
                        currentTitle = lineWithoutDates;
                    }
                }
            } else if (currentTitle != null) {
                desc.append(line).append(" ");
            } else if (line.contains("-") || line.contains(" at ")) {
                String[] parts = line.split("[-–|at]+");
                if (parts.length >= 2) {
                    currentTitle = parts[0].trim();
                    currentCompany = parts[1].trim();
                }
            }
        }

        if (currentTitle != null || currentCompany != null) {
            experiences.add(ExtractedExperienceDto.builder()
                    .title(currentTitle != null ? currentTitle : "Software Developer")
                    .company(currentCompany != null ? currentCompany : "Company")
                    .startDate(startDate)
                    .endDate(endDate)
                    .description(desc.toString().trim())
                    .build());
        }

        return experiences;
    }

    private List<ExtractedEducationDto> extractDynamicEducations(String text) {
        List<ExtractedEducationDto> educations = new ArrayList<>();
        String section = extractSectionText(text, "EDUCATION", "ACADEMIC", "QUALIFICATION", "EDUCATIONAL BACKGROUND");
        String content = !section.isEmpty() ? section : text;

        String[] lines = content.split("\n");
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty())
                continue;

            String lower = trimmed.toLowerCase();
            if (lower.contains("b.tech") || lower.contains("bachelor") || lower.contains("m.tech")
                    || lower.contains("master") || lower.contains("degree") || lower.contains("bsc")
                    || lower.contains("msc") || lower.contains("diploma")) {
                String passYear = null;
                Matcher yearMatcher = Pattern.compile("\\b(19|20)\\d{2}\\b").matcher(trimmed);
                if (yearMatcher.find()) {
                    passYear = yearMatcher.group();
                }

                String degree = trimmed;
                String inst = "University / College";
                if (trimmed.contains("-")) {
                    String[] parts = trimmed.split("-");
                    degree = parts[0].trim();
                    inst = parts[1].trim();
                }

                educations.add(ExtractedEducationDto.builder()
                        .degree(degree)
                        .institution(inst)
                        .passoutYear(passYear)
                        .build());
            }
        }

        return educations;
    }

    private List<ExtractedProjectDto> extractDynamicProjects(String text) {
        List<ExtractedProjectDto> projects = new ArrayList<>();
        String section = extractSectionText(text, "PROJECTS", "PERSONAL PROJECTS", "KEY PROJECTS");
        String content = !section.isEmpty() ? section : text;

        String[] lines = content.split("\n");
        String currentTitle = null;
        String projectUrl = null;
        StringBuilder desc = new StringBuilder();

        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty())
                continue;

            Matcher urlMatcher = Pattern.compile("https?://\\S+|github\\.com/\\S+").matcher(trimmed);
            if (urlMatcher.find()) {
                projectUrl = urlMatcher.group();
            }

            if (isProjectTitle(trimmed)) {
                if (currentTitle != null) {
                    projects.add(ExtractedProjectDto.builder()
                            .title(currentTitle)
                            .description(desc.toString().trim())
                            .projectUrl(projectUrl)
                            .build());
                    desc = new StringBuilder();
                    projectUrl = null;
                }
                currentTitle = trimmed.replaceAll("(?i)Project URL:.*", "").trim();
            } else if (currentTitle != null) {
                if (!trimmed.toLowerCase().startsWith("project url")) {
                    desc.append(trimmed).append(" ");
                }
            }
        }

        if (currentTitle != null) {
            projects.add(ExtractedProjectDto.builder()
                    .title(currentTitle)
                    .description(desc.toString().trim())
                    .projectUrl(projectUrl)
                    .build());
        }

        return projects;
    }

    private String extractSectionText(String text, String... headers) {
        String[] lines = text.split("\n");
        StringBuilder sectionContent = new StringBuilder();
        boolean capturing = false;

        for (String l : lines) {
            String trimmed = l.trim().toUpperCase();
            boolean matchesHeader = false;
            for (String h : headers) {
                if (trimmed.equals(h) || trimmed.startsWith(h + ":") || trimmed.startsWith(h + " -")) {
                    matchesHeader = true;
                    break;
                }
            }

            if (matchesHeader) {
                capturing = true;
                continue;
            } else if (capturing && isHeading(l.trim())) {
                break;
            }

            if (capturing) {
                sectionContent.append(l).append("\n");
            }
        }

        return sectionContent.toString().trim();
    }

    private boolean isHeading(String line) {
        String u = line.trim().toUpperCase();
        return u.equals("SUMMARY") || u.equals("PROFESSIONAL SUMMARY") || u.equals("SKILLS") ||
                u.equals("TECHNICAL SKILLS") || u.equals("EXPERIENCE") || u.equals("WORK EXPERIENCE") ||
                u.equals("EDUCATION") || u.equals("PROJECTS") || u.equals("CERTIFICATIONS");
    }

    private boolean isProjectTitle(String line) {
        if (line.length() < 3 || line.length() > 60)
            return false;
        String lower = line.toLowerCase();
        return !lower.startsWith("developed") && !lower.startsWith("designed") && !lower.startsWith("project url");
    }
}
