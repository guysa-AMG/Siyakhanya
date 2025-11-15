// siyaKhanya — kimmy@siyaKhanya
import { NextResponse } from 'next/server';

// Simplified constants for the financial model
const WACC = 0.1; // Weighted Average Cost of Capital (discount rate)
const LIFESPAN_YEARS = 20; // Lifespan of the solar system
const DEGRADATION_RATE = 0.005; // Annual degradation of solar panel output
const O_AND_M_RATE = 0.01; // Annual Operations & Maintenance cost as a percentage of initial cost

// Simple cost model based on system size
function calculateSystemCost(systemKw: number, batteryKwh: number): number {
  const costPerKw = 15000; // ZAR per kW for panels, inverter, etc.
  const costPerKwh = 3000; // ZAR per kWh for battery
  return systemKw * costPerKw + batteryKwh * costPerKwh;
}

// Simple energy generation model
function calculateAnnualGeneration(systemKw: number): number {
  const dailySunHours = 5; // Average sun hours
  const daysInYear = 365;
  // This is a very simplified model. A real one would use more precise location-based data.
  return systemKw * dailySunHours * daysInYear;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const communityId = params.id;
  const { searchParams } = new URL(request.url);
  const systemKw = parseFloat(searchParams.get('systemKw') || '3');
  const batteryKwh = parseFloat(searchParams.get('batteryKwh') || '5');
  const gridPrice = parseFloat(searchParams.get('gridPrice') || '2.5');

  if (isNaN(systemKw) || isNaN(batteryKwh) || isNaN(gridPrice)) {
    return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 });
  }

  const initialCost = calculateSystemCost(systemKw, batteryKwh);
  const annualGeneration = calculateAnnualGeneration(systemKw);

  const yearly_cashflows = [];
  let cumulativeCashflow = -initialCost;
  let npv = -initialCost;
  let payback_years: number | null = null;
  
  for (let year = 1; year <= LIFESPAN_YEARS; year++) {
    const generationThisYear = annualGeneration * Math.pow(1 - DEGRADATION_RATE, year - 1);
    const savings = generationThisYear * gridPrice;
    const maintenanceCost = initialCost * O_AND_M_RATE;
    const net = savings - maintenanceCost;
    
    yearly_cashflows.push({ year, net });

    // Calculate Net Present Value
    npv += net / Math.pow(1 + WACC, year);
    
    // Calculate Payback Period
    cumulativeCashflow += net;
    if (payback_years === null && cumulativeCashflow >= 0) {
      const partialYear = (cumulativeCashflow - net) / -net;
      payback_years = year - 1 + partialYear;
    }
  }

  const response = {
    system_id: `${systemKw}kWp-${batteryKwh}kWh`,
    npv: parseFloat(npv.toFixed(2)),
    payback_years: payback_years !== null ? parseFloat(payback_years.toFixed(1)) : null,
    yearly_cashflows: yearly_cashflows,
  };

  return NextResponse.json(response);
}
