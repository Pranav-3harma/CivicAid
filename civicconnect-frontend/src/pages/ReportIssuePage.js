import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
  FormHelperText,
  Card,
  CardContent,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAuth } from '../contexts/AuthContext';
import { createIssue } from '../services/issueService';
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

const ImagePreview = styled('img')(({ theme }) => ({
  width: '100%',
  height: 150,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1)
}));

const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 300,
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: theme.spacing(2)
}));

const MapPlaceholder = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  '& .MuiSvgIcon-root': {
    fontSize: 48,
    marginBottom: theme.spacing(1)
  }
}));

// Google Maps Component (placeholder for now - will be implemented with actual Google Maps API)
const GoogleMapComponent = ({ onLocationSelect, selectedLocation }) => {
  const { t } = useLanguage();
  
  return (
    <MapContainer>
      <MapPlaceholder>
        <MapIcon />
        <Typography variant="h6" gutterBottom>
          {t('reportIssue.map.title', 'Google Maps Integration')}
        </Typography>
        <Typography variant="body2" paragraph>
          {t('reportIssue.map.description', 'Click on the map to select the exact location of the issue. This will help authorities locate and resolve the problem quickly.')}
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<MyLocationIcon />}
          onClick={() => {
            // Placeholder for getting current location
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  onLocationSelect({
                    lat: latitude,
                    lng: longitude,
                    address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                  });
                },
                (error) => {
                  console.error('Error getting location:', error);
                }
              );
            }
          }}
        >
          {t('reportIssue.map.getCurrentLocation', 'Get Current Location')}
        </Button>
        {selectedLocation && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="body2">
              <strong>{t('reportIssue.map.selectedLocation', 'Selected Location')}:</strong>
            </Typography>
            <Typography variant="caption" display="block">
              {selectedLocation.address}
            </Typography>
            <Typography variant="caption" display="block">
              {t('reportIssue.map.coordinates', 'Coordinates')}: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
            </Typography>
          </Box>
        )}
      </MapPlaceholder>
    </MapContainer>
  );
};

// Steps will be defined inside the component to use translations

