import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getOrganizationById, addMember, removeMember } from '../services/organizationService';

const OrganizationMembersPage = () => {
  const { id } = useParams();
  const { currentUser: user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    role: 'member'
  });
  const [formError, setFormError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      setLoading(true);
      setError(null);
      try {
        const orgData = await getOrganizationById(id);
        setOrganization(orgData);
      } catch (err) {
        console.error('Error fetching organization data:', err);
        setError('Failed to load organization details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDialogOpen = (type, member = null) => {
    setDialogType(type);
    setSelectedMember(member);
    if (type === 'edit' && member) {
      setFormData({
        email: member.user.email || '',
        role: member.role || 'member'
      });
    } else {
      setFormData({
        email: '',
        role: 'member'
      });
    }
    setFormError(null);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedMember(null);
    setFormError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddMember = async () => {
    if (!formData.email.trim()) {
      setFormError('Email is required');
      return;
    }

    setActionLoading(true);
    setFormError(null);

    try {
      await addMember(id, { 
        email: formData.email, 
        role: formData.role 
      });
      
      // Refresh organization data
      const updatedOrg = await getOrganizationById(id);
      setOrganization(updatedOrg);
      
      handleDialogClose();
    } catch (err) {
      console.error('Error adding member:', err);
      setFormError(err.response?.data?.message || 'Failed to add member. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveMember = async () => {
    if (!selectedMember) return;

    setActionLoading(true);
    setFormError(null);

    try {
      await removeMember(id, selectedMember.user._id || selectedMember.user);
      
      // Refresh organization data
      const updatedOrg = await getOrganizationById(id);
      setOrganization(updatedOrg);
      
      handleDialogClose();
    } catch (err) {
      console.error('Error removing member:', err);
      setFormError(err.response?.data?.message || 'Failed to remove member. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateMember = async () => {
    if (!selectedMember) return;

    setActionLoading(true);
    setFormError(null);

    try {
      // This would typically call an API to update the member's role
      // For now, we'll simulate by removing and re-adding with the new role
      await removeMember(id, selectedMember.user._id || selectedMember.user);
      await addMember(id, { 
        email: selectedMember.user.email, 
        role: formData.role 
      });
      
      // Refresh organization data
      const updatedOrg = await getOrganizationById(id);
      setOrganization(updatedOrg);
      
      handleDialogClose();
    } catch (err) {
      console.error('Error updating member:', err);
      setFormError(err.response?.data?.message || 'Failed to update member. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    setActionLoading(true);
    setError(null);

    try {
      // This would typically call an API to approve/reject the request
      // For now, we'll simulate by refreshing the organization data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Refresh organization data
      const updatedOrg = await getOrganizationById(id);
      setOrganization(updatedOrg);
    } catch (err) {
      console.error(`Error ${action} request:`, err);
      setError(`Failed to ${action} request. Please try again later.`);
    } finally {
      setActionLoading(false);
    }
  };

  const isAdmin = () => {
    if (!user || !organization) return false;
    const currentUserMember = organization.members?.find(
      member => (member.user._id || member.user) === user._id
    );
    return currentUserMember && ['admin', 'owner'].includes(currentUserMember.role);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {organization.name} - Members
        </Typography>
        {isAdmin() && (
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => handleDialogOpen('add')}
          >
            Add Member
          </Button>
        )}
      </Box>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="member tabs">
            <Tab label="Members" id="tab-0" />
            {isAdmin() && <Tab label="Membership Requests" id="tab-1" />}
          </Tabs>
        </Box>

        {/* Members Tab */}
        <div role="tabpanel" hidden={tabValue !== 0}>
          {tabValue === 0 && (
            <List>
              {organization.members?.length > 0 ? (
                organization.members.map((member) => (
                  <React.Fragment key={member.user._id || member.user}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={member.user.avatar}>
                          {member.user.name ? member.user.name.charAt(0) : 'U'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={member.user.name || 'Unknown User'}
                        secondary={
                          <>
                            {member.user.email}<br />
                            <Chip 
                              label={member.role} 
                              size="small" 
                              color={
                                member.role === 'owner' ? 'error' : 
                                member.role === 'admin' ? 'warning' : 'default'
                              }
                              sx={{ mt: 0.5 }}
                            />
                          </>
                        }
                      />
                      {isAdmin() && member.role !== 'owner' && (
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleDialogOpen('edit', member)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" onClick={() => handleDialogOpen('remove', member)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No members found" />
                </ListItem>
              )}
            </List>
          )}
        </div>

        {/* Membership Requests Tab */}
        <div role="tabpanel" hidden={tabValue !== 1 || !isAdmin()}>
          {tabValue === 1 && isAdmin() && (
            <List>
              {organization.membershipRequests?.length > 0 ? (
                organization.membershipRequests
                  .filter(request => request.status === 'pending')
                  .map((request) => (
                    <React.Fragment key={request._id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={request.user.avatar}>
                            {request.user.name ? request.user.name.charAt(0) : 'U'}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={request.user.name || 'Unknown User'}
                          secondary={
                            <>
                              {request.user.email}<br />
                              <Typography variant="caption" component="span">
                                Reason: {request.reason || 'No reason provided'}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            color="success" 
                            onClick={() => handleRequestAction(request._id, 'approve')}
                            disabled={actionLoading}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            color="error" 
                            onClick={() => handleRequestAction(request._id, 'reject')}
                            disabled={actionLoading}
                          >
                            <CloseIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
              ) : (
                <ListItem>
                  <ListItemText primary="No pending membership requests" />
                </ListItem>
              )}
            </List>
          )}
        </div>
      </Paper>

      {/* Dialogs */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        {dialogType === 'add' && (
          <>
            <DialogTitle>Add Member</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 2 }}>
                Enter the email address of the user you want to add to this organization.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
                error={!!formError}
                helperText={formError}
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="member">Member</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button 
                onClick={handleAddMember} 
                variant="contained" 
                disabled={actionLoading}
              >
                {actionLoading ? <CircularProgress size={24} /> : 'Add'}
              </Button>
            </DialogActions>
          </>
        )}

        {dialogType === 'edit' && selectedMember && (
          <>
            <DialogTitle>Edit Member Role</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 2 }}>
                Update the role for {selectedMember.user.name || selectedMember.user.email || 'this member'}.
              </DialogContentText>
              <FormControl fullWidth margin="dense">
                <InputLabel id="role-edit-label">Role</InputLabel>
                <Select
                  labelId="role-edit-label"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="member">Member</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              {formError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {formError}
                </Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button 
                onClick={handleUpdateMember} 
                variant="contained" 
                disabled={actionLoading}
              >
                {actionLoading ? <CircularProgress size={24} /> : 'Update'}
              </Button>
            </DialogActions>
          </>
        )}

        {dialogType === 'remove' && selectedMember && (
          <>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to remove {selectedMember.user.name || selectedMember.user.email || 'this member'} from the organization?
              </DialogContentText>
              {formError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {formError}
                </Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button 
                onClick={handleRemoveMember} 
                variant="contained" 
                color="error" 
                disabled={actionLoading}
              >
                {actionLoading ? <CircularProgress size={24} /> : 'Remove'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default OrganizationMembersPage;