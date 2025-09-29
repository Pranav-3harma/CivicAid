import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getIssues } from '../services/issueService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApiRequest from '../hooks/useApiRequest';
import { useLanguage } from '../contexts/LanguageContext';

const IssuesPage = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priority: ''
  });

  const { 
    data: response, 
    loading, 
    error, 
    execute: fetchIssues 
  } = useApiRequest(getIssues);

  const issues = response?.issues || [];

  useEffect(() => {
    const filterParams = {};
    if (filters.category) filterParams.category = filters.category;
    if (filters.status) filterParams.status = filters.status;
    if (filters.priority) filterParams.priority = filters.priority;
    if (searchTerm) filterParams.search = searchTerm;
    
    fetchIssues(page, 9, filterParams);
  }, [fetchIssues, page, filters, searchTerm]);

  useEffect(() => {
    if (response) {
      setTotalPages(response.totalPages);
    }
  }, [response]);

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
    setPage(1); // Reset to first page when search changes
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchIssues();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'info';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('issues.title')}
      </Typography>
      
      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                fullWidth
                placeholder={t('issues.search.placeholder')}
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
                        {t('issues.search.button')}
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-filter-label">{t('issues.filters.category')}</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                name="category"
                value={filters.category}
                label={t('issues.filters.category')}
                onChange={handleFilterChange}
              >
                <MenuItem value="">{t('issues.filters.all')}</MenuItem>
                <MenuItem value="roads">{t('issues.categories.roads')}</MenuItem>
                <MenuItem value="water">{t('issues.categories.water')}</MenuItem>
                <MenuItem value="electricity">{t('issues.categories.electricity')}</MenuItem>
                <MenuItem value="sanitation">{t('issues.categories.sanitation')}</MenuItem>
                <MenuItem value="public_safety">{t('issues.categories.public_safety')}</MenuItem>
                <MenuItem value="environment">{t('issues.categories.environment')}</MenuItem>
                <MenuItem value="other">{t('issues.categories.other')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-filter-label">{t('issues.filters.status')}</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                name="status"
                value={filters.status}
                label={t('issues.filters.status')}
                onChange={handleFilterChange}
              >
                <MenuItem value="">{t('issues.filters.all')}</MenuItem>
                <MenuItem value="open">{t('issues.statuses.open')}</MenuItem>
                <MenuItem value="in_progress">{t('issues.statuses.in_progress')}</MenuItem>
                <MenuItem value="resolved">{t('issues.statuses.resolved')}</MenuItem>
                <MenuItem value="closed">{t('issues.statuses.closed')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="priority-filter-label">{t('issues.filters.priority')}</InputLabel>
              <Select
                labelId="priority-filter-label"
                id="priority-filter"
                name="priority"
                value={filters.priority}
                label={t('issues.filters.priority')}
                onChange={handleFilterChange}
              >
                <MenuItem value="">{t('issues.filters.all')}</MenuItem>
                <MenuItem value="high">{t('issues.priorities.high')}</MenuItem>
                <MenuItem value="medium">{t('issues.priorities.medium')}</MenuItem>
                <MenuItem value="low">{t('issues.priorities.low')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ ml: 2 }} 
            onClick={() => fetchIssues(page, 9, {
              category: filters.category,
              status: filters.status,
              priority: filters.priority,
              search: searchTerm
            })}
          >
            {t('issues.messages.retry')}
          </Button>
        </Alert>
      )}
      
      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <LoadingSpinner />
        </Box>
      )}
      
      {/* Issues Grid */}
      {!loading && !error && issues.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {t('issues.messages.noIssuesFound')}
          </Typography>
          <Button 
            component={RouterLink} 
            to="/report" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            {t('issues.actions.reportIssue')}
          </Button>
        </Box>
      ) : (!loading && !error && issues.length > 0) ? (
        <>
          <Grid container spacing={3}>
            {issues.map((issue) => (
              <Grid item xs={12} sm={6} md={4} key={issue._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea component={RouterLink} to={`/issues/${issue._id}`}>
                    {issue.images && issue.images.length > 0 ? (
                      <CardMedia
                        component="img"
                        height="140"
                        image={issue.images[0]}
                        alt={issue.title}
                      />
                    ) : (
                      <Box 
                        sx={{ 
                          height: 140, 
                          bgcolor: 'grey.300', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {t('issues.messages.noImageAvailable')}
                        </Typography>
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2" noWrap>
                        {issue.title}
                      </Typography>
                      <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {issue.location?.address || t('issues.messages.locationNotSpecified')}
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
                        <Box>
                          <Chip 
                            label={issue.status} 
                            size="small" 
                            color={getStatusColor(issue.status)} 
                            sx={{ mr: 0.5 }} 
                          />
                          <Chip 
                            label={issue.priority} 
                            size="small" 
                            color={getPriorityColor(issue.priority)} 
                          />
                        </Box>
                      </Box>
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
      ) : null}
    </Container>
  );
};

export default IssuesPage;