const ReportIssuePage = () => {
  const navigate = useNavigate();
  const { currentUser: user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();
  const { t } = useLanguage();
  
  const steps = [
    t('reportIssue.steps.issueDetails'),
    t('reportIssue.steps.locationInformation'),
    t('reportIssue.steps.mediaUpload'),
    t('reportIssue.steps.reviewSubmit')
  ];
  
  const [activeStep, setActiveStep] = useState(0);
  const [locationError, setLocationError] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showGuestConfirmDialog, setShowGuestConfirmDialog] = useState(false);
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    urgency: 'normal',
    location: {
      address: '',
      coordinates: {
        latitude: '',
        longitude: ''
      }
    },
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      isAnonymous: false
    },
    images: [],
    additionalInfo: {
      estimatedCost: '',
      affectedPeople: '',
      safetyConcern: false,
      environmentalImpact: false
    }
  });
  
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const parts = name.split('.');
      if (parts.length === 2) {
        const [parent, child] = parts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: type === 'checkbox' ? checked : value
          }
        }));
      } else if (parts.length === 3) {
        const [parent, child, grandchild] = parts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: type === 'checkbox' ? checked : value
            }
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear validation error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCoordinateChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: {
          ...prev.location.coordinates,
          [name]: value
        }
      }
    }));
    
    // Clear validation error when field is edited
    if (formErrors[`location.coordinates.${name}`]) {
      setFormErrors(prev => ({
        ...prev,
        [`location.coordinates.${name}`]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Limit to 3 images total
    const remainingSlots = 3 - imageFiles.length;
    if (remainingSlots <= 0) {
      showError('Maximum 3 images allowed');
      return;
    }
    
    const newFiles = files.slice(0, remainingSlots);
    setImageFiles(prev => [...prev, ...newFiles]);
    
    // Generate previews
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleMapLocationSelect = (location) => {
    setSelectedMapLocation(location);
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        address: location.address,
        coordinates: {
          latitude: location.lat.toString(),
          longitude: location.lng.toString()
        }
      }
    }));
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: {
                latitude: latitude.toString(),
                longitude: longitude.toString()
              }
            }
          }));
          
          // Try to get address from coordinates using reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              if (data.display_name) {
                setFormData(prev => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    address: data.display_name
                  }
                }));
                setSelectedMapLocation({
                  lat: latitude,
                  lng: longitude,
                  address: data.display_name
                });
              }
            })
            .catch(err => console.error('Error getting address:', err));
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Failed to get your current location. Please enter it manually.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Please enter location manually.');
    }
  };

  const validateStep = () => {
    const errors = {};
    
    switch (activeStep) {
      case 0: // Issue Details
        if (!formData.title.trim()) errors.title = t('reportIssue.validation.titleRequired');
        if (!formData.description.trim()) errors.description = t('reportIssue.validation.descriptionRequired');
        if (!formData.category) errors.category = t('reportIssue.validation.categoryRequired');
        break;
      case 1: // Location Information
        if (!formData.location.address.trim()) errors['location.address'] = t('reportIssue.validation.addressRequired');
        break;
      case 2: // Media Upload
        // No required fields
        break;
      case 3: // Review & Submit
        // Validate all fields again
        if (!formData.title.trim()) errors.title = t('reportIssue.validation.titleRequired');
        if (!formData.description.trim()) errors.description = t('reportIssue.validation.descriptionRequired');
        if (!formData.category) errors.category = t('reportIssue.validation.categoryRequired');
        if (!formData.location.address.trim()) errors['location.address'] = t('reportIssue.validation.addressRequired');
        
        // Contact info validation (only if not anonymous)
        if (!formData.contactInfo.isAnonymous) {
          if (!formData.contactInfo.name.trim()) errors['contactInfo.name'] = t('reportIssue.validation.nameRequired');
          if (!formData.contactInfo.email.trim()) errors['contactInfo.email'] = t('reportIssue.validation.emailRequired');
          if (formData.contactInfo.email && !/\S+@\S+\.\S+/.test(formData.contactInfo.email)) {
            errors['contactInfo.email'] = t('reportIssue.validation.emailInvalid');
          }
        }
        break;
      default:
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prev => prev + 1);
      setLocationError(null);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setLocationError(null);
  };

  // API request for creating issue
  const createIssueRequest = useApiRequest(
    async () => {
      if (!validateStep()) return;
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('urgency', formData.urgency);
      formDataToSend.append('location[address]', formData.location.address);
      
      if (formData.location.coordinates.latitude && formData.location.coordinates.longitude) {
        formDataToSend.append('location[coordinates][latitude]', formData.location.coordinates.latitude);
        formDataToSend.append('location[coordinates][longitude]', formData.location.coordinates.longitude);
      }
      
      // Add contact information
      if (!formData.contactInfo.isAnonymous) {
        formDataToSend.append('contactInfo[name]', formData.contactInfo.name);
        formDataToSend.append('contactInfo[email]', formData.contactInfo.email);
        if (formData.contactInfo.phone) {
          formDataToSend.append('contactInfo[phone]', formData.contactInfo.phone);
        }
      }
      formDataToSend.append('contactInfo[isAnonymous]', formData.contactInfo.isAnonymous);
      
      // Add additional information
      if (formData.additionalInfo.estimatedCost) {
        formDataToSend.append('additionalInfo[estimatedCost]', formData.additionalInfo.estimatedCost);
      }
      if (formData.additionalInfo.affectedPeople) {
        formDataToSend.append('additionalInfo[affectedPeople]', formData.additionalInfo.affectedPeople);
      }
      formDataToSend.append('additionalInfo[safetyConcern]', formData.additionalInfo.safetyConcern);
      formDataToSend.append('additionalInfo[environmentalImpact]', formData.additionalInfo.environmentalImpact);
      
      imageFiles.forEach(file => {
        formDataToSend.append('images', file);
      });
      
      return await createIssue(formDataToSend);
    },
    {
      onSuccess: (newIssue) => {
        showSuccess(t('reportIssue.success', 'Issue reported successfully!'));
        navigate(`/issues/${newIssue._id}`, { state: { success: true } });
      },
      onError: (err) => {
        showError(t('reportIssue.error', 'Failed to report issue: ') + (err.response?.data?.message || 'Unknown error'));
        setActiveStep(0); // Go back to first step on error
      },
      showErrorNotification: false
    }
  );

  const { loading, error, execute: submitIssue } = createIssueRequest;

  const handleSubmit = () => {
    if (validateStep()) {
      if (!isAuthenticated) {
        setShowGuestConfirmDialog(true);
      } else {
        submitIssue();
      }
    }
  };

  const handleGuestConfirmSubmit = () => {
    setShowGuestConfirmDialog(false);
    submitIssue();
  };

  // Render step content based on current step

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Issue Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('reportIssue.issueTitle')}
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
                placeholder={t('reportIssue.issueTitlePlaceholder', 'Brief description of the issue')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('reportIssue.description')}
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                error={!!formErrors.description}
                helperText={formErrors.description}
                placeholder={t('reportIssue.descriptionPlaceholder', 'Provide detailed description of the issue')}
                required
              />
            </Grid>
            {/* Category, Priority, and Urgency - Better aligned layout */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth error={!!formErrors.category} required>
                  <InputLabel id="category-label" shrink={!!formData.category}>
                    {t('reportIssue.category')}
                  </InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={formData.category || ''}
                    label={t('reportIssue.category')}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                      '& .MuiSelect-select': {
                        color: formData.category ? 'inherit' : 'rgba(0, 0, 0, 0.6)'
                      }
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{t('reportIssue.selectCategory', 'Select a category')}</em>
                    </MenuItem>
                    <MenuItem value="roads">{t('reportIssue.categories.roads', 'Roads')}</MenuItem>
                    <MenuItem value="water">{t('reportIssue.categories.water', 'Water')}</MenuItem>
                    <MenuItem value="electricity">{t('reportIssue.categories.electricity', 'Electricity')}</MenuItem>
                    <MenuItem value="sanitation">{t('reportIssue.categories.sanitation', 'Sanitation')}</MenuItem>
                    <MenuItem value="public_safety">{t('reportIssue.categories.public_safety', 'Public Safety')}</MenuItem>
                    <MenuItem value="environment">{t('reportIssue.categories.environment', 'Environment')}</MenuItem>
                    <MenuItem value="other">{t('reportIssue.categories.other', 'Other')}</MenuItem>
                  </Select>
                  {formErrors.category && <FormHelperText>{formErrors.category}</FormHelperText>}
                </FormControl>
              </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={!!formErrors.priority}>
                <InputLabel id="priority-label" shrink={!!formData.priority}>
                  {t('reportIssue.priority')}
                </InputLabel>
                <Select
                  labelId="priority-label"
                  name="priority"
                  value={formData.priority || ''}
                  label={t('reportIssue.priority')}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    '& .MuiSelect-select': {
                      color: formData.priority ? 'inherit' : 'rgba(0, 0, 0, 0.6)'
                    }
                  }}
                >
                  <MenuItem value="" disabled>
                    <em style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{t('reportIssue.selectPriority', 'Select priority level')}</em>
                  </MenuItem>
                  <MenuItem value="low">{t('reportIssue.priorities.low', 'Low')}</MenuItem>
                  <MenuItem value="medium">{t('reportIssue.priorities.medium', 'Medium')}</MenuItem>
                  <MenuItem value="high">{t('reportIssue.priorities.high', 'High')}</MenuItem>
                </Select>
                {formErrors.priority && <FormHelperText>{formErrors.priority}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={!!formErrors.urgency}>
                <InputLabel id="urgency-label" shrink={!!formData.urgency}>
                  {t('reportIssue.urgency', 'Urgency Level')}
                </InputLabel>
                <Select
                  labelId="urgency-label"
                  name="urgency"
                  value={formData.urgency || ''}
                  label={t('reportIssue.urgency', 'Urgency Level')}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    '& .MuiSelect-select': {
                      color: formData.urgency ? 'inherit' : 'rgba(0, 0, 0, 0.6)'
                    }
                  }}
                >
                  <MenuItem value="" disabled>
                    <em style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{t('reportIssue.selectUrgency', 'Select urgency level')}</em>
                  </MenuItem>
                  <MenuItem value="normal">{t('reportIssue.urgencyLevels.normal', 'Normal')}</MenuItem>
                  <MenuItem value="urgent">{t('reportIssue.urgencyLevels.urgent', 'Urgent')}</MenuItem>
                  <MenuItem value="emergency">{t('reportIssue.urgencyLevels.emergency', 'Emergency')}</MenuItem>
                </Select>
                {formErrors.urgency && <FormHelperText>{formErrors.urgency}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('reportIssue.additionalInfo.title', 'Additional Information')}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('reportIssue.additionalInfo.estimatedCost', 'Estimated Cost (if known)')}
                        name="additionalInfo.estimatedCost"
                        value={formData.additionalInfo.estimatedCost}
                        onChange={handleChange}
                        placeholder={t('reportIssue.additionalInfo.costPlaceholder', 'e.g., ₹5000')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('reportIssue.additionalInfo.affectedPeople', 'Number of People Affected')}
                        name="additionalInfo.affectedPeople"
                        value={formData.additionalInfo.affectedPeople}
                        onChange={handleChange}
                        placeholder={t('reportIssue.additionalInfo.peoplePlaceholder', 'e.g., 50-100 people')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.additionalInfo.safetyConcern}
                              onChange={handleChange}
                              name="additionalInfo.safetyConcern"
                            />
                          }
                          label={t('reportIssue.additionalInfo.safetyConcern', 'Safety Concern')}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.additionalInfo.environmentalImpact}
                              onChange={handleChange}
                              name="additionalInfo.environmentalImpact"
                            />
                          }
                          label={t('reportIssue.additionalInfo.environmentalImpact', 'Environmental Impact')}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      case 1: // Location Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('reportIssue.location.title', 'Location Details')}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {t('reportIssue.location.description', 'Please provide the exact location where the issue is occurring. This helps authorities locate and resolve the problem quickly.')}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <GoogleMapComponent 
                onLocationSelect={handleMapLocationSelect}
                selectedLocation={selectedMapLocation}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <TextField
                  fullWidth
                  label={t('reportIssue.location.address')}
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  error={!!formErrors['location.address']}
                  helperText={formErrors['location.address']}
                  placeholder={t('reportIssue.locationPlaceholder', 'Enter location or address')}
                  required
                />
                <Button
                  variant="outlined"
                  startIcon={<MyLocationIcon />}
                  onClick={handleGetCurrentLocation}
                  sx={{ minWidth: 'auto', px: 2 }}
                >
                  {t('reportIssue.getLocation', 'Get Current Location')}
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('reportIssue.location.latitude')}
                name="latitude"
                value={formData.location.coordinates.latitude}
                onChange={handleCoordinateChange}
                type="number"
                inputProps={{ step: 'any' }}
                placeholder="e.g., 28.6139"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={t('reportIssue.location.longitude')}
                name="longitude"
                value={formData.location.coordinates.longitude}
                onChange={handleCoordinateChange}
                type="number"
                inputProps={{ step: 'any' }}
                placeholder="e.g., 77.2090"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  {t('reportIssue.location.instructions', 'You can use the "Get Current Location" button to automatically fill in your coordinates, or manually enter the address and coordinates.')}
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        );
      case 2: // Media Upload
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('reportIssue.media.title', 'Media Upload')}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {t('reportIssue.media.description', 'Upload photos or documents related to the issue. Clear images help authorities understand and resolve the problem faster.')}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<PhotoCameraIcon />}
                      disabled={imageFiles.length >= 5}
                      size="large"
                    >
                      {t('reportIssue.uploadImages', 'Upload Images')}
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </Button>
                    <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                      {t('reportIssue.imageNote', 'Maximum 5 images allowed (optional). Supported formats: JPG, PNG, GIF')}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {imagePreviews.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {t('reportIssue.uploadedImages', 'Uploaded Images')}
                </Typography>
                <Grid container spacing={2}>
                  {imagePreviews.map((preview, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card variant="outlined">
                        <Box sx={{ position: 'relative' }}>
                          <ImagePreview src={preview} alt={`Preview ${index + 1}`} />
                          <IconButton
                            size="small"
                            sx={{ 
                              position: 'absolute', 
                              top: 8, 
                              right: 8, 
                              bgcolor: 'rgba(255,255,255,0.9)',
                              '&:hover': {
                                bgcolor: 'rgba(255,255,255,1)'
                              }
                            }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ border: '2px solid', borderColor: 'primary.main' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {t('reportIssue.contactInfo.title', 'Contact Information')}
                    {!isAuthenticated && (
                      <Chip 
                        label={t('reportIssue.guestRequired', 'Required for Guest Users')} 
                        color="primary" 
                        size="small" 
                        sx={{ ml: 2 }}
                      />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {!isAuthenticated 
                      ? t('reportIssue.contactInfo.guestDescription', 'Since you\'re not logged in, please provide your contact details so authorities can reach you for updates. You can choose to remain anonymous.')
                      : t('reportIssue.contactInfo.description', 'Provide your contact details so authorities can reach you for updates or clarification. You can choose to remain anonymous.')
                    }
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.contactInfo.isAnonymous}
                        onChange={handleChange}
                        name="contactInfo.isAnonymous"
                      />
                    }
                    label={t('reportIssue.contactInfo.isAnonymous', 'Report anonymously')}
                  />
                  
                  {!formData.contactInfo.isAnonymous && (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('reportIssue.contactInfo.name', 'Full Name')}
                          name="contactInfo.name"
                          value={formData.contactInfo.name}
                          onChange={handleChange}
                          error={!!formErrors['contactInfo.name']}
                          helperText={formErrors['contactInfo.name']}
                          placeholder={t('reportIssue.contactInfo.namePlaceholder', 'Enter your full name')}
                          InputProps={{
                            startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('reportIssue.contactInfo.email', 'Email Address')}
                          name="contactInfo.email"
                          type="email"
                          value={formData.contactInfo.email}
                          onChange={handleChange}
                          error={!!formErrors['contactInfo.email']}
                          helperText={formErrors['contactInfo.email']}
                          placeholder={t('reportIssue.contactInfo.emailPlaceholder', 'Enter your email')}
                          InputProps={{
                            startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label={t('reportIssue.contactInfo.phone', 'Phone Number (Optional)')}
                          name="contactInfo.phone"
                          value={formData.contactInfo.phone}
                          onChange={handleChange}
                          placeholder={t('reportIssue.contactInfo.phonePlaceholder', 'Enter your phone number')}
                          InputProps={{
                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      case 3: // Review & Submit
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {t('reportIssue.review.title', 'Review Your Report')}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {t('reportIssue.reviewMessage', 'Please review your issue details before submitting. Once submitted, you can track the status of your issue.')}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('reportIssue.issueDetails', 'Issue Details')}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        {t('reportIssue.issueTitle', 'Title')}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {formData.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        {t('reportIssue.category', 'Category')}
                      </Typography>
                      <Chip 
                        label={t(`reportIssue.categories.${formData.category}`, formData.category)} 
                        color="primary" 
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        {t('reportIssue.priority', 'Priority')}
                      </Typography>
                      <Chip 
                        label={t(`reportIssue.priorities.${formData.priority}`, formData.priority)} 
                        color={formData.priority === 'high' ? 'error' : formData.priority === 'medium' ? 'warning' : 'default'}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        {t('reportIssue.urgency', 'Urgency')}
                      </Typography>
                      <Chip 
                        label={t(`reportIssue.urgencyLevels.${formData.urgency}`, formData.urgency)} 
                        color={formData.urgency === 'emergency' ? 'error' : formData.urgency === 'urgent' ? 'warning' : 'default'}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        {t('reportIssue.description', 'Description')}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {formData.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('reportIssue.location.title', 'Location')}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {formData.location.address}
                  </Typography>
                  {formData.location.coordinates.latitude && formData.location.coordinates.longitude && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {t('reportIssue.map.coordinates', 'Coordinates')}: {formData.location.coordinates.latitude}, {formData.location.coordinates.longitude}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            {!formData.contactInfo.isAnonymous && (
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('reportIssue.contactInfo.title', 'Contact Information')}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          {t('reportIssue.contactInfo.name', 'Name')}
                        </Typography>
                        <Typography variant="body1">
                          {formData.contactInfo.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          {t('reportIssue.contactInfo.email', 'Email')}
                        </Typography>
                        <Typography variant="body1">
                          {formData.contactInfo.email}
                        </Typography>
                      </Grid>
                      {formData.contactInfo.phone && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            {t('reportIssue.contactInfo.phone', 'Phone')}
                          </Typography>
                          <Typography variant="body1">
                            {formData.contactInfo.phone}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
            
            {formData.contactInfo.isAnonymous && (
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('reportIssue.contactInfo.title', 'Contact Information')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {t('reportIssue.contactInfo.anonymousReport', 'This report will be submitted anonymously')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            
            {(formData.additionalInfo.estimatedCost || formData.additionalInfo.affectedPeople || formData.additionalInfo.safetyConcern || formData.additionalInfo.environmentalImpact) && (
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('reportIssue.additionalInfo.title', 'Additional Information')}
                    </Typography>
                    <Grid container spacing={2}>
                      {formData.additionalInfo.estimatedCost && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            {t('reportIssue.additionalInfo.estimatedCost', 'Estimated Cost')}
                          </Typography>
                          <Typography variant="body1">
                            {formData.additionalInfo.estimatedCost}
                          </Typography>
                        </Grid>
                      )}
                      {formData.additionalInfo.affectedPeople && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            {t('reportIssue.additionalInfo.affectedPeople', 'People Affected')}
                          </Typography>
                          <Typography variant="body1">
                            {formData.additionalInfo.affectedPeople}
                          </Typography>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {formData.additionalInfo.safetyConcern && (
                            <Chip label={t('reportIssue.additionalInfo.safetyConcern', 'Safety Concern')} color="error" size="small" />
                          )}
                          {formData.additionalInfo.environmentalImpact && (
                            <Chip label={t('reportIssue.additionalInfo.environmentalImpact', 'Environmental Impact')} color="warning" size="small" />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
            
            {imagePreviews.length > 0 && (
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('reportIssue.uploadedImages', 'Uploaded Images')}
                    </Typography>
                    <Grid container spacing={2}>
                      {imagePreviews.map((preview, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <ImagePreview src={preview} alt={`Preview ${index + 1}`} />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="body2">
                  {t('reportIssue.submitNote', 'By submitting this report, you agree that the information provided is accurate and you understand that authorities may contact you for further details if needed.')}
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  // Show guest user message if not authenticated
  const GuestUserMessage = () => (
    <Alert severity="success" sx={{ mb: 3 }}>
      <Typography variant="body2">
        {t('reportIssue.guestMessage', 'You can report issues without creating an account! Fill out the form below and submit your issue directly.')}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
        {t('reportIssue.guestNote', 'Note: Creating an account allows you to track your reports and receive updates.')}
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          size="small"
          onClick={() => navigate('/login', { state: { from: '/report' } })}
        >
          {t('reportIssue.loginToTrack', 'Login to Track Reports')}
        </Button>
        <Button 
          variant="outlined" 
          size="small"
          onClick={() => navigate('/register', { state: { from: '/report' } })}
        >
          {t('reportIssue.register', 'Create Account')}
        </Button>
      </Box>
    </Alert>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('reportIssue.title', 'Report a Civic Issue')}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {t('reportIssue.subtitle', 'Help improve your community by reporting civic issues. Your report will be forwarded to the appropriate authorities for resolution.')}
      </Typography>
      
      {!isAuthenticated && <GuestUserMessage />}
      
      <StyledPaper>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {(error || locationError) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || locationError}
            {error && (
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ ml: 2 }} 
                onClick={() => submitIssue()}
              >
                {t('common.retry', 'Retry')}
              </Button>
            )}
          </Alert>
        )}
        
        {renderStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
          >
            {t('common.back', 'Back')}
          </Button>
          <Box>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size={24} />
              ) : activeStep === steps.length - 1 ? (
                t('reportIssue.submitButton')
              ) : (
                t('common.next')
              )}
            </Button>
          </Box>
        </Box>
      </StyledPaper>
      
      {/* Guest Confirmation Dialog */}
      <Dialog open={showGuestConfirmDialog} onClose={() => setShowGuestConfirmDialog(false)}>
        <DialogTitle>{t('reportIssue.guestConfirm.title', 'Submit Issue as Guest')}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            {t('reportIssue.guestConfirm.message', 'You are about to submit this issue without creating an account. Your report will be processed, but you won\'t be able to track its status or receive updates.')}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {t('reportIssue.guestConfirm.note', 'Would you like to create an account to track your reports, or continue as a guest?')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowGuestConfirmDialog(false)}>
            {t('common.cancel')}
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => {
              setShowGuestConfirmDialog(false);
              navigate('/register', { state: { from: '/report' } });
            }}
          >
            {t('reportIssue.guestConfirm.createAccount', 'Create Account')}
          </Button>
          <Button 
            variant="contained" 
            onClick={handleGuestConfirmSubmit}
          >
            {t('reportIssue.guestConfirm.submitAsGuest', 'Submit as Guest')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReportIssuePage;