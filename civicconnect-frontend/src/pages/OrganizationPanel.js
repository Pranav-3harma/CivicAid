import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Avatar,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Business as OrganizationIcon,
  Business,
  People as UserIcon,
  ReportProblem as IssueIcon,
  CheckCircle as ResolvedIcon,
  CheckCircle,
  Pending as PendingIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { useAdminAuth } from '../contexts/AdminAuthContext';

// Styled Components
const OrganizationContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
  position: 'relative',
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

const OrganizationHeader = styled(Box)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.8)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
  padding: theme.spacing(2, 0),
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}));

const OrganizationTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2rem',
  color: '#FFFFFF',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const OrganizationCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(139, 92, 246, 0.2)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
  },
}));

const OrganizationCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const OrganizationAvatar = styled(Avatar)(({ theme }) => ({
  width: '80px',
  height: '80px',
  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  marginBottom: theme.spacing(2),
}));

const OrganizationName = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#FFFFFF',
  marginBottom: theme.spacing(1),
}));

const OrganizationInfo = styled(Typography)(({ theme }) => ({
  color: '#E2E8F0',
  fontSize: '0.875rem',
  marginBottom: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StatsCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
}));

const StatsCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 800,
  color: '#FFFFFF',
  marginBottom: theme.spacing(1),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: '#E2E8F0',
  fontSize: '1rem',
  fontWeight: 500,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    color: '#E2E8F0',
    fontWeight: 600,
    '&.Mui-selected': {
      color: '#8B5CF6',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#8B5CF6',
  },
}));

