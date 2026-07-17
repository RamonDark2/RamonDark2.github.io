import DefaultLayout from '../../Layouts/default'
import Hero from '../../components/Hero/Hero'
import SkillsSection from '../../components/SkillsSection/SkillsSection'
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection'
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection'
import ContactSection from '../../components/ContactSection/ContactSection'

function SobreMim() {
  return (
    <DefaultLayout>
      <Hero />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </DefaultLayout>
  )
}

export default SobreMim
