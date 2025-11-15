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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Server } from "lucide-react";
import { useMemo } from "react";

interface ApiEndpointsCardProps {
    communityId: string;
}

export function ApiEndpointsCard({ communityId }: ApiEndpointsCardProps) {
  const { toast } = useToast();

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const predictionsApiUrl = useMemo(() => `${baseUrl}/api/communities/${communityId}/predictions`, [baseUrl, communityId]);
  const paybackApiUrl = useMemo(() => `${baseUrl}/api/communities/${communityId}/payback?systemKw=3&batteryKwh=5&gridPrice=2.5`, [baseUrl, communityId]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "API endpoint URL is ready to be used.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model API Endpoints</CardTitle>
        <CardDescription>
          Use these endpoints to integrate the models into other services.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="predictions-api">Predictions API</Label>
          <div className="flex gap-2">
            <Input id="predictions-api" value={predictionsApiUrl} readOnly />
            <Button variant="outline" size="icon" onClick={() => handleCopy(predictionsApiUrl)}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="payback-api">Payback API</Label>
          <div className="flex gap-2">
            <Input id="payback-api" value={paybackApiUrl} readOnly />
            <Button variant="outline" size="icon" onClick={() => handleCopy(paybackApiUrl)}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
