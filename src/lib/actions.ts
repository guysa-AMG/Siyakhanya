'use server';

import { detectAnomalies } from '@/ai/flows/detect-anomalies-in-consumption-data';

export async function analyzeConsumptionData(csvData: string) {
  if (!csvData) {
    return { error: 'CSV data is empty. Please upload a valid file.' };
  }

  try {
    const result = await detectAnomalies({ consumptionData: csvData });
    return { data: result };
  } catch (error) {
    console.error('Error analyzing data with GenAI:', error);
    return { error: 'Failed to analyze data due to a server error. Please try again later.' };
  }
}
