import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <Box sx={{ 
            height: '100vh', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center', textAlign: 'center' 
        }}>
            <Typography variant="h4" color="primary" fontWeight="bold">404</Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>Página não encontrada</Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
                Voltar ao Início
            </Button>
        </Box>
    );
}