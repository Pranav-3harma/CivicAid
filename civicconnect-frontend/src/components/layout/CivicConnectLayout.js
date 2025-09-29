import React from 'react';
import { Box, Container, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import CivicConnectHeader from './CivicConnectHeader';
import CivicConnectFooter from './CivicConnectFooter';

// CivicConnect-inspired styled components
const CivicConnectLayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
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
      radial-gradient(circle at 20% 80%, rgba(30, 58, 138, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
    animation: 'gradientShift 20s ease infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)
    `,
    pointerEvents: 'none',
    animation: 'shimmer 3s ease-in-out infinite',
  },
}));

const MainContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const CivicConnectLayout = ({ children }) => {
  return (
    <CivicConnectLayoutContainer>
      <CivicConnectHeader />
      <MainContent component="main" maxWidth="xl">
        <Fade in timeout={600}>
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </Fade>
      </MainContent>
      <CivicConnectFooter />
    </CivicConnectLayoutContainer>
  );
};

export default CivicConnectLayout;
