import DefaultLayout from '../../Layouts/default'
import Hero from '../../components/Hero/Hero'
import AboutSection from '../../components/AboutSection/AboutSection'
import SkillsSection from '../../components/SkillsSection/SkillsSection'
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection'
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection'
import EcommerceExperienceSection from '../../components/EcommerceExperienceSection/EcommerceExperienceSection'
import EcommerceSkillsSection from '../../components/EcommerceSkillsSection/EcommerceSkillsSection'
import TalkSection from '../../components/TalkSection/TalkSection'
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
      <EcommerceSkillsSection />
      <TalkSection />
      <ContactSection />
    </DefaultLayout>
  )
}

export default SobreMim
