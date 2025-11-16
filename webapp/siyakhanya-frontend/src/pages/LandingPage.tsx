
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" gutterBottom>
            Welcome to Siyakhanya
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography variant="h2" color="text.secondary" paragraph>
            Your marketplace for a brighter, cleaner future.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We connect low-income communities with alternative energy providers, helping you save money and the planet.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            component={Link}
            to="/marketplace"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4 }}
          >
            Explore the Marketplace
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingPage;
