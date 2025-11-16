
import React from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import "./home.css"

const specialists = [
  { id: 1, name: 'Solar Solutions Inc.', specialty: 'Solar Panel Installation' },
  { id: 2, name: 'Windy City Turbines', specialty: 'Wind Turbine Maintenance' },
  { id: 3, name: 'Geo-Cool Systems', specialty: 'Geothermal Heating' },
  { id: 4, name: 'Hydro Power Co.', specialty: 'Micro-Hydro Systems' },
];

const Home: React.FC = () => {
  return (
    <div className='home'>

      <h1 >Solar neighbor</h1>
      <h3 style={{"textAlign":"center"}}>powering the community together</h3>
      <Button variant='contained'  >get Started</Button>
    </div>
  );
};

export default Home;
