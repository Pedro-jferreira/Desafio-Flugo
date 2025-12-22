import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    Stack,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/flugo_logo 1.svg';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('As senhas não coincidem.');
        }

        if (password.length < 6) {
            return setError('A senha deve ter pelo menos 6 caracteres.');
        }

        try {
            setError('');
            setLoading(true);
            await signUp(email, password);
            navigate('/');
        } catch (err: any) {
            console.error(err);
            // Tratamento básico de erros do Firebase
            if (err.code === 'auth/email-already-in-use') {
                setError('Este email já está cadastrado.');
            } else if (err.code === 'auth/weak-password') {
                setError('A senha é muito fraca.');
            } else {
                setError('Falha ao criar conta. Tente novamente.');
            }
        } finally {
            setLoading(false);
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
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                                Criar Conta
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Preencha os dados abaixo para começar
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
                                <TextField
                                    label="Confirmar Senha"
                                    fullWidth
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    autoComplete="new-password"

                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    error={confirmPassword !== '' && password !== confirmPassword}
                                    helperText={confirmPassword !== '' && password !== confirmPassword ? "As senhas não conferem" : ""}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                                    disabled={loading}
                                    sx={{ mt: 2, height: 48 }}
                                >
                                    {loading ? 'Criando...' : 'Cadastrar'}
                                </Button>
                            </Stack>
                        </form>

                        <Typography variant="body2" align="center">
                            Já tem uma conta?{' '}
                            <Link component={RouterLink} to="/login" color="primary" fontWeight="bold" underline="hover">
                                Faça Login
                            </Link>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}