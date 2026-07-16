import DefaultLayout from '../../Layouts/default'
import Hero from './Hero'
import SkillsSection from './SkillsSection'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'

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
