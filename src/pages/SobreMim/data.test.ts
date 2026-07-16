import { describe, expect, it } from 'vitest'
import { skills, experience, projects, GITHUB_USERNAME } from './data'

describe('resume data', () => {
  it('exposes the GitHub username used to fetch the profile', () => {
    expect(GITHUB_USERNAME).toBe('RamonDark2')
  })

  it('has skills in all three categories', () => {
    const categories = new Set(skills.map((skill) => skill.category))
    expect(categories).toEqual(new Set(['Frontend', 'Backend', 'Infraestrutura & Práticas']))
    skills.forEach((skill) => {
      expect(skill.name.length).toBeGreaterThan(0)
      expect(skill.icon).toBeDefined()
    })
  })

  it('has at least one experience entry with highlights', () => {
    expect(experience.length).toBeGreaterThan(0)
    expect(experience[0].highlights.length).toBeGreaterThan(0)
  })

  it('has exactly three projects, each with a name and description', () => {
    expect(projects).toHaveLength(3)
    projects.forEach((project) => {
      expect(project.name.length).toBeGreaterThan(0)
      expect(project.description.length).toBeGreaterThan(0)
    })
  })
})
