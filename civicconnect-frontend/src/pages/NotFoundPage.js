import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            maxWidth: 500,
            width: '100%',
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" color="error" gutterBottom>
            404 - Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The page you are looking for doesn't exist or has been moved.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
            >
              Go to Homepage
            </Button>
            <Button
              component={Link}
              to="/issues"
              variant="outlined"
            >
              Browse Issues
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;