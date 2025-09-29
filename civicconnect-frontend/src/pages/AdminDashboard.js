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
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ReportProblem as IssueIcon,
  Business as OrganizationIcon,
  CheckCircle as ResolvedIcon,
  Pending as PendingIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useLanguage } from '../contexts/LanguageContext';

// Styled Components
const AdminDashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `
    linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #16213E 100%),
    radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 70%)
  `,
  backgroundAttachment: 'fixed',
  position: 'relative',
}));

const AdminHeader = styled(Box)(({ theme }) => ({
  background: 'rgba(26, 26, 46, 0.8)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
  padding: theme.spacing(2, 0),
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}));

const AdminTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2rem',
  color: '#FFFFFF',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: 'rgba(26, 26, 46, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 255, 136, 0.1)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
  },
}));

const StatCardContent = styled(CardContent)(({ theme }) => ({
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

const IssuesTable = styled(TableContainer)(({ theme }) => ({
  background: 'rgba(26, 26, 46, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  borderRadius: '16px',
  marginTop: theme.spacing(3),
}));

const TableHeader = styled(TableHead)(({ theme }) => ({
  background: 'rgba(0, 255, 136, 0.1)',
  '& .MuiTableCell-head': {
    color: '#FFFFFF',
    fontWeight: 600,
    borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
  },
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: '#E2E8F0',
  borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: '#00FF88',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#00D4FF',
    transform: 'scale(1.1)',
  },
}));

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    totalOrganizations: 0
  });

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  const mockIssues = [
    {
      id: 1,
      title: 'Broken Street Light on Main Street',
      description: 'Street light has been out for 3 days, causing safety concerns',
      category: 'Infrastructure',
      priority: 'High',
      status: 'Pending',
      reporter: 'John Doe',
      organization: 'City Public Works',
      createdAt: '2024-01-15',
      location: 'Main Street, Block 5',
    },
    {
      id: 2,
      title: 'Pothole on Highway 101',
      description: 'Large pothole causing vehicle damage',
      category: 'Road Maintenance',
      priority: 'Medium',
      status: 'In Progress',
      reporter: 'Jane Smith',
      organization: 'Highway Department',
      createdAt: '2024-01-14',
      location: 'Highway 101, Mile 15',
    },
    {
      id: 3,
      title: 'Garbage Collection Delay',
      description: 'Garbage not collected for 2 weeks',
      category: 'Sanitation',
      priority: 'Low',
      status: 'Resolved',
      reporter: 'Mike Johnson',
      organization: 'Waste Management',
      createdAt: '2024-01-10',
      location: 'Oak Street, Block 2',
    },
  ];

  // Fetch data from APIs
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch issues
      const issuesResponse = await axios.get(`${API_BASE_URL}/issues`);
      setIssues(issuesResponse.data.issues || []);
      
      // Fetch organizations
      const orgsResponse = await axios.get(`${API_BASE_URL}/organizations`);
      setOrganizations(orgsResponse.data.organizations || []);
      
      // Fetch users
      const usersResponse = await axios.get(`${API_BASE_URL}/users`);
      setUsers(usersResponse.data || []);
      
      // Calculate stats
      const issuesData = issuesResponse.data.issues || [];
      const orgsData = orgsResponse.data.organizations || [];
      
      setStats({
        totalIssues: issuesData.length,
        resolvedIssues: issuesData.filter(issue => issue.status === 'Resolved').length,
        pendingIssues: issuesData.filter(issue => issue.status === 'Pending').length,
        totalOrganizations: orgsData.length
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to mock data if API fails
      setIssues(mockIssues);
      setStats({
        totalIssues: mockIssues.length,
        resolvedIssues: mockIssues.filter(issue => issue.status === 'Resolved').length,
        pendingIssues: mockIssues.filter(issue => issue.status === 'Pending').length,
        totalOrganizations: 4
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleViewIssue = (issue) => {
    setSelectedIssue(issue);
    setDialogOpen(true);
  };

  const handleUpdateIssueStatus = async (issueId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/issues/${issueId}`, {
        status: newStatus
      });
      // Refresh data
      fetchData();
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  const handleDeleteIssue = async (issueId) => {
    if (window.confirm(t('admin.dashboard.issues.confirmDelete'))) {
      try {
        await axios.delete(`${API_BASE_URL}/issues/${issueId}`);
        // Refresh data
        fetchData();
      } catch (error) {
        console.error('Error deleting issue:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return '#10B981';
      case 'In Progress':
        return '#F59E0B';
      case 'Pending':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#EF4444';
      case 'Medium':
        return '#F59E0B';
      case 'Low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  if (loading) {
    return (
      <AdminDashboardContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <LinearProgress sx={{ width: '200px' }} />
        </Box>
      </AdminDashboardContainer>
    );
  }

  return (
    <AdminDashboardContainer>
      <AdminHeader>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AdminIcon sx={{ color: '#00FF88', fontSize: '2rem' }} />
              <AdminTitle>{t('admin.dashboard.title')}</AdminTitle>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ color: '#E2E8F0' }}>
                {t('admin.dashboard.welcome', { name: admin?.name })}
              </Typography>
              <IconButton onClick={handleLogout} sx={{ color: '#00FF88' }}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </AdminHeader>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={800}>
              <StatCard>
                <StatCardContent>
                  <StatIcon sx={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                    <Box sx={{ color: '#00FF88', fontSize: '2rem' }}>
                      <IssueIcon />
                    </Box>
                  </StatIcon>
                  <StatNumber>{stats.totalIssues}</StatNumber>
                  <StatLabel>{t('admin.dashboard.stats.totalIssues')}</StatLabel>
                </StatCardContent>
              </StatCard>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={1000}>
              <StatCard>
                <StatCardContent>
                  <StatIcon sx={{ background: 'rgba(0, 212, 255, 0.1)' }}>
                    <Box sx={{ color: '#00D4FF', fontSize: '2rem' }}>
                      <ResolvedIcon />
                    </Box>
                  </StatIcon>
                  <StatNumber>{stats.resolvedIssues}</StatNumber>
                  <StatLabel>{t('admin.dashboard.stats.resolved')}</StatLabel>
                </StatCardContent>
              </StatCard>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={1200}>
              <StatCard>
                <StatCardContent>
                  <StatIcon sx={{ background: 'rgba(255, 193, 7, 0.1)' }}>
                    <Box sx={{ color: '#FFC107', fontSize: '2rem' }}>
                      <PendingIcon />
                    </Box>
                  </StatIcon>
                  <StatNumber>{stats.pendingIssues}</StatNumber>
                  <StatLabel>{t('admin.dashboard.stats.pending')}</StatLabel>
                </StatCardContent>
              </StatCard>
            </Fade>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Fade in timeout={1400}>
              <StatCard>
                <StatCardContent>
                  <StatIcon sx={{ background: 'rgba(0, 255, 136, 0.1)' }}>
                    <Box sx={{ color: '#00FF88', fontSize: '2rem' }}>
                      <OrganizationIcon />
                    </Box>
                  </StatIcon>
                  <StatNumber>{stats.totalOrganizations}</StatNumber>
                  <StatLabel>{t('admin.dashboard.stats.organizations')}</StatLabel>
                </StatCardContent>
              </StatCard>
            </Fade>
          </Grid>
        </Grid>

        {/* Issues Table */}
        <Slide direction="up" in timeout={1000}>
          <IssuesTable component={Paper}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCellStyled>{t('admin.dashboard.issues.issue')}</TableCellStyled>
                  <TableCellStyled>{t('admin.dashboard.issues.category')}</TableCellStyled>
                  <TableCellStyled>{t('admin.dashboard.issues.priority')}</TableCellStyled>
                  <TableCellStyled>{t('admin.dashboard.issues.status')}</TableCellStyled>
                  <TableCellStyled>{t('admin.dashboard.issues.organization')}</TableCellStyled>
                  <TableCellStyled>{t('admin.dashboard.issues.actions')}</TableCellStyled>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCellStyled>
                      <Box>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                          {issue.title}
                        </Typography>
                        <Typography sx={{ color: '#94A3B8', fontSize: '0.875rem' }}>
                          {issue.location?.address || 'No address provided'}
                        </Typography>
                      </Box>
                    </TableCellStyled>
                    <TableCellStyled>
                      <Chip 
                        label={issue.category} 
                        size="small" 
                        sx={{ 
                          backgroundColor: 'rgba(0, 255, 136, 0.1)',
                          color: '#00FF88',
                          border: '1px solid rgba(0, 255, 136, 0.2)'
                        }} 
                      />
                    </TableCellStyled>
                    <TableCellStyled>
                      <Chip 
                        label={issue.priority} 
                        size="small" 
                        sx={{ 
                          backgroundColor: `${getPriorityColor(issue.priority)}20`,
                          color: getPriorityColor(issue.priority),
                          border: `1px solid ${getPriorityColor(issue.priority)}40`
                        }} 
                      />
                    </TableCellStyled>
                    <TableCellStyled>
                      <Chip 
                        label={issue.status} 
                        size="small" 
                        sx={{ 
                          backgroundColor: `${getStatusColor(issue.status)}20`,
                          color: getStatusColor(issue.status),
                          border: `1px solid ${getStatusColor(issue.status)}40`
                        }} 
                      />
                    </TableCellStyled>
                    <TableCellStyled>
                      <Typography sx={{ color: '#E2E8F0' }}>
                        {issue.organization?.name || 'Unknown Organization'}
                      </Typography>
                    </TableCellStyled>
                    <TableCellStyled>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <ActionButton onClick={() => handleViewIssue(issue)}>
                          <ViewIcon />
                        </ActionButton>
                        <ActionButton 
                          onClick={() => handleUpdateIssueStatus(issue._id, 'In Progress')}
                          disabled={issue.status === 'In Progress'}
                        >
                          <EditIcon />
                        </ActionButton>
                        <ActionButton 
                          onClick={() => handleDeleteIssue(issue._id)}
                          sx={{ color: '#FF6B6B' }}
                        >
                          <DeleteIcon />
                        </ActionButton>
                      </Box>
                    </TableCellStyled>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </IssuesTable>
        </Slide>
      </Container>

      {/* Issue Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle sx={{ color: '#FFFFFF', borderBottom: '1px solid rgba(0, 255, 136, 0.2)' }}>
          {t('admin.dashboard.issues.details')}
          <IconButton
            onClick={() => setDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#E2E8F0' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ color: '#E2E8F0' }}>
          {selectedIssue && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
                {selectedIssue.title}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                {selectedIssue.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>{t('admin.dashboard.issues.category')}:</Typography>
                  <Typography>{selectedIssue.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>{t('admin.dashboard.issues.priority')}:</Typography>
                  <Typography>{selectedIssue.priority}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>{t('admin.dashboard.issues.status')}:</Typography>
                  <Typography>{selectedIssue.status}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>{t('admin.dashboard.issues.organization')}:</Typography>
                  <Typography>{selectedIssue.organization}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#94A3B8' }}>Location:</Typography>
                  <Typography>{selectedIssue.location}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Reporter:</Typography>
                  <Typography>{selectedIssue.reporter}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ color: '#94A3B8' }}>Created:</Typography>
                  <Typography>{selectedIssue.createdAt}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid rgba(0, 255, 136, 0.2)' }}>
          <Button 
            onClick={() => setDialogOpen(false)}
            sx={{ color: '#E2E8F0' }}
          >
            {t('admin.dashboard.issues.close')}
          </Button>
          <Button 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
              color: '#000000',
              '&:hover': {
                background: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
              }
            }}
          >
            {t('admin.dashboard.issues.updateStatus')}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
