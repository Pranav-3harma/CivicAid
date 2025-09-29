import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Fade,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, AdminPanelSettings, Email, Lock } from '@mui/icons-material';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useLanguage } from '../contexts/LanguageContext';

// Styled Components
const AdminLoginContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `
    linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #16213E 100%),
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%)
  `,
  backgroundAttachment: 'fixed',
  position: 'relative',
  overflow: 'hidden',
}));

const AdminLoginPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: '24px',
  background: 'rgba(26, 26, 46, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 136, 0.1)',
  maxWidth: '450px',
  width: '100%',
  position: 'relative',
  zIndex: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 255, 136, 0.2)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
  },
}));

const AdminTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  color: '#FFFFFF',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const AdminSubtitle = styled(Typography)(({ theme }) => ({
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
    border: '1px solid rgba(0, 255, 136, 0.2)',
    color: '#FFFFFF',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(0, 255, 136, 0.3)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(0, 255, 136, 0.5)',
      boxShadow: '0 0 0 3px rgba(0, 255, 136, 0.1)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#E2E8F0',
    '&.Mui-focused': {
      color: '#00FF88',
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

const AdminLoginButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.8, 0),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
  color: '#000000',
  boxShadow: '0 8px 32px rgba(0, 255, 136, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 48px rgba(0, 255, 136, 0.5)',
    background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  },
  '&:disabled': {
    background: 'rgba(0, 255, 136, 0.3)',
    color: 'rgba(0, 0, 0, 0.5)',
  },
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  backgroundColor: 'rgba(255, 107, 107, 0.1)',
  border: '1px solid rgba(255, 107, 107, 0.2)',
  color: '#FFB3B3',
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
  '& .MuiAlert-icon': {
    color: '#FF6B6B',
  },
}));

const FloatingParticle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '4px',
  height: '4px',
  background: 'rgba(0, 255, 136, 0.6)',
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

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const { login, loading, error, setError } = useAdminAuth();
  const { t } = useLanguage();
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
      errors.email = t('admin.login.errors.emailRequired');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t('admin.login.errors.emailInvalid');
      isValid = false;
    }

    if (!formData.password) {
      errors.password = t('admin.login.errors.passwordRequired');
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        navigate('/admin/dashboard');
      } catch (err) {
        // Error is handled by the context
      }
    }
  };

  return (
    <AdminLoginContainer component="main">
      {/* Floating Particles */}
      <FloatingParticle />
      <FloatingParticle />
      <FloatingParticle />
      <FloatingParticle />
      <FloatingParticle />
      
      <Fade in timeout={800}>
        <AdminLoginPaper elevation={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Slide direction="down" in timeout={1000}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <AdminTitle component="h1">
                  {t('admin.login.title')}
                </AdminTitle>
                <AdminSubtitle>
                  {t('admin.login.subtitle')}
                </AdminSubtitle>
              </Box>
            </Slide>
          
          {error && (
            <Fade in timeout={500}>
              <StyledAlert 
                severity="error" 
                sx={{ width: '100%', mb: 2 }}
              >
                {error}
              </StyledAlert>
            </Fade>
          )}
          
            <Slide direction="up" in timeout={1200}>
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <StyledTextField
                  required
                  fullWidth
                  id="email"
                  label={t('admin.login.email')}
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
                  label={t('admin.login.password')}
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
                <AdminLoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AdminPanelSettings />}
                >
                  {loading ? t('admin.login.signingIn') : t('admin.login.signIn')}
                </AdminLoginButton>
              </Box>
            </Slide>
          </Box>
        </AdminLoginPaper>
      </Fade>
    </AdminLoginContainer>
  );
};

export default AdminLoginPage;
