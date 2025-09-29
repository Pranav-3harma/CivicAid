import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  Button,
  Divider,
  Avatar,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  ImageList,
  ImageListItem,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../contexts/AuthContext';
import { getIssueById, upvoteIssue, downvoteIssue } from '../services/issueService';
import { getCommentsByIssue, createComment } from '../services/commentService';
import { getResolutionsByIssue } from '../services/resolutionService';
import { useNotification } from '../contexts/NotificationContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useApiRequest from '../hooks/useApiRequest';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[2]
}));

const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser: user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [voteLoading, setVoteLoading] = useState(false);

  // API requests using custom hook
  const { 
    data: issue, 
    loading: issueLoading, 
    error: issueError, 
    execute: fetchIssue 
  } = useApiRequest(getIssueById);

  const { 
    data: comments, 
    loading: commentsLoading, 
    error: commentsError, 
    execute: fetchComments 
  } = useApiRequest(getCommentsByIssue);

  const { 
    data: resolutions, 
    loading: resolutionsLoading, 
    error: resolutionsError, 
    execute: fetchResolutions 
  } = useApiRequest(getResolutionsByIssue);

  // Initial data loading
  useEffect(() => {
    fetchIssue(id);
    fetchComments(id);
    fetchResolutions(id);
  }, [id, fetchIssue, fetchComments, fetchResolutions]);
  
  const loading = issueLoading || commentsLoading || resolutionsLoading;
  const error = issueError || commentsError || resolutionsError;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setCommentLoading(true);
    try {
      const newComment = await createComment({
        issueId: id,
        text: commentText
      });
      
      // Refresh comments after adding
      fetchComments(id);
      setCommentText('');
      showSuccess('Comment added successfully');
    } catch (err) {
      console.error('Error posting comment:', err);
      showError('Failed to post comment. Please try again.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleVote = async (voteType) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/issues/${id}` } });
      return;
    }
    
    setVoteLoading(true);
    try {
      if (voteType === 'upvote') {
        await upvoteIssue(id);
      } else {
        await downvoteIssue(id);
      }
      // Refresh issue after voting
      fetchIssue(id);
      showSuccess(`Vote ${voteType === 'upvote' ? 'up' : 'down'} recorded`);
    } catch (err) {
      console.error(`Error ${voteType}ing issue:`, err);
      showError(`Failed to ${voteType} issue. Please try again.`);
    } finally {
      setVoteLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <LoadingSpinner message="Loading issue details..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/issues')} 
          sx={{ mt: 2 }}
        >
          Back to Issues
        </Button>
      </Container>
    );
  }

  if (!issue) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Issue not found or has been removed.</Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/issues')} 
          sx={{ mt: 2 }}
        >
          Back to Issues
        </Button>
      </Container>
    );
  }

  const hasUserVoted = () => {
    if (!isAuthenticated || !user) return false;
    return issue.upvotes.includes(user._id) || issue.downvotes.includes(user._id);
  };

  const hasUserUpvoted = () => {
    if (!isAuthenticated || !user) return false;
    return issue.upvotes.includes(user._id);
  };

  const hasUserDownvoted = () => {
    if (!isAuthenticated || !user) return false;
    return issue.downvotes.includes(user._id);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/issues')} 
        sx={{ mb: 2 }}
      >
        Back to Issues
      </Button>
      
      {/* Issue Header */}
      <StyledPaper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {issue.title}
              </Typography>
              <Box>
                <Chip 
                  label={issue.status} 
                  color={getStatusColor(issue.status)} 
                  sx={{ mr: 1 }} 
                />
                <Chip 
                  label={`Priority: ${issue.priority}`} 
                  color={getPriorityColor(issue.priority)} 
                />
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {issue.location?.address || 'Location not specified'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                Reported on {formatDate(issue.createdAt)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                Reported by {issue.reporter?.name || 'Anonymous'}
              </Typography>
            </Box>
            <Chip 
              label={issue.category} 
              color="primary" 
              variant="outlined" 
              size="small"
              sx={{ mb: 2 }} 
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: { xs: 'flex-start', sm: 'flex-end' } 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <IconButton 
                  color={hasUserUpvoted() ? "primary" : "default"}
                  onClick={() => handleVote('upvote')}
                  disabled={voteLoading || hasUserUpvoted()}
                >
                  <ThumbUpIcon />
                </IconButton>
                <Typography variant="body1">{issue.upvotes?.length || 0}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <IconButton 
                  color={hasUserDownvoted() ? "error" : "default"}
                  onClick={() => handleVote('downvote')}
                  disabled={voteLoading || hasUserDownvoted()}
                >
                  <ThumbDownIcon />
                </IconButton>
                <Typography variant="body1">{issue.downvotes?.length || 0}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
      
      {/* Issue Details */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography variant="body1" paragraph>
              {issue.description}
            </Typography>
            
            {issue.images && issue.images.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Images</Typography>
                <ImageList cols={issue.images.length > 1 ? 2 : 1} gap={8}>
                  {issue.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image}
                        alt={`Issue image ${index + 1}`}
                        loading="lazy"
                        style={{ borderRadius: 4 }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            )}
          </StyledPaper>
          
          {/* Tabs for Comments and Resolutions */}
          <StyledPaper>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              indicatorColor="primary"
              textColor="primary"
              sx={{ mb: 2 }}
            >
              <Tab label={`Comments (${comments.length})`} />
              <Tab label={`Resolutions (${resolutions.length})`} />
            </Tabs>
            
            {/* Comments Tab */}
            {tabValue === 0 && (
              <Box>
                {isAuthenticated ? (
                  <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      disabled={commentLoading}
                      sx={{ mb: 1 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<SendIcon />}
                      disabled={!commentText.trim() || commentLoading}
                    >
                      {commentLoading ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </Box>
                ) : (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Please <Button size="small" onClick={() => navigate('/login', { state: { from: `/issues/${id}` } })}>login</Button> to add comments
                  </Alert>
                )}
                
                {comments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No comments yet. Be the first to comment!
                  </Typography>
                ) : (
                  comments.map((comment) => (
                    <Card key={comment._id} sx={{ mb: 2, boxShadow: 1 }}>
                      <CardHeader
                        avatar={
                          <Avatar>{comment.user?.name?.charAt(0) || 'U'}</Avatar>
                        }
                        title={comment.user?.name || 'Anonymous'}
                        subheader={formatDate(comment.createdAt)}
                      />
                      <CardContent>
                        <Typography variant="body2">{comment.text}</Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>
            )}
            
            {/* Resolutions Tab */}
            {tabValue === 1 && (
              <Box>
                {resolutions.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    No resolutions have been provided yet.
                  </Typography>
                ) : (
                  resolutions.map((resolution) => (
                    <Card key={resolution._id} sx={{ mb: 2, boxShadow: 1 }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {resolution.organization?.name?.charAt(0) || 'O'}
                          </Avatar>
                        }
                        title={resolution.organization?.name || 'Organization'}
                        subheader={`Resolution provided on ${formatDate(resolution.createdAt)}`}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {resolution.title}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {resolution.description}
                        </Typography>
                        {resolution.images && resolution.images.length > 0 && (
                          <ImageList cols={resolution.images.length > 1 ? 2 : 1} gap={8} sx={{ mt: 2 }}>
                            {resolution.images.map((image, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={image}
                                  alt={`Resolution image ${index + 1}`}
                                  loading="lazy"
                                  style={{ borderRadius: 4 }}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </Box>
            )}
          </StyledPaper>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Status Updates</Typography>
            {issue.statusUpdates && issue.statusUpdates.length > 0 ? (
              issue.statusUpdates.map((update, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2">
                      {update.status}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(update.date)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {update.description}
                  </Typography>
                  {index < issue.statusUpdates.length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No status updates available.
              </Typography>
            )}
          </StyledPaper>
          
          {issue.assignedTo && (
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Assigned Organization</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {issue.assignedTo.name?.charAt(0) || 'O'}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {issue.assignedTo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {issue.assignedTo.category}
                  </Typography>
                </Box>
              </Box>
            </StyledPaper>
          )}
          
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Location</Typography>
            {issue.location ? (
              <>
                <Typography variant="body2" paragraph>
                  {issue.location.address}
                </Typography>
                <Box 
                  sx={{ 
                    height: 200, 
                    bgcolor: 'grey.200', 
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Map placeholder
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Location information not available.
              </Typography>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IssueDetailPage;