const OrganizationPanel = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Mock data for demonstration
  const mockOrganizations = [
    {
      id: 1,
      name: 'City Public Works',
      type: 'Government',
      contact: 'John Smith',
      email: 'contact@cityworks.gov',
      phone: '+1 (555) 123-4567',
      address: '123 Government Plaza, City Center',
      issuesCount: 45,
      resolvedCount: 38,
      pendingCount: 7,
      rating: 4.2,
      status: 'Active',
      joinDate: '2023-01-15',
    },
    {
      id: 2,
      name: 'Highway Department',
      type: 'Government',
      contact: 'Sarah Johnson',
      email: 'info@highwaydept.gov',
      phone: '+1 (555) 234-5678',
      address: '456 Transportation Ave, Downtown',
      issuesCount: 32,
      resolvedCount: 28,
      pendingCount: 4,
      rating: 4.5,
      status: 'Active',
      joinDate: '2023-02-20',
    },
    {
      id: 3,
      name: 'Waste Management Inc',
      type: 'Private',
      contact: 'Mike Davis',
      email: 'support@wastemgmt.com',
      phone: '+1 (555) 345-6789',
      address: '789 Industrial Blvd, East Side',
      issuesCount: 28,
      resolvedCount: 25,
      pendingCount: 3,
      rating: 4.0,
      status: 'Active',
      joinDate: '2023-03-10',
    },
    {
      id: 4,
      name: 'Environmental Services',
      type: 'Non-Profit',
      contact: 'Lisa Brown',
      email: 'contact@envservices.org',
      phone: '+1 (555) 456-7890',
      address: '321 Green Street, Eco District',
      issuesCount: 15,
      resolvedCount: 12,
      pendingCount: 3,
      rating: 4.8,
      status: 'Active',
      joinDate: '2023-04-05',
    },
  ];

  const stats = [
    {
      title: 'Total Organizations',
      value: '23',
      icon: <OrganizationIcon />,
      color: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
      title: 'Active Organizations',
      value: '21',
      icon: <CheckCircle />,
      color: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      title: 'Government',
      value: '12',
      icon: <AdminIcon />,
      color: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      title: 'Private',
      value: '8',
      icon: <Business />,
      color: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  // Fetch organizations from API
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/organizations`);
      setOrganizations(response.data.organizations || []);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      // Fallback to mock data if API fails
      setOrganizations(mockOrganizations);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleViewOrganization = (org) => {
    setSelectedOrg(org);
    setDialogOpen(true);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleVerifyOrganization = async (orgId) => {
    try {
      await axios.put(`${API_BASE_URL}/organizations/${orgId}/verify`);
      // Refresh organizations
      fetchOrganizations();
    } catch (error) {
      console.error('Error verifying organization:', error);
    }
  };

  const handleDeleteOrganization = async (orgId) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      try {
        await axios.delete(`${API_BASE_URL}/organizations/${orgId}`);
        // Refresh organizations
        fetchOrganizations();
      } catch (error) {
        console.error('Error deleting organization:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10B981';
      case 'Inactive':
        return '#EF4444';
      case 'Pending':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Government':
        return '#3B82F6';
      case 'Private':
        return '#F59E0B';
      case 'Non-Profit':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  if (loading) {
    return (
      <OrganizationContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <LinearProgress sx={{ width: '200px' }} />
        </Box>
      </OrganizationContainer>
    );
  }

  return (
    <OrganizationContainer>
      <OrganizationHeader>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <OrganizationIcon sx={{ color: '#8B5CF6', fontSize: '2rem' }} />
              <OrganizationTitle>Organization Panel</OrganizationTitle>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: '#E2E8F0' }}>
                Welcome, {admin?.name}
              </Typography>
              <IconButton onClick={handleLogout} sx={{ color: '#EF4444' }}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </OrganizationHeader>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in timeout={800 + index * 200}>
                <StatsCard>
                  <StatsCardContent>
                    <StatIcon sx={{ background: stat.bgColor }}>
                      <Box sx={{ color: stat.color, fontSize: '2rem' }}>
                        {stat.icon}
                      </Box>
                    </StatIcon>
                    <StatNumber>{stat.value}</StatNumber>
                    <StatLabel>{stat.title}</StatLabel>
                  </StatsCardContent>
                </StatsCard>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <StyledTabs value={tabValue} onChange={handleTabChange}>
            <Tab label="All Organizations" />
            <Tab label="Government" />
            <Tab label="Private" />
            <Tab label="Non-Profit" />
          </StyledTabs>
        </Box>

        {/* Organizations Grid */}
        <Grid container spacing={3}>
          {organizations.map((org, index) => (
            <Grid item xs={12} md={6} lg={4} key={org.id}>
              <Fade in timeout={1000 + index * 200}>
                <OrganizationCard>
                  <OrganizationCardContent sx={{ textAlign: 'center' }}>
                    <OrganizationAvatar>
                      <OrganizationIcon sx={{ fontSize: '2rem' }} />
                    </OrganizationAvatar>
                    <OrganizationName>{org.name}</OrganizationName>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={org.type} 
                        size="small" 
                        sx={{ 
                          backgroundColor: `${getTypeColor(org.type)}20`,
                          color: getTypeColor(org.type),
                          border: `1px solid ${getTypeColor(org.type)}40`,
                          mr: 1
                        }} 
                      />
                      <Chip 
                        label={org.status} 
                        size="small" 
                        sx={{ 
                          backgroundColor: `${getStatusColor(org.status)}20`,
                          color: getStatusColor(org.status),
                          border: `1px solid ${getStatusColor(org.status)}40`
                        }} 
                      />
                    </Box>

                    <OrganizationInfo>
                      <EmailIcon sx={{ fontSize: '1rem' }} />
                      {org.email}
                    </OrganizationInfo>
                    <OrganizationInfo>
                      <PhoneIcon sx={{ fontSize: '1rem' }} />
                      {org.phone || 'No phone provided'}
                    </OrganizationInfo>
                    <OrganizationInfo>
                      <LocationIcon sx={{ fontSize: '1rem' }} />
                      {org.address ? `${org.address.city}, ${org.address.state}` : 'No address provided'}
                    </OrganizationInfo>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                          {org.issuesCount}
                        </Typography>
                        <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                          Issues
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ color: '#10B981', fontWeight: 600 }}>
                          {org.resolvedCount}
                        </Typography>
                        <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                          Resolved
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ color: '#F59E0B', fontWeight: 600 }}>
                          {org.pendingCount}
                        </Typography>
                        <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                          Pending
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewOrganization(org)}
                        sx={{
                          borderColor: '#8B5CF6',
                          color: '#8B5CF6',
                          '&:hover': {
                            borderColor: '#A78BFA',
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                          }
                        }}
                      >
                        View Details
                      </Button>
                      {!org.isVerified && (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleVerifyOrganization(org._id)}
                          sx={{
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            }
                          }}
                        >
                          Verify
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDeleteOrganization(org._id)}
                        sx={{
                          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </OrganizationCardContent>
                </OrganizationCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Organization Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', borderBottom: '1px solid rgba(139, 92, 246, 0.2)' }}>
          Organization Details
          <IconButton
            onClick={() => setDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#E2E8F0' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ color: '#E2E8F0' }}>
          {selectedOrg && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
                {selectedOrg.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Type:</Typography>
                  <Typography>{selectedOrg.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Status:</Typography>
                  <Typography>{selectedOrg.status}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Contact:</Typography>
                  <Typography>{selectedOrg.contact}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Email:</Typography>
                  <Typography>{selectedOrg.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Phone:</Typography>
                  <Typography>{selectedOrg.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Rating:</Typography>
                  <Typography>{selectedOrg.rating}/5.0</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#94A3B8' }}>Address:</Typography>
                  <Typography>{selectedOrg.address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Total Issues:</Typography>
                  <Typography>{selectedOrg.issuesCount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Join Date:</Typography>
                  <Typography>{selectedOrg.joinDate}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <Button 
            onClick={() => setDialogOpen(false)}
            sx={{ color: '#E2E8F0' }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              }
            }}
          >
            Edit Organization
          </Button>
        </DialogActions>
      </Dialog>
    </OrganizationContainer>
  );
};

export default OrganizationPanel;
