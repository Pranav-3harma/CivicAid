import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from '@mui/icons-material/Verified';
import { getOrganizations } from '../services/organizationService';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApiRequest from '../hooks/useApiRequest';

const OrganizationsPage = () => {
  const { showSnackbar: showNotification } = useNotification();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    verified: ''
  });

  const fetchOrganizationsRequest = useApiRequest(
    async () => {
      const filterParams = {};
      if (filters.category) filterParams.category = filters.category;
      if (filters.verified) filterParams.verified = filters.verified === 'true';
      if (searchTerm) filterParams.search = searchTerm;
      
      return await getOrganizations(page, 9, filterParams);
    },
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
      },
      onError: (error) => {
        showNotification('Failed to load organizations. Please try again.', 'error');
      },
      showErrorNotification: false
    }
  );

  const { data, loading, error, execute: fetchOrganizations } = fetchOrganizationsRequest;
  const organizations = data?.organizations || [];

  useEffect(() => {
    fetchOrganizations();
  }, [page, filters]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1); // Reset to first page when search changes
    fetchOrganizations();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Organizations
      </Typography>
      
      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                fullWidth
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button type="submit" variant="contained" size="small">
                        Search
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                name="category"
                value={filters.category}
                label="Category"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
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
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="verified-filter-label">Verification</InputLabel>
              <Select
                labelId="verified-filter-label"
                id="verified-filter"
                name="verified"
                value={filters.verified}
                label="Verification"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">Verified Only</MenuItem>
                <MenuItem value="false">Unverified Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      {/* Organizations Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <LoadingSpinner message="Loading organizations..." />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>
          Failed to load organizations. Please try again later.
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ ml: 2 }} 
            onClick={fetchOrganizations}
          >
            Retry
          </Button>
        </Alert>
      ) : organizations.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No organizations found
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {organizations.map((org) => (
              <Grid item xs={12} sm={6} md={4} key={org._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea component={RouterLink} to={`/organizations/${org._id}`}>
                    {org.logo ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={org.logo}
                        alt={org.name}
                      />
                    ) : (
                      <Box 
                        sx={{ 
                          height: 140, 
                          bgcolor: 'primary.light', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        <Typography variant="h4" color="primary.contrastText">
                          {org.name.charAt(0)}
                        </Typography>
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography gutterBottom variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                          {org.name}
                        </Typography>
                        {org.verified && (
                          <VerifiedIcon color="primary" fontSize="small" />
                        )}
                      </Box>
                      <Chip 
                        label={org.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ mb: 1 }}
                      />
                      <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {org.location?.address || 'Location not specified'}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        mb: 1
                      }}>
                        {org.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {org.issuesResolved || 0} issues resolved
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default OrganizationsPage;