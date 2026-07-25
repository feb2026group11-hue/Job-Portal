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
import { profileData } from "../Data/Data";
import { useState } from "react";
import EditProfileDialog from "../Components/Candidate_Profile/EditProfileDialog";
import '../Components/Candidate_Profile/Css/Candidate_profile.css'

const CandidateProfile = () => {
  //   const profile = {
  //     name: "Sanket Gaware",
  //     designation: "Java Full Stack Developer",
  //     location: "Pune, Maharashtra",
  //     experience: "1 Year",
  //     expectedSalary: "8 LPA",
  //     completion: 85,
  //   };
  const [openEditModal, setOpenEditModal] = useState(false);
  
  return (
    <Box sx={{ bgcolor: "#F8FAFC", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        <ProfileHeader
          onEdit={() => setOpenEditModal(true)}
          profile={profileData.profile}
        />
        <EditProfileDialog
          open={openEditModal}
          profile={profileData.profile}
          handleClose={() => setOpenEditModal(false)}
        />
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={8}>
            <AboutSection aboutDes={profileData.profile.summary} />
            <SkillsSection  onEdit={() => setOpenEditModal(true)} skills={profileData.skills} />
            <ResumeSection />
            <ExperienceSection />
            <EducationSection education={profileData.education} />
            <ProjectsSection projects={profileData.projects} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ProfileCompletion progress={85} />
            <StatsCard />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CandidateProfile;
