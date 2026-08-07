using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using UglyToad.PdfPig;
using JobPortal.CandidateService.DTOs.AI;

namespace JobPortal.CandidateService.Services;

public class ResumeParserService
{
    private readonly string? _geminiApiKey;
    private readonly string _geminiModel;
    private readonly HttpClient _httpClient;

    public ResumeParserService(IConfiguration configuration, HttpClient httpClient)
    {
        _geminiApiKey = configuration["Gemini:ApiKey"] ?? Environment.GetEnvironmentVariable("GEMINI_API_KEY");
        _geminiModel = configuration["Gemini:Model"] ?? "gemini-3.5-flash";
        _httpClient = httpClient;
    }

    public async Task<ExtractedResumeDto> ParseResumeFileAsync(IFormFile file)
    {
        if (string.IsNullOrWhiteSpace(_geminiApiKey))
        {
            throw new InvalidOperationException(
                "Gemini API Key is missing. Please configure Gemini:ApiKey in appsettings.json or set GEMINI_API_KEY environment variable.");
        }

        string rawText = "";
        try
        {
            using (var stream = file.OpenReadStream())
            {
                var textBuilder = new StringBuilder();
                using (var pdf = PdfDocument.Open(stream))
                {
                    foreach (var page in pdf.GetPages())
                    {
                        textBuilder.AppendLine(page.Text);
                    }
                }
                rawText = textBuilder.ToString();
            }
        }
        catch (Exception e)
        {
            throw new Exception("PdfPig failed to extract raw text from resume file: " + e.Message, e);
        }

        Console.WriteLine("=== STRICT GOOGLE GEMINI AI RESUME PARSER SERVICE ===");
        Console.WriteLine($"Extracted raw text length: {rawText?.Length ?? 0}");
        if (!string.IsNullOrWhiteSpace(rawText))
        {
            var snippet = rawText.Substring(0, Math.Min(200, rawText.Length));
            Console.WriteLine($"Raw text snippet: {Regex.Replace(snippet, @"\s+", " ")}");
        }

        try
        {
            var result = await CallGeminiAiParserAsync(rawText ?? "");
            Console.WriteLine("🤖 PARSED STRICTLY AND SUCCESSFULLY USING GOOGLE GEMINI AI!");
            return result;
        }
        catch (Exception e)
        {
            Console.Error.WriteLine("Strict Gemini AI Parsing Error: " + e.Message);
            throw new Exception("Strict Gemini AI Parsing failed: " + e.Message, e);
        }
    }

    private async Task<ExtractedResumeDto> CallGeminiAiParserAsync(string rawText)
    {
        var modelsToTry = new List<string>();
        if (!string.IsNullOrWhiteSpace(_geminiModel))
        {
            modelsToTry.Add(_geminiModel.Trim());
        }
        foreach (var m in new[] { "gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-flash-latest" })
        {
            if (!modelsToTry.Contains(m))
            {
                modelsToTry.Add(m);
            }
        }

        Exception? lastException = null;
        foreach (var modelName in modelsToTry)
        {
            try
            {
                Console.WriteLine($"Attempting Gemini API request with model: {modelName}");
                return await ExecuteGeminiApiCallAsync(rawText, modelName);
            }
            catch (Exception e)
            {
                Console.Error.WriteLine($"Gemini API request failed for model '{modelName}': {e.Message}");
                lastException = e;
            }
        }
        throw lastException ?? new Exception("All Gemini AI models failed");
    }

    private async Task<ExtractedResumeDto> ExecuteGeminiApiCallAsync(string rawText, string modelName)
    {
        var url = $"https://generativelanguage.googleapis.com/v1beta/models/{modelName}:generateContent?key={_geminiApiKey}";

        var prompt = $@"You are an expert HR resume parser. Extract candidate details strictly from the following resume text.
Return STRICT JSON with keys:
""summary"" (string),
""skills"" (array of strings),
""experiences"" (array of objects with ""title"",""company"",""startDate"",""endDate"",""description""),
""educations"" (array of objects with ""degree"",""institution"",""passoutYear""),
""projects"" (array of objects with ""title"",""description"",""projectUrl"",""technologies"").
Note: ""technologies"" should be a comma-separated string of technologies/tools used in that project (e.g. ""Java, Spring Boot, MySQL"").
Do NOT include markdown formatting or extra commentary.

Resume Content:
{rawText}
";

        var payload = new
        {
            contents = new[]
            {
                new
                {
                    parts = new[]
                    {
                        new { text = prompt }
                    }
                }
            }
        };

        var response = await _httpClient.PostAsJsonAsync(url, payload);
        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Gemini API returned status code {response.StatusCode}: {errorContent}");
        }

        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        var textResponse = json.GetProperty("candidates")[0]
                              .GetProperty("content")
                              .GetProperty("parts")[0]
                              .GetProperty("text")
                              .GetString();

        if (string.IsNullOrWhiteSpace(textResponse))
        {
            throw new Exception("Empty response body from Gemini model: " + modelName);
        }

        int jsonStart = textResponse.IndexOf("{");
        int jsonEnd = textResponse.LastIndexOf("}");
        if (jsonStart != -1 && jsonEnd != -1)
        {
            var cleanJson = textResponse.Substring(jsonStart, jsonEnd - jsonStart + 1);
            Console.WriteLine($"🤖 PARSED SUCCESSFULLY USING GOOGLE GEMINI MODEL ({modelName})!");
            
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return JsonSerializer.Deserialize<ExtractedResumeDto>(cleanJson, options) 
                   ?? throw new Exception("Failed to deserialize clean JSON to ExtractedResumeDto");
        }

        throw new Exception("Could not find valid JSON block in Gemini response");
    }
}
