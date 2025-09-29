import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  Box, 
  useMediaQuery, 
  useTheme,
  Chip,
  Badge,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    pointerEvents: 'none',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,
  animation: 'logoGlow 3s ease-in-out infinite alternate',
  '@keyframes logoGlow': {
    '0%': {
      textShadow: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
      filter: 'brightness(1)',
    },
    '100%': {
      textShadow: '0 0 30px rgba(0, 255, 136, 0.8), 0 0 60px rgba(0, 212, 255, 0.5)',
      filter: 'brightness(1.1)',
    },
  },
  '&:hover': {
    transform: 'scale(1.05)',
    filter: 'brightness(1.3)',
    textShadow: '0 0 40px rgba(0, 255, 136, 1), 0 0 80px rgba(0, 212, 255, 0.7)',
    animation: 'none',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'white',
  fontWeight: 500,
  borderRadius: '20px',
  padding: '8px 16px',
  margin: '0 4px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'none',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    backdropFilter: 'blur(10px)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  border: '2px solid rgba(255,255,255,0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '2px solid rgba(255,255,255,0.8)',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '12px',
    marginTop: '8px',
    minWidth: '200px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: '8px',
  margin: '4px 8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
    transform: 'translateX(4px)',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);
  const { currentUser: user, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme, theme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenu = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ py: 1 }}>
        <LogoText 
          variant="h5" 
          component={Link} 
          to="/" 
          onClick={handleLogoClick}
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer'
          }}
        >
          🏛️ CivicAid
        </LogoText>
        
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="toggle theme"
              onClick={toggleTheme}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                marginRight: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenu}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              anchorEl={mobileMenuAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleClose}
            >
              <StyledMenuItem component={Link} to="/issues" onClick={handleClose}>
                <ListItemIcon>
                  <AssignmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Issues</ListItemText>
              </StyledMenuItem>
              <StyledMenuItem component={Link} to="/report" onClick={handleClose}>
                <ListItemIcon>
                  <ReportProblemIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Report Issue</ListItemText>
              </StyledMenuItem>
              {isAuthenticated ? (
                <>
                  <Divider sx={{ my: 1 }} />
                  <StyledMenuItem component={Link} to="/dashboard" onClick={handleClose}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                  </StyledMenuItem>
                  <StyledMenuItem component={Link} to="/profile" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </StyledMenuItem>
                  <Divider sx={{ my: 1 }} />
                  <StyledMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </StyledMenuItem>
                </>
              ) : (
                <>
                  <Divider sx={{ my: 1 }} />
                  <StyledMenuItem component={Link} to="/login" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </StyledMenuItem>
                  <StyledMenuItem component={Link} to="/register" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Register</ListItemText>
                  </StyledMenuItem>
                </>
              )}
            </StyledMenu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="toggle theme"
              onClick={toggleTheme}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                marginRight: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <StyledButton component={Link} to="/issues" startIcon={<AssignmentIcon />}>
              Issues
            </StyledButton>
            <StyledButton component={Link} to="/report" startIcon={<ReportProblemIcon />}>
              Report Issue
            </StyledButton>
            {isAuthenticated ? (
              <>
                <StyledButton component={Link} to="/dashboard" startIcon={<DashboardIcon />}>
                  Dashboard
                </StyledButton>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <StyledAvatar>
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </StyledAvatar>
                </IconButton>
                <StyledMenu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Welcome back!
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {user?.name || 'User'}
                    </Typography>
                  </Box>
                  <StyledMenuItem component={Link} to="/profile" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </StyledMenuItem>
                  <Divider sx={{ my: 1 }} />
                  <StyledMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </StyledMenuItem>
                </StyledMenu>
              </>
            ) : (
              <>
                <StyledButton component={Link} to="/login" startIcon={<AccountCircleIcon />}>
                  Login
                </StyledButton>
                <StyledButton 
                  component={Link} 
                  to="/register" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }
                  }}
                >
                  Register
                </StyledButton>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;