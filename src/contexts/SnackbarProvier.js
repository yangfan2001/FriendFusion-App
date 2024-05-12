import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const SnackbarContext = createContext(null);



export const SnackbarProvider = ({ children }) => {
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const addMessage = (message, severity) => {
    setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
  };

  const handleClose = () => {
    setOpen(false);
    setMessageInfo(undefined);
  };


  return (
    <SnackbarContext.Provider value={{ addMessage }}>
      {children}
      <Snackbar
        key={messageInfo?.key}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity={messageInfo?.severity || 'info'} elevation={6} variant="filled">
          {messageInfo?.message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return useCallback((message, severity) => {
    context.addMessage(message, severity);
  }, [context]);
};