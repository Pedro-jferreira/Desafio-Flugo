import { Box, Typography, Button } from '@mui/material';

interface EmployeesHeaderProps {
    onNewClick?: () => void;
}

export const EmployeesHeader = ({ onNewClick }: EmployeesHeaderProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}
        >

            <Typography
                variant="h4"
                color="text.primary"
            >
                Colaboradores
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onNewClick}
            >
                Novo Colaborador
            </Button>
        </Box>
    );
};