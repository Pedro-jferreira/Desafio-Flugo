import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import { AppBar } from '../components/core/AppBar';
import { Sidebar } from '../components/core/Sidebar';

export const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <AppBar />
        <Box
          sx={{
            flex: 1,

            px: '40px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};