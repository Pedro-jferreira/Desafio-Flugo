import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Box sx={{ 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};