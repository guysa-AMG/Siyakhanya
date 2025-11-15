'use server';
/**
 * @fileOverview An anomaly detection AI agent for consumption data.
 *
 * - detectAnomalies - A function that handles the anomaly detection process.
 * - DetectAnomaliesInput - The input type for the detectAnomalies function.
 * - DetectAnomaliesOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomaliesInputSchema = z.object({
  consumptionData: z
    .string()
    .describe('The consumption data as a CSV string.'),
});
export type DetectAnomaliesInput = z.infer<typeof DetectAnomaliesInputSchema>;

const DetectAnomaliesOutputSchema = z.object({
  anomalies: z.array(z.string()).describe('A list of anomalies detected in the consumption data.'),
  summary: z.string().describe('A summary of the detected anomalies.'),
});
export type DetectAnomaliesOutput = z.infer<typeof DetectAnomaliesOutputSchema>;

export async function detectAnomalies(input: DetectAnomaliesInput): Promise<DetectAnomaliesOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomaliesPrompt',
  input: {schema: DetectAnomaliesInputSchema},
  output: {schema: DetectAnomaliesOutputSchema},
  prompt: `You are an expert energy analyst. You will analyze the provided consumption data and identify any anomalies or unusual patterns. Provide a summary of the anomalies and a list of specific anomalies found.

Consumption Data:
{{{consumptionData}}}

Output should be in JSON format with 'anomalies' as a list of strings and 'summary' as a string. Each anomaly in the anomalies list must provide the specific line number and the nature of the anomaly.
`,
});

const detectAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: DetectAnomaliesInputSchema,
    outputSchema: DetectAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
