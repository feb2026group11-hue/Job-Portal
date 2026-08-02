import { Container, Grid, Box } from "@mui/material";
import ProfileHeader from "../Components/Candidate_Profile/ProfileHeader";
import AboutSection from "../Components/Candidate_Profile/AboutSection";
import SkillsSection from "../Components/Candidate_Profile/SkillsSection";
import ResumeSection from "../Components/Candidate_Profile/ResumeSection";
import ProfileCompletion from "../Components/Candidate_Profile/ProfileCompletion";
import StatsCard from "../Components/Candidate_Profile/StatsCard";
import ExperienceSection from "../Components/Candidate_Profile/ExperienceSection";
import EducationSection from "../Components/Candidate_Profile/EducationSection";
import ProjectsSection from "../Components/Candidate_Profile/ProjectsSection";
import { useEffect, useState, useCallback } from "react";
import EditProfileDialog from "../Components/Candidate_Profile/EditProfileDialog";
import '../Components/Candidate_Profile/Css/Candidate_profile.css'
import { useDispatch, useSelector } from "react-redux";
import { GetCandidateProfile } from "../app/Authslice";
import { setCandidateProfile } from "../app/CandidateProfileSlice";
import axios from "axios";

const CandidateProfile = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [savedCount, setSavedCount] = useState(0);

  const fetchProfileData = useCallback(async () => {
    if (!user?.uid) return;
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      let prof = null;
      try {
        prof = await dispatch(GetCandidateProfile(user.uid)).unwrap();
      } catch (err) {
        console.log("Candidate profile not found, creating default profile record...");
        const defaultProfile = {
          uid: user.uid,
          gender: "Male",
          dob: "2000-01-01",
          experience: 0.0,
          currentSalary: 0.0,
          expectedSalary: 0.0,
          summary: "Please add your professional summary."
        };
        const createRes = await axios.post(`http://localhost:8082/candidate-profile`, defaultProfile, { headers });
        prof = createRes.data;
      }

      setProfile(prof);
      dispatch(setCandidateProfile(prof));

      if (prof && prof.cid) {
        // Fetch related entities
        try {
          const skillsRes = await axios.get(`http://localhost:8082/api/candidate-skills/candidate/${prof.cid}`, { headers });
          setSkills(skillsRes.data || []);
        } catch (e) { console.error("Error fetching skills:", e); }

        try {
          const expRes = await axios.get(`http://localhost:8082/api/experiences/candidate/${prof.cid}`, { headers });
          setExperiences(expRes.data || []);
        } catch (e) { console.error("Error fetching experiences:", e); }

        try {
          const eduRes = await axios.get(`http://localhost:8082/education/candidate/${prof.cid}`, { headers });
          setEducation(eduRes.data || []);
        } catch (e) { console.error("Error fetching education:", e); }

        try {
          const projRes = await axios.get(`http://localhost:8082/api/projects/candidate/${prof.cid}`, { headers });
          setProjects(projRes.data || []);
        } catch (e) { console.error("Error fetching projects:", e); }

        try {
          const resumeRes = await axios.get(`http://localhost:8082/api/candidate/resume/candidate/${prof.cid}`, { headers });
          setResumes(resumeRes.data || []);
        } catch (e) { console.error("Error fetching resumes:", e); }

        try {
          const appRes = await axios.get(`http://localhost:8083/api/applications/candidate/${prof.cid}`, { headers });
          setApplications(appRes.data || []);
        } catch (e) { console.error("Error fetching applications:", e); }

        const bookmarks = JSON.parse(localStorage.getItem(`saved_jobs_${user.uid}`) || "[]");
        setSavedCount(bookmarks.length);
      }
    } catch (err) {
      console.error("Error fetching candidate profile:", err);
    }
  }, [dispatch, user?.uid]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const hasResume = resumes && resumes.length > 0;
  const hasSkills = skills && skills.length > 0;
  const hasExperience = experiences && experiences.length > 0;
  const hasEducation = education && education.length > 0;
  const hasProjects = projects && projects.length > 0;

  const checklist = {
    hasResume,
    hasSkills,
    hasExperience,
    hasEducation,
    hasProjects,
  };

  const progress = [hasResume, hasSkills, hasExperience, hasEducation, hasProjects].filter(Boolean).length * 20;
  const interviewsCount = applications.filter(app => app.statusId === 2).length;
  const profileViews = Math.min(150, (skills.length * 8) + (experiences.length * 15) + 12);

  const fetchCandidateProfile = async()=>{
    const res = await dispatch(GetCandidateProfile(user.uid)).unwrap();
    console.log(res);
    setProfile(res);
    console.log(profile);
  }
  useEffect(()=>{
    fetchCandidateProfile();
  },[1]);
  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <ProfileHeader 
          onEdit={() => setOpenEditModal(true)}
          profile={profile}
          user={user}
          progress={progress}
        />
        <EditProfileDialog
          open={openEditModal}
          profile={profile}
          user={user}
          handleClose={() => setOpenEditModal(false)}
          onRefresh={fetchProfileData}
        />
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={8}>
            <AboutSection aboutDes={profile?.summary} />
            <SkillsSection skills={skills} cid={profile?.cid} onRefresh={fetchProfileData} />
            <ResumeSection cid={profile?.cid} resumes={resumes} onRefresh={fetchProfileData} />
            <ExperienceSection experiences={experiences} cid={profile?.cid} onRefresh={fetchProfileData} />
            <EducationSection education={education} cid={profile?.cid} onRefresh={fetchProfileData} />
            <ProjectsSection projects={projects} cid={profile?.cid} onRefresh={fetchProfileData} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ProfileCompletion progress={progress} checklist={checklist} />
            <StatsCard 
              appliedCount={applications.length}
              savedCount={savedCount}
              interviewsCount={interviewsCount}
              profileViews={profileViews}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CandidateProfile;
