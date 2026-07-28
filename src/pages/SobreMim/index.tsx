import DefaultLayout from '../../Layouts/default'
import Header from '../../components/Header/Header'
import Hero from '../../components/Hero/Hero'
import AboutSection from '../../components/AboutSection/AboutSection'
import SkillsSection from '../../components/SkillsSection/SkillsSection'
import ExperienceSection from '../../components/ExperienceSection/ExperienceSection'
import ProjectsSection from '../../components/ProjectsSection/ProjectsSection'
import TalkSection from '../../components/TalkSection/TalkSection'
import ContactSection from '../../components/ContactSection/ContactSection'

function SobreMim() {
  return (
    <DefaultLayout>
      <Header sticky />
      <Hero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <TalkSection />
      <ContactSection />
    </DefaultLayout>
  )
}

export default SobreMim
