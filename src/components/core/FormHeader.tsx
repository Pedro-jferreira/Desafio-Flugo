import { Box, Breadcrumbs, Link, Typography, LinearProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface FormHeaderProps {
  progress: number;
  parentLabel: string; // Ex: "Colaboradores" ou "Departamentos"
  parentPath: string;  // Ex: "/" ou "/departamentos"
  title: string;       // Ex: "Cadastrar Colaborador" ou "Novo Departamento"
}

export const FormHeader = ({ progress, parentLabel, parentPath, title }: FormHeaderProps) => {
  
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
          to={parentPath} 
          underline="hover" 
          variant="body2"       
          color="text.primary"  
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {parentLabel}
        </Link>
        
        <Typography 
          variant="body2"       
          color="text.disabled" 
        >
          {title}
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