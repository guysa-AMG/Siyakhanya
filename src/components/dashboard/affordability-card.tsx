// siyaKhanya — kimmy@siyaKhanya
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, BarChart } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

export function AffordabilityCard() {
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalysis = () => {
        setIsLoading(true);
        // This is where a real API call to an AI model would go.
        // For now, it returns a static, insightful recommendation after a delay.
        setTimeout(() => {
            setResult("Based on typical income distribution and energy usage in this archetype, a tariff above ZAR 4.50/kWh significantly increases the risk of illegal connections as it exceeds the affordability threshold for over 30% of households.");
            setIsLoading(false);
        }, 1500);
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Affordability Analysis</CardTitle>
        <CardDescription>
          Determine the maximum affordable tariff for a community.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button onClick={handleAnalysis} disabled={isLoading}>
            <BarChart className="mr-2"/>
            {isLoading ? 'Analyzing...' : 'Analyze Affordability'}
        </Button>

        {result && (
             <Alert className="border-accent">
                <DollarSign className="h-4 w-4 text-accent" />
                <AlertTitle className="text-accent">Pricing Recommendation</AlertTitle>
                <AlertDescription className="mt-2">
                    {result}
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
