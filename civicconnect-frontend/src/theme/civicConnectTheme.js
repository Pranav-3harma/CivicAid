import { createTheme } from '@mui/material/styles';

// CivicAid-inspired theme with darker black and blue tones
const civicConnectTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1E3A8A', // Darker blue
      light: '#3B82F6',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0F172A', // Very dark blue-black
      light: '#1E293B',
      dark: '#000000', // Pure black
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#000000', // Pure black
      paper: '#0A0A0F', // Very dark blue-black
      elevated: '#1A1A2E', // Dark slate with blue tint
    },
    surface: {
      main: '#0A0A0F',
      light: '#1A1A2E',
      dark: '#000000',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8', // Darker gray
      disabled: '#64748B', // Medium gray
    },
    divider: 'rgba(30, 58, 138, 0.3)',
    error: {
      main: '#DC2626',
      light: '#EF4444',
      dark: '#B91C1C',
    },
    warning: {
      main: '#D97706',
      light: '#F59E0B',
      dark: '#B45309',
    },
    info: {
      main: '#0284C7',
      light: '#0EA5E9',
      dark: '#0369A1',
    },
    success: {
      main: '#059669',
      light: '#10B981',
      dark: '#047857',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: '#FFFFFF',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#FFFFFF',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#FFFFFF',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#FFFFFF',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#E2E8F0',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#E2E8F0',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#64748B',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.3)',
    '0 4px 6px rgba(0, 0, 0, 0.3)',
    '0 8px 12px rgba(0, 0, 0, 0.3)',
    '0 12px 16px rgba(0, 0, 0, 0.3)',
    '0 16px 24px rgba(0, 0, 0, 0.3)',
    '0 20px 32px rgba(0, 0, 0, 0.3)',
    '0 24px 40px rgba(0, 0, 0, 0.3)',
    '0 32px 48px rgba(0, 0, 0, 0.3)',
    '0 40px 56px rgba(0, 0, 0, 0.3)',
    '0 48px 64px rgba(0, 0, 0, 0.3)',
    '0 56px 72px rgba(0, 0, 0, 0.3)',
    '0 64px 80px rgba(0, 0, 0, 0.3)',
    '0 72px 88px rgba(0, 0, 0, 0.3)',
    '0 80px 96px rgba(0, 0, 0, 0.3)',
    '0 88px 104px rgba(0, 0, 0, 0.3)',
    '0 96px 112px rgba(0, 0, 0, 0.3)',
    '0 104px 120px rgba(0, 0, 0, 0.3)',
    '0 112px 128px rgba(0, 0, 0, 0.3)',
    '0 120px 136px rgba(0, 0, 0, 0.3)',
    '0 128px 144px rgba(0, 0, 0, 0.3)',
    '0 136px 152px rgba(0, 0, 0, 0.3)',
    '0 144px 160px rgba(0, 0, 0, 0.3)',
    '0 152px 168px rgba(0, 0, 0, 0.3)',
    '0 160px 176px rgba(0, 0, 0, 0.3)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `
            linear-gradient(135deg, #000000 0%, #0A0A0F 50%, #1A1A2E 100%),
            radial-gradient(circle at 20% 80%, rgba(30, 58, 138, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.08) 0%, transparent 70%)
          `,
          backgroundAttachment: 'fixed',
          scrollbarColor: '#3B82F6 #0A0A0F',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#0A0A0F',
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#3B82F6',
            minHeight: 24,
            border: '2px solid #0A0A0F',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#60A5FA',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#60A5FA',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#60A5FA',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#0A0A0F',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '0.875rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            '&::before': {
              left: '100%',
            },
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
          color: '#FFFFFF',
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
          border: '1px solid rgba(59, 130, 246, 0.5)',
          '&:hover': {
            background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.5)',
            border: '1px solid rgba(59, 130, 246, 0.8)',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: '#3B82F6',
          color: '#3B82F6',
          '&:hover': {
            borderWidth: '2px',
            borderColor: '#60A5FA',
            color: '#60A5FA',
            background: 'rgba(59, 130, 246, 0.1)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: `
            linear-gradient(145deg, #0A0A0F 0%, #1A1A2E 100%),
            linear-gradient(45deg, transparent 30%, rgba(30, 58, 138, 0.05) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(59, 130, 246, 0.03) 50%, transparent 70%)
          `,
          border: '1px solid rgba(30, 58, 138, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(30, 58, 138, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 30px rgba(30, 58, 138, 0.3)',
            border: '1px solid rgba(30, 58, 138, 0.5)',
            '&::before': {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0A0A0F',
          border: '1px solid rgba(30, 58, 138, 0.3)',
          boxShadow: '0 0 20px rgba(30, 58, 138, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'rgba(10, 10, 15, 0.8)',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(59, 130, 246, 0.5)',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: 2,
                borderColor: '#3B82F6',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `
            linear-gradient(135deg, #000000 0%, #0A0A0F 100%),
            linear-gradient(45deg, transparent 30%, rgba(30, 58, 138, 0.08) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(59, 130, 246, 0.05) 50%, transparent 70%)
          `,
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(30, 58, 138, 0.4)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(30, 58, 138, 0.2)',
        },
      },
    },
  },
});

export default civicConnectTheme;
