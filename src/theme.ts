import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#22C55E', 
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1BB55C', 
    },

    text: {
      primary: '#212B36',   
      secondary: '#637381', 
      disabled: '#919EAB',  
    },

    action: {
      disabled: '#919EABCC', 
      disabledBackground: '#919EAB33',
    },

    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    
    grey: {
      300: '#919EAB', 
      400: '#637381',
    }
  },

  typography: {
    fontFamily: '"Public Sans", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '36px',
      color: '#212B36',
    },
    body2: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '22px',
    },
    caption: {
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px',
      color: '#637381',
    },
    button: {
      fontWeight: 700,
      fontSize: '15px',
      lineHeight: '26px',
      textTransform: 'none',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '22px',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '24px',
    },
    overline: {
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '20px',
      textTransform: 'none',
    },
  },

  components: {

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
          
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#919EAB33', 
          },
          
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#919EAB', 
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1BB55C', 
            borderWidth: '2px', 
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#637381', 
          
          '&.Mui-focused': {
            color: '#1BB55C', 
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          }
        },
        containedPrimary: {
           color: '#FFFFFF', 
        }
      }
    },
  },
});