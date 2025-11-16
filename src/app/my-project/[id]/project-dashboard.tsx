// Solar-Neighbour — kimmy@Solar-Neighbour
'use client';

import { useState } from 'react';
import { Header } from '@/components/dashboard/header';
import { Project } from '@/lib/projects-data';
import { Proposal } from '@/lib/proposals-data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, DollarSign, Calendar, CheckCircle, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectDashboardProps {
  project: Project;
  initialProposals: Proposal[];
}

export function ProjectDashboard({ project, initialProposals }: ProjectDashboardProps) {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  // In a real app, you might have functions to accept/reject proposals,
  // which would update the state and make API calls.

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Your Project</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Received Proposals ({proposals.length})</CardTitle>
                <CardDescription>Review proposals from interested solar providers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {proposals.length > 0 ? (
                  proposals.map(proposal => (
                    <Card key={proposal.id}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{proposal.providerName}</CardTitle>
                          <CardDescription>Submitted on {format(new Date(proposal.submittedAt), 'PPP')}</CardDescription>
                        </div>
                        <Button>Accept</Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{proposal.details}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            <strong>Cost:</strong> R {proposal.estimatedCost.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <strong>Timeline:</strong> {proposal.estimatedTimeline}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="mx-auto h-12 w-12" />
                    <p className="mt-4">No proposals have been submitted for this project yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
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
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                    <p>{project.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
