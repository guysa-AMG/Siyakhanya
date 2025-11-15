// siyaKhanya — kimmy@siyaKhanya
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
import React, { useState } from "react";
import { communities } from "@/lib/data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap } from "lucide-react";

type PaybackResult = {
    npv: number;
    payback_years: number;
};

export function ScenarioBuilderCard() {
  const [community, setCommunity] = useState(communities[0].id);
  const [systemKw, setSystemKw] = useState(3);
  const [batteryKwh, setBatteryKwh] = useState(5);
  const [price, setPrice] = useState(2.5);
  const [paybackResult, setPaybackResult] = useState<PaybackResult | null>(null);

  const runPayback = () => {
    // replace with real API call
    console.log("Payback API call stubbed with params:", { community, systemKw, batteryKwh, price });
    // Stubbed response for demonstration
    const payback_years = 7.2;
    const npv = 15340.21
    setPaybackResult({ payback_years, npv });
  }

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
          <Select value={community} onValueChange={setCommunity}>
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

        <div className="grid gap-2">
          <Label htmlFor="system-kw">System kW</Label>
          <Input
            id="system-kw"
            type="number"
            value={systemKw}
            onChange={(e) => setSystemKw(parseFloat(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="battery-kwh">Battery kWh</Label>
          <Input
            id="battery-kwh"
            type="number"
            value={batteryKwh}
            onChange={(e) => setBatteryKwh(parseFloat(e.target.value))}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="grid-price">Grid price (ZAR/kWh)</Label>
          <Input
            id="grid-price"
            type="number"
            step="0.1"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={runPayback}>
          Calculate Payback
        </Button>
        {paybackResult && (
            <Alert>
                <Zap className="h-4 w-4" />
                <AlertTitle>Payback Calculation Results</AlertTitle>
                <AlertDescription>
                    <div className="flex justify-between mt-2">
                        <span>Payback Period:</span>
                        <span className="font-semibold">{paybackResult.payback_years.toFixed(1)} years</span>
                    </div>
                    <div className="flex justify-between mt-1">
                        <span>Net Present Value (NPV):</span>
                        <span className="font-semibold">R {paybackResult.npv.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                </AlertDescription>
            </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
