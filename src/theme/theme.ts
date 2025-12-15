import { createTheme, type PaletteMode } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface TypeBackground {
    neutral: string; // Ensinamos ao TS que 'neutral' existe agora
  }
}
// Função que retorna as cores baseadas no modo
const getPalette = (mode: PaletteMode) => ({
  mode,
  primary: {
    main: '#22C55E',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#1BB55C',
  },
  ...(mode === 'light'
    ? {
        text: {
          primary: '#212B36',
          secondary: '#637381',
          disabled: '#919EAB',
        },
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
          neutral: '#F4F6F8'
        },
        action: {
          disabled: '#919EABCC',
          disabledBackground: '#919EAB33',
        },
        grey: {
          300: '#919EAB',
          400: '#637381',
        },
        divider: '#919EAB33', 
        error: {
          main: '#B71D18',
        },
        success: {
          main: '#118D57', 
        },
      }
    : {
        text: {
          primary: '#FFFFFF',
          secondary: '#919EAB',
          disabled: '#637381',
        },
        background: {
          default: '#161C24', 
          paper: '#212B36',   
          neutral: '#919EAB1F'
        },
        action: {
          disabled: '#919EABCC',
          disabledBackground: '#212B36',
        },
        grey: {
          300: '#637381',
          400: '#919EAB',
        },
        divider: 'rgba(145, 158, 171, 0.24)',
        error: {
          main: '#FFAC82', 

        },
        success: {
          main: '#77ED8B', 
        },
      }),
});

export const createAppTheme = (mode: PaletteMode) => createTheme({
  palette: getPalette(mode),
  typography: {
    fontFamily: '"Public Sans", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '36px',
      color: 'text.primary',
      '@media (max-width:600px)': {
        fontSize: '20px',
        lineHeight: '30px',
      },
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
        input: {
        '&:-webkit-autofill': {
       
          WebkitBoxShadow: `0 0 0 100px ${mode === 'light' ? '#d5f1e0ff' : '#212B36'} inset`,
          WebkitTextFillColor: mode === 'light' ? '#212B36' : '#FFFFFF',
            borderRadius: '8px',
            border: '2px solid transparent', 
    backgroundClip: 'content-box',
        },
      },
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