import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile as updateProfile, changePassword } from '../services/userService';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApiRequest from '../hooks/useApiRequest';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[2]
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ProfilePage = () => {
  const { currentUser: user, updateUser } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  
  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Validation errors
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  
  // Additional state for error handling
  const [formError, setFormError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  // Get user profile data
  const { 
    loading: fetchProfileLoading,
    error: fetchProfileError,
    execute: fetchUserProfile 
  } = useApiRequest(updateProfile);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
      
      if (user.profileImage) {
        setProfileImagePreview(user.profileImage);
      }
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is edited
    if (profileErrors[name]) {
      setProfileErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is edited
    if (passwordErrors[name]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!profileForm.name.trim()) errors.name = 'Name is required';
    if (!profileForm.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordForm.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) errors.newPassword = 'New password is required';
    else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    if (!passwordForm.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Use useApiRequest hook for profile update
  const { 
    loading: profileUpdateLoading,
    error: profileUpdateError,
    execute: executeProfileUpdate
  } = useApiRequest(updateProfile);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;
    
    setFormError('');
    setUpdateSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('name', profileForm.name);
      formData.append('email', profileForm.email);
      if (profileForm.phone) formData.append('phone', profileForm.phone);
      if (profileForm.address) formData.append('address', profileForm.address);
      if (profileImage) formData.append('profileImage', profileImage);
      
      const updatedUser = await executeProfileUpdate(formData);
      updateUser(updatedUser);
      
      setNotification({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success'
      });
      setUpdateSuccess(true);
      showSuccess('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      setNotification({
        open: true,
        message: err.response?.data?.message || 'Failed to update profile',
        severity: 'error'
      });
      setFormError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      showError('Failed to update profile: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Use useApiRequest hook for password change
  const { 
    loading: passwordUpdateLoading,
    error: passwordUpdateError,
    execute: executePasswordChange
  } = useApiRequest(changePassword);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setFormError('');
    setUpdateSuccess(false);
    
    try {
      await executePasswordChange(passwordForm.currentPassword, passwordForm.newPassword);
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setNotification({
        open: true,
        message: 'Password changed successfully',
        severity: 'success'
      });
      setUpdateSuccess(true);
      showSuccess('Password changed successfully');
    } catch (err) {
      console.error('Error changing password:', err);
      setNotification({
        open: true,
        message: err.response?.data?.message || 'Failed to change password',
        severity: 'error'
      });
      setFormError(err.response?.data?.message || 'Failed to change password. Please check your current password.');
      showError('Failed to change password: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Use useApiRequest hook for account deletion
  const { 
    loading: deleteAccountLoading,
    error: deleteAccountError,
    execute: executeDeleteAccount
  } = useApiRequest(async () => {
    // Since there's no deleteAccount in userService, we'll implement a simple logout
    // In a real app, this would call a proper delete account API
    console.warn('Delete account functionality not implemented in backend');
    throw new Error('Delete account functionality not implemented');
  });

  const handleDeleteAccount = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleConfirmDeleteAccount = async () => {
    setOpenDialog(false);
    
    try {
      await executeDeleteAccount();
      showSuccess('Your account has been deleted');
      // logout(); // Would need to import logout from auth context
    } catch (err) {
      console.error('Error deleting account:', err);
      setFormError(err.response?.data?.message || 'Failed to delete account. Please try again.');
      showError('Failed to delete account: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (fetchProfileLoading) {
    return <LoadingSpinner message="Loading profile..." />;
  }
  
  if (fetchProfileError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {fetchProfileError}
        </Alert>
        <Button variant="contained" onClick={() => fetchUserProfile()}>
          Retry
        </Button>
      </Container>
    );
  }
  
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          You need to be logged in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Profile
      </Typography>
      
      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Profile Information</Typography>
            <Box component="form" onSubmit={handleProfileSubmit}>
              {formError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {formError}
                </Alert>
              )}
              
              {updateSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Your profile has been updated successfully.
                </Alert>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={profileImagePreview} 
                  sx={{ width: 100, height: 100, mb: 2 }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                >
                  Change Photo
                  <VisuallyHiddenInput 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    error={!!profileErrors.name}
                    helperText={profileErrors.name}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    error={!!profileErrors.email}
                    helperText={profileErrors.email}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={profileForm.address}
                    onChange={handleProfileChange}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={profileUpdateLoading}
                    sx={{ mt: 1 }}
                  >
                    {profileUpdateLoading ? <LoadingSpinner size={24} /> : 'Save Changes'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </Grid>
        
        {/* Password Change */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Change Password</Typography>
            <Box component="form" onSubmit={handlePasswordSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    error={!!passwordErrors.currentPassword}
                    helperText={passwordErrors.currentPassword}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            edge="end"
                          >
                            {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    error={!!passwordErrors.newPassword}
                    helperText={passwordErrors.newPassword}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    error={!!passwordErrors.confirmPassword}
                    helperText={passwordErrors.confirmPassword}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={passwordUpdateLoading}
                    sx={{ mt: 1 }}
                  >
                    {passwordUpdateLoading ? <LoadingSpinner size={24} /> : 'Change Password'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
          
          {/* Account Management */}
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Account Management</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Deleting your account will permanently remove all your data from our system. This action cannot be undone.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>
      
      {/* Delete Account Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Delete Your Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All your personal data, reported issues, and comments will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDeleteAccount} disabled={deleteAccountLoading}>
            {deleteAccountLoading ? <LoadingSpinner size={24} /> : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;