import { createContext, useContext, useState, useEffect,  useMemo, type ReactNode } from 'react';
import { ThemeProvider, CssBaseline, type PaletteMode,  } from '@mui/material';
import { createAppTheme } from './theme'; // Importe a função que criamos acima

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: (newMode: PaletteMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode === 'dark' || savedMode === 'light') ? savedMode : 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = (newMode: PaletteMode) => {
    setMode(newMode);
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);