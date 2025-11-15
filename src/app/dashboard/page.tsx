// siyaKhanya — kimmy@siyaKhanya
'use client';
import React from 'react';
import { ConsumptionChartCard } from '@/components/dashboard/consumption-chart-card';
import { DataAnalysisCard } from '@/components/dashboard/data-analysis-card';
import { Header } from '@/components/dashboard/header';
import { ScenarioBuilderCard } from '@/components/dashboard/scenario-builder-card';
import { AffordabilityCard } from '@/components/dashboard/affordability-card';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { communities } from '@/lib/data';
import { ApiEndpointsCard } from '@/components/dashboard/api-endpoints-card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardPage() {
  const [selectedCommunityId, setSelectedCommunityId] = React.useState(communities[0].id);

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <Header />
      <ScrollArea className="flex-1">
        <main className="container mx-auto p-4 md:p-8">
          <ResizablePanelGroup direction="horizontal" className="min-h-[800px]">
            <ResizablePanel defaultSize={33} minSize={25}>
              <div className="flex h-full flex-col gap-8 pr-4">
                <ScenarioBuilderCard
                  selectedCommunityId={selectedCommunityId}
                  onCommunityChange={setSelectedCommunityId}
                />
                <AffordabilityCard />
                <DataAnalysisCard />
                <ApiEndpointsCard communityId={selectedCommunityId} />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={67} minSize={40}>
              <div className="h-full pl-4">
                <ConsumptionChartCard communityId={selectedCommunityId} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </ScrollArea>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <span>© siyaKhanya</span>
      </footer>
    </div>
  );
}
