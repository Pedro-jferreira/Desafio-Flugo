import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

import { AppBar } from '../components/core/AppBar';
import { Sidebar } from '../components/core/Sidebar';

export const MainLayout = () => {
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      height: { xs: 'auto', md: '100vh' },
      minHeight: { xs: '100vh', md: 'unset' },

      overflow: { xs: 'visible', md: 'hidden' }
    }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{
          flexShrink: 0,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Sidebar />
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          height: { xs: 'auto', md: '100vh' },
          overflowY: { xs: 'visible', md: 'hidden' },
        }}
      >
        <AppBar />

        <Box
          sx={{
            flex: 1,
            px: { xs: 2, md: 5 },
            pb: { xs: 4, md: 0 },
            boxSizing: 'border-box',
            overflowY: { xs: 'visible', md: 'auto' },
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