import axios from 'axios';

const API_URL = '/api/issues';

// Get all issues with pagination and filters
export const getIssues = async (page = 1, limit = 10, filters = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters
    });
    
    const response = await axios.get(`${API_URL}?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get nearby issues based on coordinates
export const getNearbyIssues = async (latitude, longitude, radius = 5) => {
  try {
    const response = await axios.get(`${API_URL}/nearby`, {
      params: { latitude, longitude, radius }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get issues by organization ID
export const getIssuesByOrganization = async (organizationId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/organization/${organizationId}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get a single issue by ID
export const getIssueById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new issue
export const createIssue = async (issueData) => {
  try {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    // Append text fields
    Object.keys(issueData).forEach(key => {
      if (key !== 'images') {
        if (key === 'location' && typeof issueData.location === 'object') {
          formData.append('location[coordinates][0]', issueData.location.coordinates[0]);
          formData.append('location[coordinates][1]', issueData.location.coordinates[1]);
          if (issueData.location.address) formData.append('location[address]', issueData.location.address);
          if (issueData.location.city) formData.append('location[city]', issueData.location.city);
          if (issueData.location.state) formData.append('location[state]', issueData.location.state);
          if (issueData.location.zipCode) formData.append('location[zipCode]', issueData.location.zipCode);
        } else {
          formData.append(key, issueData[key]);
        }
      }
    });
    
    // Append images if any
    if (issueData.images && issueData.images.length > 0) {
      issueData.images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an issue
export const updateIssue = async (id, issueData) => {
  try {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    // Append text fields
    Object.keys(issueData).forEach(key => {
      if (key !== 'images') {
        if (key === 'location' && typeof issueData.location === 'object') {
          formData.append('location[coordinates][0]', issueData.location.coordinates[0]);
          formData.append('location[coordinates][1]', issueData.location.coordinates[1]);
          if (issueData.location.address) formData.append('location[address]', issueData.location.address);
          if (issueData.location.city) formData.append('location[city]', issueData.location.city);
          if (issueData.location.state) formData.append('location[state]', issueData.location.state);
          if (issueData.location.zipCode) formData.append('location[zipCode]', issueData.location.zipCode);
        } else {
          formData.append(key, issueData[key]);
        }
      }
    });
    
    // Append images if any
    if (issueData.images && issueData.images.length > 0) {
      issueData.images.forEach(image => {
        formData.append('images', image);
      });
    }
    
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete an issue
export const deleteIssue = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Upvote an issue
export const upvoteIssue = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/upvote`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Downvote an issue
export const downvoteIssue = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/downvote`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user's reported issues
export const getMyIssues = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/my-issues`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get issues assigned to user's organization
export const getAssignedIssues = async (page = 1, limit = 10, filters = {}) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters
    });
    
    const response = await axios.get(`${API_URL}/assigned`, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};