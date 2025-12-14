import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material'; 
import { theme } from './theme.ts'; 
import App from './App.tsx';
import { SnackbarProvider } from 'notistack';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <SnackbarProvider 
        maxSnack={3} 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000} // Fecha sozinho em 3 segundos
      >
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
)