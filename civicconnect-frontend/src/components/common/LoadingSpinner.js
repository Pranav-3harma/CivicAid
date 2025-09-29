import React from 'react';
import { Box, CircularProgress, Typography, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLanguage } from '../../contexts/LanguageContext';

// Custom animations
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  animation: `${pulse} 2s ease-in-out infinite`,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(45deg, #667eea, #764ba2)' 
    : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 500,
  animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
}));

const LoadingSpinner = ({ message, size = 40, fullPage = false }) => {
  const { t } = useLanguage();
  const displayMessage = message || t('common.loading');
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        height: fullPage ? '100vh' : 'auto',
        animation: `${fadeInUp} 0.6s ease-out`,
      }}
    >
      <StyledCircularProgress size={size} />
      {displayMessage && (
        <StyledTypography variant="body1" sx={{ mt: 2 }}>
          {displayMessage}
        </StyledTypography>
      )}
    </Box>
  );

  return fullPage ? (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'background.paper',
        zIndex: 9999,
      }}
    >
      {content}
    </Box>
  ) : content;
};

export default LoadingSpinner;