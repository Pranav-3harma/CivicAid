import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  IconButton,
  Avatar
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { createOrganization } from '../services/organizationService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApiRequest from '../hooks/useApiRequest';

const CreateOrganizationPage = () => {
  const navigate = useNavigate();
  const { currentUser: user } = useAuth();
  const { showSnackbar: showNotification } = useNotification();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    logo: null,
    coverImage: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  // Check if user is authenticated
  if (!user) {
    navigate('/login', { state: { from: '/organizations/create' } });
    return null;
  }

  const steps = ['Basic Information', 'Contact Details', 'Media'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          [name]: 'File size should not exceed 5MB'
        });
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setFormErrors({
          ...formErrors,
          [name]: 'Only JPG, JPEG, and PNG files are allowed'
        });
        return;
      }
      
      setFormData({
        ...formData,
        [name]: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (name === 'logo') {
          setLogoPreview(e.target.result);
        } else if (name === 'coverImage') {
          setCoverPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
      
      // Clear error for this field if it exists
      if (formErrors[name]) {
        setFormErrors({
          ...formErrors,
          [name]: null
        });
      }
    }
  };

  const handleRemoveFile = (fileType) => {
    if (fileType === 'logo') {
      setFormData({
        ...formData,
        logo: null
      });
      setLogoPreview(null);
    } else if (fileType === 'coverImage') {
      setFormData({
        ...formData,
        coverImage: null
      });
      setCoverPreview(null);
    }
  };

  const validateStep = () => {
    const errors = {};
    
    if (activeStep === 0) {
      if (!formData.name.trim()) errors.name = 'Organization name is required';
      if (!formData.description.trim()) errors.description = 'Description is required';
      if (!formData.category) errors.category = 'Category is required';
    } else if (activeStep === 1) {
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      if (!formData.address.trim()) errors.address = 'Address is required';
      if (!formData.city.trim()) errors.city = 'City is required';
      if (!formData.state.trim()) errors.state = 'State is required';
      if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // API request for creating organization
  const createOrganizationRequest = useApiRequest(
    async () => {
      // Create FormData object for file uploads
      const organizationData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          if (key === 'logo' || key === 'coverImage') {
            if (formData[key]) {
              organizationData.append(key, formData[key]);
            }
          } else {
            organizationData.append(key, formData[key]);
          }
        }
      });
      
      // Create location object structure
      organizationData.append('location[address]', formData.address);
      organizationData.append('location[city]', formData.city);
      organizationData.append('location[state]', formData.state);
      organizationData.append('location[postalCode]', formData.postalCode);
      organizationData.append('location[country]', formData.country);
      
      return await createOrganization(organizationData);
    },
    {
      onSuccess: (response) => {
        showNotification('Organization created successfully!', 'success');
        navigate(`/organizations/${response._id}`);
      },
      onError: (err) => {
        showNotification('Failed to create organization. Please try again.', 'error');
      },
      showErrorNotification: false
    }
  );

  const { loading, error, execute: submitCreateOrganization } = createOrganizationRequest;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }
    
    submitCreateOrganization();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label="Organization Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              required
              multiline
              rows={4}
              error={!!formErrors.description}
              helperText={formErrors.description}
            />
            
            <FormControl 
              fullWidth 
              margin="normal" 
              required
              error={!!formErrors.category}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
              >
                <MenuItem value="municipal">Municipal</MenuItem>
                <MenuItem value="utility">Utility</MenuItem>
                <MenuItem value="transportation">Transportation</MenuItem>
                <MenuItem value="environmental">Environmental</MenuItem>
                <MenuItem value="public_safety">Public Safety</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="education">Education</MenuItem>
                <MenuItem value="ngo">NGO</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {formErrors.category && <FormHelperText>{formErrors.category}</FormHelperText>}
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              margin="normal"
              placeholder="https://example.com"
            />
            
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Location Information
            </Typography>
            
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              margin="normal"
              required
              error={!!formErrors.address}
              helperText={formErrors.address}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  error={!!formErrors.city}
                  helperText={formErrors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  error={!!formErrors.state}
                  helperText={formErrors.state}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  error={!!formErrors.postalCode}
                  helperText={formErrors.postalCode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Organization Logo
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload a logo for your organization. Recommended size: 200x200 pixels.
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {logoPreview ? (
                <Box sx={{ position: 'relative', mr: 2 }}>
                  <Avatar 
                    src={logoPreview} 
                    alt="Organization logo preview" 
                    sx={{ width: 100, height: 100 }}
                  />
                  <IconButton 
                    size="small" 
                    sx={{ 
                      position: 'absolute', 
                      top: -10, 
                      right: -10, 
                      bgcolor: 'background.paper',
                      boxShadow: 1
                    }}
                    onClick={() => handleRemoveFile('logo')}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mr: 2 }}
                >
                  Upload Logo
                  <input
                    type="file"
                    name="logo"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              )}
              {formErrors.logo && (
                <Typography color="error" variant="caption">
                  {formErrors.logo}
                </Typography>
              )}
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Cover Image
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload a cover image for your organization page. Recommended size: 1200x300 pixels.
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
              {coverPreview ? (
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <img 
                    src={coverPreview} 
                    alt="Cover image preview" 
                    style={{ 
                      width: '100%', 
                      height: 150, 
                      objectFit: 'cover',
                      borderRadius: 4
                    }} 
                  />
                  <IconButton 
                    size="small" 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      bgcolor: 'background.paper',
                      boxShadow: 1
                    }}
                    onClick={() => handleRemoveFile('coverImage')}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Upload Cover Image
                  <input
                    type="file"
                    name="coverImage"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              )}
              {formErrors.coverImage && (
                <Typography color="error" variant="caption">
                  {formErrors.coverImage}
                </Typography>
              )}
            </Box>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Organization
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to create organization. Please check your inputs and try again.
            <Button 
              variant="outlined" 
              size="small" 
              sx={{ ml: 2 }} 
              onClick={() => submitCreateOrganization()}
            >
              Retry
            </Button>
          </Alert>
        )}
        
        <form onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size={24} />
              ) : activeStep === steps.length - 1 ? (
                'Create Organization'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateOrganizationPage;