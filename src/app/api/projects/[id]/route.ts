
import { NextResponse } from 'next/server';
import { projects as mockProjects } from '@/lib/projects-data';
import { getProjects } from '@/lib/projects';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const allProjects = [...getProjects(), ...mockProjects];
  const project = allProjects.find(p => p.id === params.id);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}
