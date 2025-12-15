import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SnackbarProvider } from 'notistack';
import { AppThemeProvider } from './theme/ThemeContext.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
      >
        <App />
      </SnackbarProvider>
    </AppThemeProvider>
  </StrictMode>,
)