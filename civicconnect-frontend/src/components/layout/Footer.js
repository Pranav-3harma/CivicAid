import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Styled Components
const StyledFooter = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  borderTop: `1px solid ${theme.palette.divider}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const FooterContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.2rem',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  zIndex: 1,
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255,255,255,0.8)',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#fff',
    transform: 'translateX(5px)',
    textDecoration: 'none',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255,255,255,0.7)',
  margin: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#fff',
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  color: 'rgba(255,255,255,0.8)',
}));

const CopyrightBox = styled(Box)(({ theme }) => ({
  borderTop: '1px solid rgba(255,255,255,0.1)',
  paddingTop: theme.spacing(3),
  marginTop: theme.spacing(3),
  textAlign: 'center',
}));

const Footer = () => {
  return (
    <StyledFooter component="footer">
      <FooterContent maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle variant="h6">
                🏛️ CivicAid
              </FooterTitle>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                Empowering citizens to report and resolve civic issues collaboratively. 
                Building stronger communities through technology and citizen engagement.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label="Community" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }} 
                />
                <Chip 
                  label="Civic Tech" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }} 
                />
                <Chip 
                  label="Transparency" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }} 
                />
              </Box>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle variant="h6">Quick Links</FooterTitle>
              <FooterLink href="/">🏠 Home</FooterLink>
              <FooterLink href="/issues">📋 Issues</FooterLink>
              <FooterLink href="/report">📝 Report Issue</FooterLink>
              <FooterLink href="/organizations">🏢 Organizations</FooterLink>
              <FooterLink href="/dashboard">📊 Dashboard</FooterLink>
            </FooterSection>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle variant="h6">Services</FooterTitle>
              <FooterLink href="/login">🔐 Login</FooterLink>
              <FooterLink href="/register">📝 Register</FooterLink>
              <FooterLink href="/profile">👤 Profile</FooterLink>
              <FooterLink href="/organizations/create">➕ Create Org</FooterLink>
            </FooterSection>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle variant="h6">Contact Us</FooterTitle>
              <ContactItem>
                <EmailIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2">support@civicaid.org</Typography>
              </ContactItem>
              <ContactItem>
                <PhoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2">+91 123-456-7890</Typography>
              </ContactItem>
              <ContactItem>
                <LocationOnIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2">New Delhi, India</Typography>
              </ContactItem>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>
                  Follow us on social media
                </Typography>
                <Box>
                  <SocialButton size="small">
                    <FacebookIcon />
                  </SocialButton>
                  <SocialButton size="small">
                    <TwitterIcon />
                  </SocialButton>
                  <SocialButton size="small">
                    <LinkedInIcon />
                  </SocialButton>
                  <SocialButton size="small">
                    <InstagramIcon />
                  </SocialButton>
                </Box>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        <CopyrightBox>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            {'© '}
            {new Date().getFullYear()}
            {' CivicAid. All rights reserved. Made with ❤️ for better communities.'}
          </Typography>
        </CopyrightBox>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;