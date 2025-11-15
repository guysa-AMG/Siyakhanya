// siyaKhanya — kimmy@siyaKhanya
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { analyzeConsumptionData } from "@/lib/actions";
import { AlertTriangle, FileUp, Loader2, Info } from "lucide-react";
import { useState, useCallback } from "react";
import type { DetectAnomaliesOutput } from "@/ai/flows/detect-anomalies-in-consumption-data";

export function DataAnalysisCard() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectAnomaliesOutput | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleAnalysis = useCallback(async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const text = await file.text();
      const response = await analyzeConsumptionData(text);
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setResult(response.data);
      }
    } catch (e) {
      setError("Failed to process file.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumption Data Analysis</CardTitle>
        <CardDescription>
          Upload a CSV file to detect anomalies using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="consumption-file">Consumption Data (CSV)</Label>
          <Input id="consumption-file" type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <Button onClick={handleAnalysis} disabled={isLoading || !file}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <FileUp className="mr-2 h-4 w-4" />
              Analyze Data
            </>
          )}
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {result && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Analysis Complete</AlertTitle>
            <AlertDescription className="space-y-2 mt-2">
                <p className="font-semibold text-foreground">{result.summary}</p>
                {result.anomalies.length > 0 && (
                    <div>
                        <p className="font-semibold pt-2">Detected Anomalies:</p>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                            {result.anomalies.map((anomaly, index) => (
                                <li key={index}>{anomaly}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
