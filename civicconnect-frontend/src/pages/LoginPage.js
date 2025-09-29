import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Link, 
  Paper, 
  Box, 
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Fade,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Login as LoginIcon, Email, Lock } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import useApiRequest from '../hooks/useApiRequest';

// Styled Components
const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
      radial-gradient(circle at 20% 80%, rgba(30, 58, 138, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: '24px',
  background: 'rgba(30, 41, 59, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  maxWidth: '450px',
  width: '100%',
  position: 'relative',
  zIndex: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
}));

const LoginTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  color: '#FFFFFF',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const LoginSubtitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: '#E2E8F0',
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
  fontWeight: 400,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    color: '#FFFFFF',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(59, 130, 246, 0.5)',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#E2E8F0',
    '&.Mui-focused': {
      color: '#3B82F6',
    },
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF',
    '&::placeholder': {
      color: '#94A3B8',
      opacity: 1,
    },
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.8, 0),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
  boxShadow: '0 8px 32px rgba(30, 58, 138, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 48px rgba(30, 58, 138, 0.5)',
    background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  '&:disabled': {
    background: 'rgba(30, 58, 138, 0.3)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#3B82F6',
  textDecoration: 'none',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#60A5FA',
    textDecoration: 'underline',
    transform: 'translateY(-1px)',
  },
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.2)',
  color: '#FCA5A5',
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
  '& .MuiAlert-icon': {
    color: '#EF4444',
  },
}));

const FloatingParticle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '4px',
  height: '4px',
  background: 'rgba(59, 130, 246, 0.6)',
  borderRadius: '50%',
  animation: 'float 6s ease-in-out infinite',
  '&:nth-of-type(1)': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
  },
  '&:nth-of-type(2)': {
    top: '60%',
    left: '80%',
    animationDelay: '2s',
  },
  '&:nth-of-type(3)': {
    top: '80%',
    left: '20%',
    animationDelay: '4s',
  },
  '&:nth-of-type(4)': {
    top: '30%',
    left: '70%',
    animationDelay: '1s',
  },
  '&:nth-of-type(5)': {
    top: '70%',
    left: '50%',
    animationDelay: '3s',
  },
}));

const LoginPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  
  const { login: authLogin, error: authError, setError } = useAuth();
  
  // Use useApiRequest hook for login
  const { loading, error, execute: executeLogin } = useApiRequest(
    async () => {
      return await authLogin(formData.email, formData.password);
    },
    {
      onSuccess: () => {
        navigate('/dashboard');
      },
      onError: (err) => {
        setAlertMessage({
          type: 'error',
          message: err.response?.data?.message || 'Login failed. Please check your credentials.'
        });
      },
      showErrorNotification: false
    }
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.email) {
      errors.email = t('auth.login.emailRequired');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('auth.login.emailInvalid');
      isValid = false;
    }

    if (!formData.password) {
      errors.password = t('auth.login.passwordRequired');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage(null);
    setError(null);
    
    if (validateForm()) {
      executeLogin();
    }
  };

  return (
    <LoginContainer component="main">
      {/* Floating Particles */}
      <FloatingParticle />
      <FloatingParticle />
      <FloatingParticle />
      <FloatingParticle />
      <FloatingParticle />
      
      <Fade in timeout={800}>
        <LoginPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Slide direction="down" in timeout={1000}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <LoginTitle component="h1">
                  {t('auth.login.title')}
                </LoginTitle>
                <LoginSubtitle>
                  {t('auth.login.subtitle')}
                </LoginSubtitle>
              </Box>
            </Slide>
          
          {(alertMessage || error || authError) && (
            <Fade in timeout={500}>
              <StyledAlert 
                severity={alertMessage?.type || 'error'} 
                sx={{ width: '100%', mb: 2 }}
              >
                {alertMessage?.message || error || authError}
                {(error || authError) && (
                  <Button 
                    size="small" 
                    variant="outlined" 
                    sx={{ 
                      ml: 2,
                      color: '#EF4444',
                      borderColor: '#EF4444',
                      '&:hover': {
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderColor: '#EF4444',
                      }
                    }} 
                    onClick={() => {
                      setError(null);
                      setAlertMessage(null);
                    }}
                  >
                    {t('auth.login.tryAgain')}
                  </Button>
                )}
              </StyledAlert>
            </Fade>
          )}
          
            <Slide direction="up" in timeout={1200}>
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <StyledTextField
                  required
                  fullWidth
                  id="email"
                  label={t('auth.login.email')}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  required
                  fullWidth
                  name="password"
                  label={t('auth.login.password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <LoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                >
                  {loading ? t('common.loading') : t('auth.login.loginButton')}
                </LoginButton>
                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs>
                    <StyledLink 
                      component={RouterLink} 
                      to="/forgot-password" 
                      variant="body2"
                      sx={{ 
                        color: '#94A3B8',
                        '&:hover': { color: '#60A5FA' }
                      }}
                    >
                      {t('auth.login.forgotPassword')}
                    </StyledLink>
                  </Grid>
                  <Grid item>
                    <StyledLink 
                      component={RouterLink} 
                      to="/register" 
                      variant="body2"
                      sx={{ 
                        fontWeight: 600,
                      }}
                    >
                      {t('auth.login.noAccount')} {t('auth.login.signUp')}
                    </StyledLink>
                  </Grid>
                </Grid>
              </Box>
            </Slide>
          </Box>
        </LoginPaper>
      </Fade>
    </LoginContainer>
  );
};

export default LoginPage;