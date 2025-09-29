import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useAuth } from '../contexts/AuthContext';
import { getMyIssues } from '../services/issueService';
import { getResolutionsByIssue } from '../services/resolutionService';
import { useNotification } from '../contexts/NotificationContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  boxShadow: theme.shadows[2]
}));

const DashboardPage = () => {
  const { currentUser: user, isAuthenticated } = useAuth();
  const { showError } = useNotification();
  const { t } = useLanguage();
  const [tabValue, setTabValue] = useState(0);
  const [userIssues, setUserIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0
  });

  useEffect(() => {
    const fetchUserIssues = async () => {
      if (!isAuthenticated) return;
      
      setLoading(true);
      setError(null);
      try {
        const issues = await getMyIssues();
        setUserIssues(issues);
        
        // Calculate stats
        const statsData = {
          total: issues.length,
          open: issues.filter(issue => issue.status === 'open').length,
          inProgress: issues.filter(issue => issue.status === 'in_progress').length,
          resolved: issues.filter(issue => issue.status === 'resolved').length,
          closed: issues.filter(issue => issue.status === 'closed').length
        };
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching user issues:', err);
        const errorMessage = 'Failed to load your issues. Please try again later.';
        setError(errorMessage);
        showError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIssues();
  }, [isAuthenticated, showError]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'info';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFilteredIssues = () => {
    switch (tabValue) {
      case 0: return userIssues;
      case 1: return userIssues.filter(issue => issue.status === 'open');
      case 2: return userIssues.filter(issue => issue.status === 'in_progress');
      case 3: return userIssues.filter(issue => issue.status === 'resolved' || issue.status === 'closed');
      default: return userIssues;
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          You need to be logged in to view your dashboard.
        </Alert>
        <Button 
          component={RouterLink} 
          to="/login" 
          variant="contained" 
          color="primary"
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* User Info */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar 
                sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
              <Chip 
                label={user?.role} 
                color="primary" 
                size="small" 
                sx={{ mt: 1 }} 
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>Account Information</Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary={t('dashboard.memberSince')} 
                  secondary={user?.createdAt ? formatDate(user.createdAt) : 'N/A'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary={t('dashboard.phone')} 
                  secondary={user?.phone || 'Not provided'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary={t('dashboard.location')} 
                  secondary={user?.address || 'Not provided'} 
                />
              </ListItem>
            </List>
            <Button 
              component={RouterLink} 
              to="/profile" 
              variant="outlined" 
              fullWidth 
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </StyledPaper>
        </Grid>
        
        {/* Stats */}
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Your Issue Statistics</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <AssignmentIcon fontSize="large" />
                    <Typography variant="h4">{stats.total}</Typography>
                    <Typography variant="body2">Total Issues</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <PendingIcon fontSize="large" />
                    <Typography variant="h4">{stats.open}</Typography>
                    <Typography variant="body2">Open Issues</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <PendingIcon fontSize="large" />
                    <Typography variant="h4">{stats.inProgress}</Typography>
                    <Typography variant="body2">In Progress</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <CheckCircleIcon fontSize="large" />
                    <Typography variant="h4">{stats.resolved}</Typography>
                    <Typography variant="body2">Resolved</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button 
                    component={RouterLink} 
                    to="/report" 
                    variant="contained" 
                    size="large"
                    sx={{ px: 4 }}
                  >
                    Report New Issue
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        
        {/* User Issues */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Your Issues</Typography>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              indicatorColor="primary"
              textColor="primary"
              sx={{ mb: 3 }}
            >
              <Tab label={t('dashboard.all')} />
              <Tab label={t('dashboard.open')} />
              <Tab label={t('dashboard.inProgress')} />
              <Tab label={t('dashboard.resolved')} />
            </Tabs>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress size={60} thickness={4} />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Loading your issues...
                </Typography>
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ my: 2 }}>
                {error}
                <Button 
                  onClick={() => window.location.reload()} 
                  size="small" 
                  sx={{ ml: 2 }}
                >
                  Retry
                </Button>
              </Alert>
            ) : getFilteredIssues().length === 0 ? (
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  No issues found in this category.
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/report" 
                  variant="contained" 
                  sx={{ mt: 2 }}
                >
                  Report an Issue
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {getFilteredIssues().map((issue) => (
                  <Grid item xs={12} sm={6} md={4} key={issue._id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardActionArea component={RouterLink} to={`/issues/${issue._id}`}>
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="h2" noWrap>
                            {issue.title}
                          </Typography>
                          <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {issue.location?.address || 'Location not specified'}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            mb: 2
                          }}>
                            {issue.description}
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                            <Chip 
                              label={issue.category} 
                              size="small" 
                              color="primary" 
                              variant="outlined" 
                            />
                            <Chip 
                              label={issue.status} 
                              size="small" 
                              color={getStatusColor(issue.status)} 
                            />
                          </Box>
                          <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'right' }}>
                            Reported on {formatDate(issue.createdAt)}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;