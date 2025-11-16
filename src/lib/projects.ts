
import { Project } from '@/lib/projects-data';

let projects: Project[] = [];

export function getProjects(): Project[] {
  return projects;
}

export function addProject(project: Omit<Project, 'id' | 'postedAt'>): Project {
  const newProject: Project = {
    id: `proj_${Date.now()}`,
    ...project,
    postedAt: new Date(),
  };
  projects.unshift(newProject);
  return newProject;
}
