import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
import {
  LocationOn,
  Email,
  Phone,
  Language,
  Verified,
  People,
  Assignment,
  CheckCircle
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { getOrganizationById, addMember } from '../services/organizationService';
import { getIssuesByOrganization } from '../services/issueService';
import { getResolutionsByOrganization } from '../services/resolutionService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApiRequest from '../hooks/useApiRequest';

const OrganizationDetailPage = () => {
  const { id } = useParams();
  const { currentUser: user } = useAuth();
  const { showSnackbar: showNotification } = useNotification();
  const [tabValue, setTabValue] = useState(0);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinReason, setJoinReason] = useState('');
  const [joinError, setJoinError] = useState(null);

  // Fetch organization data
  const organizationRequest = useApiRequest(
    async () => await getOrganizationById(id),
    {
      onError: () => {
        showNotification('Failed to load organization details', 'error');
      },
      showErrorNotification: false
    }
  );

  // Fetch issues data
  const issuesRequest = useApiRequest(
    async () => await getIssuesByOrganization(id),
    {
      onError: () => {
        showNotification('Failed to load organization issues', 'error');
      },
      showErrorNotification: false
    }
  );

  // Fetch resolutions data
  const resolutionsRequest = useApiRequest(
    async () => await getResolutionsByOrganization(id),
    {
      onError: () => {
        showNotification('Failed to load organization resolutions', 'error');
      },
      showErrorNotification: false
    }
  );

  // Join organization request
  const joinRequest = useApiRequest(
    async () => await addMember(id, { reason: joinReason }),
    {
      onSuccess: () => {
        showNotification('Membership request submitted successfully', 'success');
        setJoinDialogOpen(false);
        // Update organization data to reflect the pending request
        if (organizationRequest.data) {
          organizationRequest.setData(prev => ({
            ...prev,
            membershipRequests: [...(prev.membershipRequests || []), {
              user: user._id,
              status: 'pending',
              reason: joinReason
            }]
          }));
        }
      },
      onError: (err) => {
        setJoinError(err.response?.data?.message || 'Failed to submit join request. Please try again.');
      },
      showErrorNotification: false
    }
  );

  // Extract data from requests
  const { data: organization, loading: orgLoading, error: orgError, execute: fetchOrganization } = organizationRequest;
  const { data: issuesData, execute: fetchIssues } = issuesRequest;
  const { data: resolutionsData, execute: fetchResolutions } = resolutionsRequest;
  const { loading: joinLoading } = joinRequest;

  const issues = issuesData?.issues || [];
  const resolutions = resolutionsData?.resolutions || [];
  const loading = orgLoading;
  const error = orgError;

  useEffect(() => {
    fetchOrganization();
    fetchIssues();
    fetchResolutions();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleJoinDialogOpen = () => {
    setJoinDialogOpen(true);
  };

  const handleJoinDialogClose = () => {
    setJoinDialogOpen(false);
    setJoinError(null);
  };

  const handleJoinReasonChange = (event) => {
    setJoinReason(event.target.value);
  };

  const handleJoinSubmit = () => {
    if (!joinReason.trim()) {
      setJoinError('Please provide a reason for joining');
      return;
    }
    
    setJoinError(null);
    joinRequest.execute();
  };

  const isUserMember = () => {
    if (!user || !organization) return false;
    return organization.members?.some(member => member.user === user._id || member.user._id === user._id);
  };

  const hasPendingRequest = () => {
    if (!user || !organization) return false;
    return organization.membershipRequests?.some(
      request => (request.user === user._id || request.user._id === user._id) && request.status === 'pending'
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <LoadingSpinner message="Loading organization details..." />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>
          Failed to load organization details. Please try again later.
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ ml: 2 }} 
            onClick={fetchOrganization}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!organization) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ my: 2 }}>Organization not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Organization Header */}
      <Paper elevation={2} sx={{ mb: 4, overflow: 'hidden' }}>
        {organization.coverImage ? (
          <Box sx={{ height: 200, overflow: 'hidden' }}>
            <img 
              src={organization.coverImage} 
              alt={`${organization.name} cover`} 
              style={{ width: '100%', objectFit: 'cover' }}
            />
          </Box>
        ) : (
          <Box sx={{ height: 100, bgcolor: 'primary.light' }} />
        )}
        
        <Box sx={{ p: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' } }}>
          {organization.logo ? (
            <Avatar 
              src={organization.logo} 
              alt={organization.name}
              sx={{ 
                width: 100, 
                height: 100, 
                border: '4px solid white',
                boxShadow: 1,
                mt: organization.coverImage ? { xs: -8, md: -8 } : 0,
                mb: { xs: 2, md: 0 },
                mr: { md: 3 }
              }}
            />
          ) : (
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                bgcolor: 'primary.main',
                border: '4px solid white',
                boxShadow: 1,
                mt: organization.coverImage ? { xs: -8, md: -8 } : 0,
                mb: { xs: 2, md: 0 },
                mr: { md: 3 }
              }}
            >
              {organization.name.charAt(0)}
            </Avatar>
          )}
          
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" component="h1">
                {organization.name}
              </Typography>
              {organization.verified && (
                <Verified color="primary" sx={{ ml: 1 }} />
              )}
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip 
                label={organization.category} 
                color="primary" 
                size="small" 
              />
              <Chip 
                icon={<People fontSize="small" />}
                label={`${organization.members?.length || 0} members`}
                variant="outlined"
                size="small"
              />
              <Chip 
                icon={<Assignment fontSize="small" />}
                label={`${issues.length} issues handled`}
                variant="outlined"
                size="small"
              />
              <Chip 
                icon={<CheckCircle fontSize="small" />}
                label={`${resolutions.length} resolutions`}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
          
          {user && !isUserMember() && !hasPendingRequest() && (
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleJoinDialogOpen}
              sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}
            >
              Join Organization
            </Button>
          )}
          
          {user && hasPendingRequest() && (
            <Chip 
              label="Membership Pending" 
              color="warning" 
              sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}
            />
          )}
          
          {user && isUserMember() && (
            <Chip 
              label="Member" 
              color="success" 
              sx={{ alignSelf: { xs: 'flex-start', md: 'center' } }}
            />
          )}
        </Box>
      </Paper>
      
      {/* Organization Content */}
      <Grid container spacing={4}>
        {/* Left Column - Organization Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>About</Typography>
              <Typography variant="body2" paragraph>
                {organization.description || 'No description provided.'}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" gutterBottom>Contact Information</Typography>
              
              <List dense disablePadding>
                {organization.location && (
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemAvatar sx={{ minWidth: 36 }}>
                      <LocationOn fontSize="small" color="action" />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={organization.location.address} 
                      secondary={`${organization.location.city}, ${organization.location.state}, ${organization.location.postalCode}`}
                    />
                  </ListItem>
                )}
                
                {organization.email && (
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemAvatar sx={{ minWidth: 36 }}>
                      <Email fontSize="small" color="action" />
                    </ListItemAvatar>
                    <ListItemText primary={organization.email} />
                  </ListItem>
                )}
                
                {organization.phone && (
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemAvatar sx={{ minWidth: 36 }}>
                      <Phone fontSize="small" color="action" />
                    </ListItemAvatar>
                    <ListItemText primary={organization.phone} />
                  </ListItem>
                )}
                
                {organization.website && (
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemAvatar sx={{ minWidth: 36 }}>
                      <Language fontSize="small" color="action" />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={
                        <a 
                          href={organization.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {organization.website}
                        </a>
                      } 
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
          
          {/* Members Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Key Members</Typography>
              <List dense>
                {organization.members?.slice(0, 5).map((member) => (
                  <ListItem key={member.user._id || member.user}>
                    <ListItemAvatar>
                      <Avatar src={member.user.avatar}>
                        {member.user.name ? member.user.name.charAt(0) : 'U'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={member.user.name || 'Unknown User'} 
                      secondary={member.role || 'Member'} 
                    />
                  </ListItem>
                ))}
              </List>
              {organization.members?.length > 5 && (
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <Button size="small" component={RouterLink} to={`/organizations/${id}/members`}>
                    View all members
                  </Button>
                </Box>
              )}
              {(!organization.members || organization.members.length === 0) && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No members to display
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Right Column - Issues and Resolutions */}
        <Grid item xs={12} md={8}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="organization tabs">
              <Tab label="Issues Handled" id="tab-0" />
              <Tab label="Resolutions" id="tab-1" />
            </Tabs>
          </Box>
          
          {/* Issues Tab */}
          <div role="tabpanel" hidden={tabValue !== 0}>
            {tabValue === 0 && (
              <>
                {issues.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No issues are currently being handled by this organization.
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {issues.map((issue) => (
                      <Grid item xs={12} key={issue._id}>
                        <Card sx={{ display: 'flex', height: '100%' }}>
                          {issue.images && issue.images.length > 0 && (
                            <CardMedia
                              component="img"
                              sx={{ width: 120 }}
                              image={issue.images[0]}
                              alt={issue.title}
                            />
                          )}
                          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                              <Typography component="div" variant="h6">
                                <RouterLink to={`/issues/${issue._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                  {issue.title}
                                </RouterLink>
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <Chip 
                                  label={issue.category} 
                                  size="small" 
                                  color="primary" 
                                  variant="outlined" 
                                />
                                <Chip 
                                  label={issue.status} 
                                  size="small" 
                                  color={
                                    issue.status === 'resolved' ? 'success' : 
                                    issue.status === 'in_progress' ? 'warning' : 'default'
                                  } 
                                />
                              </Box>
                              <Typography variant="body2" color="text.secondary" noWrap>
                                {issue.location?.address}
                              </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                                {new Date(issue.createdAt).toLocaleDateString()}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {issue.upvotes || 0} upvotes
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </div>
          
          {/* Resolutions Tab */}
          <div role="tabpanel" hidden={tabValue !== 1}>
            {tabValue === 1 && (
              <>
                {resolutions.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No resolutions have been provided by this organization yet.
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {resolutions.map((resolution) => (
                      <Grid item xs={12} key={resolution._id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              <RouterLink 
                                to={`/issues/${resolution.issue._id}`} 
                                style={{ textDecoration: 'none', color: 'inherit' }}
                              >
                                {resolution.issue.title}
                              </RouterLink>
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {resolution.description}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary">
                                Resolved on {new Date(resolution.createdAt).toLocaleDateString()}
                              </Typography>
                              <Chip 
                                label={`${resolution.feedback?.length || 0} feedback`} 
                                size="small" 
                                variant="outlined" 
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </div>
        </Grid>
      </Grid>
      
      {/* Join Organization Dialog */}
      <Dialog open={joinDialogOpen} onClose={handleJoinDialogClose}>
        <DialogTitle>Join {organization.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a brief reason why you want to join this organization. Your request will be reviewed by the organization administrators.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason for joining"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={joinReason}
            onChange={handleJoinReasonChange}
            error={!!joinError}
            helperText={joinError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleJoinDialogClose}>Cancel</Button>
          <Button 
            onClick={handleJoinSubmit} 
            variant="contained" 
            disabled={joinLoading}
          >
            {joinLoading ? <LoadingSpinner size={24} /> : 'Submit Request'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrganizationDetailPage;