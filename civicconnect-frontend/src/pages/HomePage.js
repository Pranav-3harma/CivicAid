import React from 'react';
import { 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Container, 
  Box,
  Chip,
  Fade,
  Slide,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '3.5rem',
  lineHeight: 1.2,
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 4px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 400,
  opacity: 0.9,
  lineHeight: 1.6,
  marginBottom: theme.spacing(4),
}));

const CTAButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  margin: theme.spacing(0, 1, 2, 0),
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    background: 'rgba(255,255,255,0.95)',
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.3)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
  },
}));

const CTASection = styled(Container)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  padding: theme.spacing(6, 0),
  background: 'rgba(255,255,255,0.7)',
  borderRadius: '24px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
}));

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Fade in timeout={1000}>
        <HeroSection>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Slide direction="right" in timeout={1200}>
                  <Box>
                    <HeroTitle component="h1">
                      Empowering Citizens, Improving Communities
                    </HeroTitle>
                    <HeroSubtitle>
                      Report civic issues, track their resolution, and collaborate with local organizations to build better communities.
                    </HeroSubtitle>
                    <Box sx={{ mt: 4 }}>
                      <CTAButton 
                        component={RouterLink} 
                        to="/report" 
                        variant="contained" 
                        color="secondary"
                        startIcon={<ReportProblemIcon />}
                      >
                        Report an Issue
                      </CTAButton>
                      <CTAButton 
                        component={RouterLink} 
                        to="/issues" 
                        variant="outlined" 
                        sx={{ 
                          color: 'white', 
                          borderColor: 'rgba(255,255,255,0.5)',
                          '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          }
                        }}
                        startIcon={<CheckCircleIcon />}
                      >
                        View Issues
                      </CTAButton>
                    </Box>
                  </Box>
                </Slide>
              </Grid>
              <Grid item xs={12} md={6}>
                <Slide direction="left" in timeout={1400}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '400px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <Typography variant="h4" sx={{ textAlign: 'center', opacity: 0.8 }}>
                      🏛️ Community Impact Visualization
                    </Typography>
                  </Box>
                </Slide>
              </Grid>
            </Grid>
          </Container>
        </HeroSection>
      </Fade>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Fade in timeout={1600}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Our platform makes civic engagement simple and effective
            </Typography>
          </Box>
        </Fade>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Zoom in timeout={1800}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <ReportProblemIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    Report Issues
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Easily report civic issues with photos, location, and detailed descriptions. Track the status of your reports in real-time.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Zoom>
          </Grid>
          <Grid item xs={12} md={4}>
            <Zoom in timeout={2000}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)',
                    }}
                  >
                    <GroupIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    Connect with Organizations
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Issues are automatically routed to the appropriate government agencies and community organizations for faster resolution.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Zoom>
          </Grid>
          <Grid item xs={12} md={4}>
            <Zoom in timeout={2200}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 25px rgba(79, 172, 254, 0.3)',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    Track Resolutions
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Follow the progress of reported issues, receive updates, and provide feedback on resolutions to improve community services.
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Zoom>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Fade in timeout={2400}>
        <StatsSection>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ color: 'white', fontWeight: 700 }}>
              Making a Difference Together
            </Typography>
            <Typography variant="h6" align="center" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
              Join thousands of citizens making their communities better
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: '#667eea', mb: 1 }} />
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#667eea' }}>1,234</Typography>
                    <Typography variant="body1" color="text.secondary">Issues Reported</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <CheckCircleIcon sx={{ fontSize: 40, color: '#f093fb', mb: 1 }} />
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#f093fb' }}>856</Typography>
                    <Typography variant="body1" color="text.secondary">Issues Resolved</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <BusinessIcon sx={{ fontSize: 40, color: '#4facfe', mb: 1 }} />
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#4facfe' }}>42</Typography>
                    <Typography variant="body1" color="text.secondary">Partner Organizations</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatCard>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <PeopleIcon sx={{ fontSize: 40, color: '#00f2fe', mb: 1 }} />
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#00f2fe' }}>5,678</Typography>
                    <Typography variant="body1" color="text.secondary">Active Citizens</Typography>
                  </CardContent>
                </StatCard>
              </Grid>
            </Grid>
          </Container>
        </StatsSection>
      </Fade>

      {/* Call to Action */}
      <Fade in timeout={2600}>
        <CTASection maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Join the Movement for Better Communities
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
            Be part of the solution. Register today to report issues, connect with local organizations, and help improve your community.
          </Typography>
          <CTAButton 
            component={RouterLink} 
            to="/register" 
            variant="contained" 
            color="primary"
            size="large"
            startIcon={<PersonAddIcon />}
          >
            Sign Up Now
          </CTAButton>
        </CTASection>
      </Fade>
    </>
  );
};

export default HomePage;