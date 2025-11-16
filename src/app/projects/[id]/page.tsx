// Solar-Neighbour — kimmy@Solar-Neighbour
'use client';

import { use, useEffect, useState } from 'react';
import { Header } from '@/components/dashboard/header';
import { Project } from '@/lib/projects-data';
import { notFound, useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

async function getProject(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`/api/projects/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error; // Re-throw to be caught by the component
  }
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedProject = await getProject(params.id);
        setProject(fetchedProject);
      } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Header />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </main>
      </div>
    )
  }
  
  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-muted-foreground mb-6">
              Posted by {project.author} on {format(new Date(project.postedAt), 'PPP')}
            </p>
            <div className="prose dark:prose-invert max-w-none">
              <p>{project.description}</p>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Community Size</span>
                  <span className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4" /> {project.households} households
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {project.location}
                  </span>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Interested?</CardTitle>
                <CardDescription>Contact the project owner or submit a proposal.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* This will be replaced with a proposal submission form */}
                <Button className="w-full">Submit a Proposal (Coming Soon)</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
