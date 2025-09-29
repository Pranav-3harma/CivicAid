import { useState, useCallback } from 'react';
import { useNotification } from '../contexts/NotificationContext';

/**
 * Custom hook for handling API requests with loading, error, and success states
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @param {boolean} options.showSuccessNotification - Whether to show success notifications
 * @param {boolean} options.showErrorNotification - Whether to show error notifications
 * @param {string} options.successMessage - Custom success message
 * @returns {Object} - { data, loading, error, execute, reset }
 */
const useApiRequest = (apiFunction, options = {}) => {
  const {
    showSuccessNotification = false,
    showErrorNotification = true,
    successMessage = 'Operation completed successfully',
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess, showError } = useNotification();

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);

        const result = await apiFunction(...args);
        setData(result);

        if (showSuccessNotification) {
          showSuccess(successMessage);
        }

        return result;
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);

        if (showErrorNotification) {
          showError(errorMessage);
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, showSuccessNotification, showErrorNotification, successMessage, showSuccess, showError]
  );

  return { data, loading, error, execute, reset };
};

export default useApiRequest;