
import { NextResponse } from 'next/server';
import { addProject } from '@/lib/projects';

export async function POST(request: Request) {
  try {
    const projectData = await request.json();
    const newProject = addProject(projectData);
    console.log('New project created:', newProject);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
