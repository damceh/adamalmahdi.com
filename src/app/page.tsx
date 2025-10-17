import { Hero } from '@/components/sections/Hero';
import { ExperienceSection } from '@/components/sections/Experience';
import { ProjectsSection } from '@/components/sections/Projects';
import { ContactSection } from '@/components/sections/Contact';
import profileData from '@/data/profile.json';
import experienceData from '@/data/experience.json';
import projectsData from '@/data/projects.json';
import { Profile, Experience, Project } from '@/types';

export default function Home() {
  const profile = profileData as Profile;
  const experiences = experienceData as Experience[];
  const projects = projectsData as Project[];

  return (
    <div className="bg-gradient-theme-br text-theme-primary">
      {/* Background grain texture overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero">
          <Hero profile={profile} />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <ExperienceSection experiences={experiences} />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection projects={projects} />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
