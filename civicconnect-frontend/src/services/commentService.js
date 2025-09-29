import axios from 'axios';

const API_URL = '/api/comments';

// Get comments by issue ID
export const getCommentsByIssue = async (issueId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/issue/${issueId}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get comment by ID
export const getCommentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new comment
export const createComment = async (commentData) => {
  try {
    // Handle file uploads with FormData if images are included
    if (commentData.images && commentData.images.length > 0) {
      const formData = new FormData();
      
      // Append text fields
      Object.keys(commentData).forEach(key => {
        if (key !== 'images') {
          formData.append(key, commentData[key]);
        }
      });
      
      // Append images
      commentData.images.forEach(image => {
        formData.append('images', image);
      });
      
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } else {
      // Regular JSON request if no images
      const response = await axios.post(API_URL, commentData);
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a comment
export const updateComment = async (id, commentData) => {
  try {
    // Handle file uploads with FormData if images are included
    if (commentData.images && commentData.images.length > 0 && 
        commentData.images.some(img => typeof img === 'object')) {
      const formData = new FormData();
      
      // Append text fields
      Object.keys(commentData).forEach(key => {
        if (key !== 'images') {
          formData.append(key, commentData[key]);
        }
      });
      
      // Append new images
      commentData.images.forEach(image => {
        if (typeof image === 'object') {
          formData.append('newImages', image);
        }
      });
      
      // Append existing image URLs to keep
      const existingImages = commentData.images
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
      const response = await axios.put(`${API_URL}/${id}`, commentData);
      return response.data;
    }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a comment
export const deleteComment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Like a comment
export const likeComment = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};