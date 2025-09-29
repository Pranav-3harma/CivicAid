import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const showNotification = (message, severity = 'info', autoHideDuration = 6000) => {
    const id = Date.now();
    const newNotification = {
      id,
      message,
      severity,
      autoHideDuration,
    };

    setNotifications(prev => [...prev, newNotification]);

    if (!open) {
      setCurrent(newNotification);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleExited = () => {
    // Show the next notification in queue if any
    const nextNotifications = notifications.filter(n => n.id !== current.id);
    setNotifications(nextNotifications);

    if (nextNotifications.length > 0) {
      setCurrent(nextNotifications[0]);
      setOpen(true);
    } else {
      setCurrent(null);
    }
  };

  // Helper methods for different notification types
  const showSuccess = (message, autoHideDuration) => {
    showNotification(message, 'success', autoHideDuration);
  };

  const showError = (message, autoHideDuration) => {
    showNotification(message, 'error', autoHideDuration);
  };

  const showWarning = (message, autoHideDuration) => {
    showNotification(message, 'warning', autoHideDuration);
  };

  const showInfo = (message, autoHideDuration) => {
    showNotification(message, 'info', autoHideDuration);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      {current && (
        <Snackbar
          open={open}
          autoHideDuration={current.autoHideDuration}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity={current.severity}>
            {current.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;