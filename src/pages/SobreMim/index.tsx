import DefaultLayout from '../../Layouts/default'
import Hero from '../../components/Hero/Hero'
import AboutSection from '../../components/AboutSection/AboutSection'
import SkillsSection from '../../components/SkillsSection/SkillsSection'
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection'
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection'
import EcommerceExperienceSection from '../../components/EcommerceExperienceSection/EcommerceExperienceSection'
import ContactSection from '../../components/ContactSection/ContactSection'

function SobreMim() {
  return (
    <DefaultLayout>
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EcommerceExperienceSection />
      <ContactSection />
    </DefaultLayout>
  )
}

export default SobreMim
