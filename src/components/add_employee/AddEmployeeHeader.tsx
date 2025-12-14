import { Box, Breadcrumbs, Link, Typography, LinearProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface AddEmployeeHeaderProps {
  progress: number;
}

export const AddEmployeeHeader = ({ progress }: AddEmployeeHeaderProps) => {
  
  const SeparatorDot = () => (
    <Box 
      component="span" 
      sx={{ 
        width: '4px', 
        height: '4px', 
        borderRadius: '50%', 
        backgroundColor: 'text.disabled' 
      }} 
    />
  );

  return (
    <Box sx={{ width: '100%' }}>
      
      <Breadcrumbs 
        separator={<SeparatorDot />} 
        aria-label="breadcrumb"
        sx={{ 
          mb: 3, 
          '& .MuiBreadcrumbs-separator': {
            mx: '16px',
          }
        }}
      >
        <Link 
          component={RouterLink} 
          to="/" 
          underline="hover" 
          variant="body2"       
          color="text.primary"  
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Colaboradores
        </Link>
        
        <Typography 
          variant="body2"       
          color="text.disabled" 
        >
          Cadastrar Colaborador
        </Typography>
      </Breadcrumbs>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            flexGrow: 1, 
            height: 8, 
            borderRadius: 5,
            backgroundColor: '#22C55E3D', 
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'primary.main', 
              borderRadius: 5
            }
          }} 
        />
        
        <Typography 
          variant="caption"      
          color="text.secondary"  
          
        >
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
};