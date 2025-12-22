import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

interface HeaderProps {
    onNewClick?: () => void;
    title: String;
    buttonText: String
}

export const HeaderPages = ({ onNewClick, title,buttonText }: HeaderProps) => {
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
                {title}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size={isMobile ? 'medium' : 'large'}
                onClick={onNewClick}
            >
                {buttonText}
            </Button>
        </Box>
    );
};