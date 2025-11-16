
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import LandingPage from './pages/LandingPage';
import Home from './pages/MarketplacePage';
import GroupFormationPage from './pages/GroupFormationPage';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
       
        <Box component="main">
          <Routes>
            <Route path="/marketplace" element={<LandingPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/group-formation" element={<GroupFormationPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
