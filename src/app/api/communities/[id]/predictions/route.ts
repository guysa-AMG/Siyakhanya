import { NextResponse } from 'next/server';
import { formatISO } from 'date-fns';

// Helper function to create a pseudo-random number generator with a seed
function mulberry32(a: number) {
  return function() {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Helper to generate a seed from a string
function createSeed(str: string) {
  let h = 1779033703, i = 0, len = str.length;
  for (; i < len; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return h;
}


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;
  const now = new Date();

  // Create a deterministic seed based on communityId and the current day
  const dateSeed = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const seedString = `${communityId}-${dateSeed}`;
  const seed = createSeed(seedString);
  const random = mulberry32(seed);

  const points = Array.from({ length: 24 }).map((_, i) => {
    const ts = new Date(now.getTime() + i * 3600 * 1000);
    // Use a deterministic sine wave + random value for a predictable but varied pattern
    const baseValue = 10 + 8 * Math.sin((i / 24) * 2 * Math.PI);
    const predicted_kwh = Math.max(0, baseValue + (random() - 0.5) * 4);
    
    return { 
      timestamp: formatISO(ts),
      predicted_kwh: parseFloat(predicted_kwh.toFixed(2)),
      conf_low: parseFloat(Math.max(0, predicted_kwh * 0.85).toFixed(2)),
      conf_high: parseFloat((predicted_kwh * 1.15).toFixed(2)),
    };
  });

  const response = {
    community_id: communityId,
    model_version: 'stub-v1.0',
    points: points,
  };

  return NextResponse.json(response);
}
