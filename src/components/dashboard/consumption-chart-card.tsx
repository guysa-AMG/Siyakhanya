// Solar-Neighbour — kimmy@Solar-Neighbour
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";
import { communities } from "@/lib/data";

type PredictionPoint = { timestamp: string; predicted_kwh: number; hour: string };

const chartConfig = {
  predicted_kwh: {
    label: "Predicted kWh",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

async function getPredictions(communityId: string): Promise<PredictionPoint[]> {
  try {
    const response = await fetch(`/api/communities/${communityId}/predictions`);
    if (!response.ok) {
      throw new Error('Failed to fetch predictions');
    }
    const data = await response.json();
    return data.points.map((p: any) => ({
      ...p,
      hour: new Date(p.timestamp).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Johannesburg' })
    }));
  } catch (error) {
    console.error("Error fetching prediction data:", error);
    return []; // Return empty array on error
  }
}

export function ConsumptionChartCard({ communityId }: { communityId: string }) {
  const [data, setData] = useState<PredictionPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const predictionData = await getPredictions(communityId);
      if (predictionData.length === 0) {
        setError("Could not load prediction data.");
      }
      setData(predictionData);
      setIsLoading(false);
    };

    fetchData();
  }, [communityId]);
  
  const communityName = communities.find(c => c.id === communityId)?.name || 'Community';

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Hourly Demand for {communityName} (Predicted)</CardTitle>
        <CardDescription>Predicted energy consumption for the next 24 hours.</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          {isLoading ? (
            <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p>Loading chart data...</p>
            </div>
          ) : error ? (
            <div className="h-full w-full flex items-center justify-center text-destructive">
             {error}
            </div>
          ) : data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="hour" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted_kwh" 
                  stroke="var(--color-predicted_kwh)"
                  strokeWidth={2} 
                  dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              No data available.
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
