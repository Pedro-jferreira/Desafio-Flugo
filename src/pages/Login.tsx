import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { 
    Box, Card, CardContent, TextField, Button, Typography, Link, Alert, Stack, 
    InputAdornment,
    IconButton
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

import Logo from '../assets/flugo_logo 1.svg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            await signIn(email, password);
            navigate('/'); 
        } catch (err) {
            setError('Falha no login. Verifique suas credenciais.');
            console.error(err);
        }
    };

    return (
     <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', // Importante: Empilha Logo em cima do Card
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 2
        }}>
            <Box 
                component="img"
                src={Logo}
                alt="Flugo Logo"
                sx={{
                    width: { xs: 150, md: 200 }, 
                    mb: { xs: 4, md: 8 }, 
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))' 
                }}
            />
            <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" gutterBottom>Entrar</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Digite suas credenciais para continuar
                            </Typography>
                        </Box>

                        {error && <Alert severity="error">{error}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                               
                                 <TextField
                                    label="Senha"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />



                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    fullWidth 
                                    size="large"
                                    sx={{ mt: 2 }}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>

                        <Typography variant="body2" align="center">
                            Não tem uma conta?{' '}
                            <Link component={RouterLink} to="/register" color="primary" fontWeight="bold">
                                Cadastre-se
                            </Link>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}