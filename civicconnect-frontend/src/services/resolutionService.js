import axios from 'axios';

const API_URL = '/api/resolutions';

// Get all resolutions with pagination
export const getResolutions = async (page = 1, limit = 10, filters = {}) => {
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

// Get resolutions by issue ID
export const getResolutionsByIssue = async (issueId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/issue/${issueId}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get resolutions by organization ID
export const getResolutionsByOrganization = async (organizationId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/organization/${organizationId}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get resolution by ID
export const getResolutionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new resolution
export const createResolution = async (resolutionData) => {
  try {
    // Handle file uploads with FormData
    const formData = new FormData();
    
    // Append text fields
    Object.keys(resolutionData).forEach(key => {
      if (key !== 'images') {
        if (typeof resolutionData[key] === 'object' && resolutionData[key] !== null) {
          formData.append(key, JSON.stringify(resolutionData[key]));
        } else {
          formData.append(key, resolutionData[key]);
        }
      }
    });
    
    // Append images if any
    if (resolutionData.images && resolutionData.images.length > 0) {
      resolutionData.images.forEach(image => {
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

// Update a resolution
export const updateResolution = async (id, resolutionData) => {
  try {
    // Handle file uploads with FormData if images are included
    if (resolutionData.images && resolutionData.images.length > 0 && 
        resolutionData.images.some(img => typeof img === 'object')) {
      const formData = new FormData();
      
      // Append text fields
      Object.keys(resolutionData).forEach(key => {
        if (key !== 'images') {
          if (typeof resolutionData[key] === 'object' && resolutionData[key] !== null) {
            formData.append(key, JSON.stringify(resolutionData[key]));
          } else {
            formData.append(key, resolutionData[key]);
          }
        }
      });
      
      // Append new images
      resolutionData.images.forEach(image => {
        if (typeof image === 'object') {
          formData.append('newImages', image);
        }
      });
      
      // Append existing image URLs to keep
      const existingImages = resolutionData.images
        .filter(img => typeof img === 'string')
        .map(img => img.split('/').pop());
      
      if (existingImages.length > 0) {
        formData.append('existingImages', JSON.stringify(existingImages));
      }
      
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } else {
      // Regular JSON request if no new images
      const response = await axios.put(`${API_URL}/${id}`, resolutionData);
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a resolution
export const deleteResolution = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add feedback to a resolution
export const addFeedback = async (id, feedback) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/feedback`, { feedback });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};