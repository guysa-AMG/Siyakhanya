
import React from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';

const GroupFormationPage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 8 }}>
      <Container>
        <Typography variant="h1" gutterBottom>
          Group Formation
        </Typography>
        <Typography variant="h2" color="text.secondary" paragraph>
          Join forces with your community to get the best deals.
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create a New Group
          </Typography>
          <TextField label="Group Name" fullWidth sx={{ mb: 2 }} />
          <TextField label="Group Description" fullWidth multiline rows={4} sx={{ mb: 2 }} />
          <Button variant="contained" color="primary">
            Create Group
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default GroupFormationPage;
