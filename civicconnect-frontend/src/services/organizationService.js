import axios from 'axios';

const API_URL = '/api/organizations';

// Get all organizations with pagination and filters
export const getOrganizations = async (page = 1, limit = 10, filters = {}) => {
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

// Get organization by ID
export const getOrganizationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new organization
export const createOrganization = async (organizationData) => {
  try {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    // Append text fields
    Object.keys(organizationData).forEach(key => {
      if (key !== 'logo') {
        if (typeof organizationData[key] === 'object' && organizationData[key] !== null) {
          formData.append(key, JSON.stringify(organizationData[key]));
        } else {
          formData.append(key, organizationData[key]);
        }
      }
    });
    
    // Append logo if any
    if (organizationData.logo) {
      formData.append('logo', organizationData.logo);
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

// Update an organization
export const updateOrganization = async (id, organizationData) => {
  try {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    // Append text fields
    Object.keys(organizationData).forEach(key => {
      if (key !== 'logo') {
        if (typeof organizationData[key] === 'object' && organizationData[key] !== null) {
          formData.append(key, JSON.stringify(organizationData[key]));
        } else {
          formData.append(key, organizationData[key]);
        }
      }
    });
    
    // Append logo if any
    if (organizationData.logo && typeof organizationData.logo === 'object') {
      formData.append('logo', organizationData.logo);
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

// Delete an organization
export const deleteOrganization = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add a member to an organization
export const addMember = async (organizationId, userId, role) => {
  try {
    const response = await axios.put(`${API_URL}/${organizationId}/members`, {
      userId,
      role
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Remove a member from an organization
export const removeMember = async (organizationId, userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${organizationId}/members/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Verify an organization (admin only)
export const verifyOrganization = async (organizationId, isVerified) => {
  try {
    const response = await axios.put(`${API_URL}/${organizationId}/verify`, {
      isVerified
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get organizations by category
export const getOrganizationsByCategory = async (category, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        category,
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get organizations by location
export const getOrganizationsByLocation = async (city, state, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        city,
        state,
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};