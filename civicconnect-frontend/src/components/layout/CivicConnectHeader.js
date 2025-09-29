import React, { useState } from 'react';
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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from '../../contexts/AuthContext';

// CivicAid-inspired styled components
const CivicConnectAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
    pointerEvents: 'none',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.75rem',
  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(0, 255, 136, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 1,
  letterSpacing: '-0.01em',
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

const CivicConnectButton = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  fontWeight: 600,
  borderRadius: 8,
  padding: '8px 16px',
  margin: '0 4px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  textTransform: 'none',
  position: 'relative',
  zIndex: 1,
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
    backdropFilter: 'blur(10px)',
  },
}));

const CivicConnectAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  border: '2px solid rgba(255,255,255,0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    border: '2px solid rgba(255,255,255,0.8)',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
}));

const CivicConnectMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 12,
    marginTop: '8px',
    minWidth: '200px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
  },
}));

const CivicConnectMenuItem = styled(MenuItem)(({ theme }) => ({
  borderRadius: 8,
  margin: '4px 8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    transform: 'translateX(4px)',
  },
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: 8,
  margin: '0 8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    transform: 'scale(1.05)',
  },
}));

const CivicConnectHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { currentUser: user, logout, isAuthenticated } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <CivicConnectAppBar position="static">
      <Toolbar sx={{ py: 1.5 }}>
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
            <ThemeToggleButton
              onClick={toggleTheme}
              aria-label="toggle theme"
            >
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </ThemeToggleButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenu}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 8,
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <CivicConnectMenu
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
              <CivicConnectMenuItem component={Link} to="/issues" onClick={handleClose}>
                <ListItemIcon>
                  <AssignmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Issues</ListItemText>
              </CivicConnectMenuItem>
              <CivicConnectMenuItem component={Link} to="/report" onClick={handleClose}>
                <ListItemIcon>
                  <ReportProblemIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Report Issue</ListItemText>
              </CivicConnectMenuItem>
              {isAuthenticated ? (
                <>
                  <Divider sx={{ my: 1 }} />
                  <CivicConnectMenuItem component={Link} to="/dashboard" onClick={handleClose}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                  </CivicConnectMenuItem>
                  <CivicConnectMenuItem component={Link} to="/profile" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </CivicConnectMenuItem>
                  <Divider sx={{ my: 1 }} />
                  <CivicConnectMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </CivicConnectMenuItem>
                </>
              ) : (
                <>
                  <Divider sx={{ my: 1 }} />
                  <CivicConnectMenuItem component={Link} to="/login" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                  </CivicConnectMenuItem>
                  <CivicConnectMenuItem component={Link} to="/register" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Register</ListItemText>
                  </CivicConnectMenuItem>
                  <CivicConnectMenuItem 
                    component={Link} 
                    to="/admin/login" 
                    onClick={handleClose}
                    sx={{
                      color: '#00FF88',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 255, 136, 0.2)',
                      }
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" sx={{ color: '#00FF88' }} />
                    </ListItemIcon>
                    <ListItemText>Admin</ListItemText>
                  </CivicConnectMenuItem>
                </>
              )}
            </CivicConnectMenu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CivicConnectButton component={Link} to="/issues" startIcon={<AssignmentIcon />}>
              Issues
            </CivicConnectButton>
            <CivicConnectButton component={Link} to="/report" startIcon={<ReportProblemIcon />}>
              Report Issue
            </CivicConnectButton>
            {isAuthenticated ? (
              <>
                <CivicConnectButton component={Link} to="/dashboard" startIcon={<DashboardIcon />}>
                  Dashboard
                </CivicConnectButton>
                <ThemeToggleButton onClick={toggleTheme}>
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ThemeToggleButton>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <CivicConnectAvatar>
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </CivicConnectAvatar>
                </IconButton>
                <CivicConnectMenu
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
                  <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Welcome back!
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {user?.name || 'User'}
                    </Typography>
                  </Box>
                  <CivicConnectMenuItem component={Link} to="/profile" onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </CivicConnectMenuItem>
                  <Divider sx={{ my: 1 }} />
                  <CivicConnectMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </CivicConnectMenuItem>
                </CivicConnectMenu>
              </>
            ) : (
              <>
                <CivicConnectButton component={Link} to="/login" startIcon={<AccountCircleIcon />}>
                  Login
                </CivicConnectButton>
                <CivicConnectButton 
                  component={Link} 
                  to="/register" 
                  sx={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(59, 130, 246, 0.3)',
                    }
                  }}
                >
                  Register
                </CivicConnectButton>
                <CivicConnectButton 
                  component={Link} 
                  to="/admin/login" 
                  sx={{ 
                    backgroundColor: 'rgba(0, 255, 136, 0.2)',
                    color: '#00FF88',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 255, 136, 0.3)',
                      boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)',
                    }
                  }}
                >
                  Admin
                </CivicConnectButton>
                <ThemeToggleButton onClick={toggleTheme}>
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </ThemeToggleButton>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </CivicConnectAppBar>
  );
};

export default CivicConnectHeader;
