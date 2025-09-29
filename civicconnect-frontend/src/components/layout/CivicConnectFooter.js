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
import { useLanguage } from '../../contexts/LanguageContext';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// CivicAid-inspired styled components
const CivicConnectFooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 20%, rgba(30, 58, 138, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)
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
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #3B82F6 0%, #EF4444 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  zIndex: 1,
  letterSpacing: '-0.01em',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255,255,255,0.8)',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  transition: 'all 0.2s ease',
  fontSize: '0.875rem',
  fontWeight: 500,
  '&:hover': {
    color: '#FFFFFF',
    transform: 'translateX(5px)',
    textDecoration: 'none',
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: 'rgba(255,255,255,0.7)',
  margin: theme.spacing(0.5),
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#FFFFFF',
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  color: 'rgba(255,255,255,0.8)',
  fontSize: '0.875rem',
}));

const CopyrightBox = styled(Box)(({ theme }) => ({
  borderTop: '1px solid rgba(255,255,255,0.1)',
  paddingTop: theme.spacing(3),
  marginTop: theme.spacing(3),
  textAlign: 'center',
}));

const CivicConnectFooter = () => {
  const { t } = useLanguage();
  
  return (
    <CivicConnectFooterContainer component="footer">
      <FooterContent maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle variant="h6">
                🏛️ CivicAid
              </FooterTitle>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2, lineHeight: 1.6 }}>
                {t('footer.description')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={t('footer.tags.community')} 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.2)', 
                    color: '#60A5FA',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    fontWeight: 500,
                  }} 
                />
                <Chip 
                  label={t('footer.tags.civicTech')} 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(239, 68, 68, 0.2)', 
                    color: '#F87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    fontWeight: 500,
                  }} 
                />
                <Chip 
                  label={t('footer.tags.transparency')} 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(16, 185, 129, 0.2)', 
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontWeight: 500,
                  }} 
                />
              </Box>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle variant="h6">{t('footer.quickLinks')}</FooterTitle>
              <FooterLink href="/">🏠 {t('footer.links.home')}</FooterLink>
              <FooterLink href="/issues">📋 {t('footer.links.issues')}</FooterLink>
              <FooterLink href="/report">📝 {t('footer.links.reportIssue')}</FooterLink>
              <FooterLink href="/organizations">🏢 {t('footer.links.organizations')}</FooterLink>
              <FooterLink href="/dashboard">📊 {t('footer.links.dashboard')}</FooterLink>
            </FooterSection>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <FooterTitle variant="h6">{t('footer.services')}</FooterTitle>
              <FooterLink href="/login">🔐 {t('footer.links.login')}</FooterLink>
              <FooterLink href="/register">📝 {t('footer.links.register')}</FooterLink>
              <FooterLink href="/profile">👤 {t('footer.links.profile')}</FooterLink>
              <FooterLink href="/organizations/create">➕ {t('footer.links.createOrg')}</FooterLink>
            </FooterSection>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <FooterSection>
              <FooterTitle variant="h6">{t('footer.contact')}</FooterTitle>
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
                <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                  {t('footer.followUsSocial')}
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
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
            {'© '}
            {new Date().getFullYear()}
            {' CivicAid. '}{t('footer.allRightsReserved')}{' '}{t('footer.madeWith')}
          </Typography>
        </CopyrightBox>
      </FooterContent>
    </CivicConnectFooterContainer>
  );
};

export default CivicConnectFooter;
