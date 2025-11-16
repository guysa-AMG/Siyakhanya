
import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects';
import { projects as mockProjects } from '@/lib/projects-data';

export async function GET() {
  const dynamicProjects = getProjects();
  const allProjects = [...dynamicProjects, ...mockProjects];
  // Sort by date to show newest first
  allProjects.sort((a, b) => b.postedAt.getTime() - a.postedAt.getTime());
  return NextResponse.json(allProjects);
}
