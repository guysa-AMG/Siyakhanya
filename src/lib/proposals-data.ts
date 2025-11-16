
// Solar-Neighbour — kimmy@Solar-Neighbour

export type Proposal = {
  id: string;
  projectId: string;
  providerId: string;
  providerName: string;
  details: string;
  estimatedCost: number;
  estimatedTimeline: string; // e.g., "4-6 weeks"
  submittedAt: Date;
};

// Mock data for proposals
export const proposals: Proposal[] = [
  {
    id: "prop_1",
    projectId: "proj_1",
    providerId: "prov_A",
    providerName: "BrightFuture Solar",
    details: "We propose a 50 kW grid-tied system with a 100 kWh battery backup. Our solution includes high-efficiency panels with a 25-year warranty and a state-of-the-art monitoring system. We have extensive experience with community projects of this scale.",
    estimatedCost: 750000,
    estimatedTimeline: "6-8 weeks",
    submittedAt: new Date("2024-10-29T09:00:00Z"),
  },
  {
    id: "prop_2",
    projectId: "proj_1",
    providerId: "prov_B",
    providerName: "EcoPower Solutions",
    details: "Our proposal is for a 55 kW system focused on maximizing daytime energy use and minimizing grid reliance. We use tier-1 panels and inverters from leading global brands. Our price includes full installation, commissioning, and a 2-year service plan.",
    estimatedCost: 720000,
    estimatedTimeline: "8-10 weeks",
    submittedAt: new Date("2024-10-30T11:30:00Z"),
  },
  {
    id: "prop_3",
    projectId: "proj_2",
    providerId: "prov_C",
    providerName: "Off-Grid Experts",
    details: "For the rural water pumping project, we recommend a robust 15 kW off-grid system with a durable battery bank designed for agricultural use. Our system is low-maintenance and comes with remote monitoring capabilities.",
    estimatedCost: 350000,
    estimatedTimeline: "4-5 weeks",
    submittedAt: new Date("2024-10-28T15:00:00Z"),
  },
];
