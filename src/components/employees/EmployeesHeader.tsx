import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

interface EmployeesHeaderProps {
    onNewClick?: () => void;
}

export const EmployeesHeader = ({ onNewClick }: EmployeesHeaderProps) => {
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: 2
            }}
        >

            <Typography
                variant="h4"
            >
                Colaboradores
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size={isMobile ? 'medium' : 'large'}
                onClick={onNewClick}
            >
                Novo Colaborador
            </Button>
        </Box>
    );
};