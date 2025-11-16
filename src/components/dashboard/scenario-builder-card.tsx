// Solar-Neighbour — kimmy@Solar-Neighbour
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from "react";
import { communities } from "@/lib/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, Loader2, AlertTriangle, BarChart as BarChartIcon, TrendingUp } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type YearlyCashflow = {
    year: number;
    net: number;
};

type PaybackResult = {
    npv: number;
    payback_years: number | null;
    yearly_cashflows: YearlyCashflow[];
};

interface ScenarioBuilderCardProps {
  selectedCommunityId: string;
  onCommunityChange: (id: string) => void;
}

const chartConfig = {
  net: {
    label: "Net Cashflow (ZAR)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

const PaybackResultDisplay = ({ result }: { result: PaybackResult }) => (
    <Alert>
        <Zap className="h-4 w-4" />
        <AlertTitle>Payback Calculation Results</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
            <div className="flex justify-between">
                <span className="text-muted-foreground">Payback Period:</span>
                <span className="font-semibold">
                    {result.payback_years !== null ? `${result.payback_years.toFixed(1)} years` : 'Over 20 years'}
                </span>
            </div>
            <div className="flex justify-between">
                <span className="text-muted-foreground">Net Present Value (NPV):</span>
                <span className="font-semibold">R {result.npv.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
        </AlertDescription>
    </Alert>
);

export function ScenarioBuilderCard({ selectedCommunityId, onCommunityChange }: ScenarioBuilderCardProps) {
  const [systemKw, setSystemKw] = useState(3);
  const [batteryKwh, setBatteryKwh] = useState(5);
  const [price, setPrice] = useState(2.5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paybackResult, setPaybackResult] = useState<PaybackResult | null>(null);

  const runPayback = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPaybackResult(null);

    const queryParams = new URLSearchParams({
        systemKw: systemKw.toString(),
        batteryKwh: batteryKwh.toString(),
        gridPrice: price.toString(),
    });

    try {
        const response = await fetch(`/api/communities/${selectedCommunityId}/payback?${queryParams}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch payback data. Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        setPaybackResult(data);
    } catch (e: any) {
        setError(e.message || "An unexpected error occurred.");
    } finally {
        setIsLoading(false);
    }
  }, [selectedCommunityId, systemKw, batteryKwh, price]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Builder</CardTitle>
        <CardDescription>
          Calculate the payback period for a solar installation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="community">Community</Label>
          <Select value={selectedCommunityId} onValueChange={onCommunityChange}>
            <SelectTrigger id="community">
              <SelectValue placeholder="Select a community" />
            </SelectTrigger>
            <SelectContent>
              {communities.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="system-kw">System kWp</Label>
              <Input
                id="system-kw"
                type="number"
                value={systemKw}
                onChange={(e) => setSystemKw(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="battery-kwh">Battery kWh</Label>
              <Input
                id="battery-kwh"
                type="number"
                value={batteryKwh}
                onChange={(e) => setBatteryKwh(parseFloat(e.target.value) || 0)}
              />
            </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="grid-price">Grid price (ZAR/kWh)</Label>
          <Input
            id="grid-price"
            type="number"
            step="0.1"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        <Button className="w-full" onClick={runPayback} disabled={isLoading}>
           {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
                <BarChartIcon className="mr-2"/>
                Calculate Payback
            </>
          )}
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Calculation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {paybackResult && (
            <div className="w-full space-y-4">
                <PaybackResultDisplay result={paybackResult}/>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp />
                            Yearly Cashflow
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="w-full h-[200px]">
                            <BarChart data={paybackResult.yearly_cashflows} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <YAxis
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => `R${value/1000}k`}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="net" fill="var(--color-net)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        )}
      </CardFooter>
    </Card>
  );
}
