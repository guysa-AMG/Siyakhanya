
// Solar-Neighbour — kimmy@Solar-Neighbour

export type Project = {
  id: string;
  title: string;
  description: string;
  households: number;
  location: string;
  author: string;
  amount: string;
  postedAt: Date;
};

export const projects: Project[] = [
  {
    id: "proj_1",
    title: "Solar Power for Green Valley Community",
    description: "We are a community of 150 households looking to transition to sustainable energy. We are seeking proposals for a grid-tied solar system with battery backup to reduce our reliance on the national grid and lower our carbon footprint. Our estimated combined daily consumption is 750 kWh.",
    households: 150,
    location: "Green Valley, Western Cape",
    amount:"60 kwh",
    author: "Jane Doe",
    postedAt: new Date("2024-10-28T10:00:00Z"),
  },
  {
    id: "proj_2",
    title: "Water Pumping Solution for Rural Farmers",
    description: "A cooperative of 20 small-scale farms requires a reliable and cost-effective off-grid solar solution to power water pumps for irrigation. The total power requirement is estimated at 15 kW. We are looking for a durable system that can withstand harsh weather conditions.",
    households: 20,
    location: "Limpopo",
     amount:"110 kwh",
    author: "John Smith",
    postedAt: new Date("2024-10-25T14:30:00Z"),
  },
  {
    id: "proj_3",
    title: "Micro-grid for an Informal Settlement",
    description: "We are an NGO working with a community of 500 households in an informal settlement. We are looking for a partner to design and implement a scalable solar micro-grid to provide basic, affordable electricity for lighting and charging small devices. Safety and affordability are our top priorities.",
    households: 500,
    location: "Khayelitsha, Western Cape",
     amount:"90 kwh",
    author: "Community First NGO",
    postedAt: new Date("2024-10-22T09:00:00Z"),
  },
    {
    id: "proj_4",
    title: "Rooftop Solar for Urban Apartment Block",
    description: "The body corporate of a 50-unit apartment building in Sandton is seeking proposals for a rooftop solar installation. The goal is to reduce common area electricity costs and provide a backup power solution during load shedding. The available roof space is approximately 400 square meters.",
    households: 50,
    location: "Sandton, Gauteng",
     amount:"40 kwh",
    author: "Sandton Towers Body Corporate",
    postedAt: new Date("2024-10-20T11:00:00Z"),
  },
];
