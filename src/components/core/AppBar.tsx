import { AppBar as MuiAppBar, Toolbar, Avatar, Box, Typography, Divider, MenuItem, ListItemIcon, Menu, IconButton, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import Avatar1 from '../../assets/Img_Avatar.25.png';
import { useAppTheme } from '../../theme/ThemeContext';
import { useState } from 'react';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const AppBar = () => {
  const { mode, toggleTheme } = useAppTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: 'light' | 'dark') => {
    toggleTheme(newMode);
    handleClose();
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = () => {
    setMobileOpen(false);
  };
  return (
    <>
    <MuiAppBar
    position="static"
      elevation={0}
      sx={{
        width:'100%',
        height: '80px',
        backgroundColor: 'background.default',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 5 }, }}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        <Box sx={{ flexGrow: 1 }} />

        <Box
        onClick={handleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '2px solid #919EAB14',
            padding: '3px',
            cursor: 'pointer',
          }}
        >
          <Avatar
            alt="Usuário"
            src=
            {Avatar1}
            sx={{
              width: 40,
              height: 40,
            }}
          />
        </Box>
{/* --- O MENU OVERLAY --- */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          
          // Ajustes visuais para parecer um "Pop-up" moderno
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              width: 220, // Largura fixa boa para menus
              
              // Triângulozinho (seta) apontando para o avatar
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 24, // Posição da seta
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* Cabeçalho do Menu */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" noWrap>
              Pedro Ferreira
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              pedro@flugo.com.br
            </Typography>
          </Box>
          
          <Divider />

          {/* Opções de Tema */}
          <MenuItem onClick={() => handleThemeChange('light')} selected={mode === 'light'}>
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            Modo Claro
          </MenuItem>

          <MenuItem onClick={() => handleThemeChange('dark')} selected={mode === 'dark'}>
            <ListItemIcon>
              <DarkModeIcon fontSize="small" />
            </ListItemIcon>
            Modo Escuro
          </MenuItem>

          <Divider />
          
           <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Configurações
          </MenuItem>

          <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>

      </Toolbar>
    </MuiAppBar>
    <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhor desempenho no mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' }, // Só existe no mobile
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280, // Largura do menu lateral
            p: 2,
            backgroundColor: 'background.paper'
          },
        }}
      >
        <Box sx={{ mb: 4, px: 1 }}>
           {/* Logo ou Título do Menu */}
           <Typography variant="h5" fontWeight="bold" color="primary">Flugo</Typography>
        </Box>

        <List>
          {/* --- O ITEM QUE VOCÊ PEDIU --- */}
          <ListItemButton
            onClick={() => handleNavigate()} // Navega para Home
            sx={{
              borderRadius: '8px',
              backgroundColor: 'action.selected', // Deixa marcado como ativo
              mb: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <img
                src={Avatar1}
                alt="Ícone Colaboradores"
                style={{ width: '20px', height: '20px' }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Colaboradores"
              primaryTypographyProps={{
                variant: 'subtitle1',
                // No menu ativo, a cor costuma ser primary ou text.primary
                color: 'text.primary', 
                fontWeight: 'bold'
              }}
            />

            <KeyboardArrowRightIcon
              sx={{
                color: 'text.secondary',
                fontSize: 20
              }}
            />
          </ListItemButton>
          
          {/* Você pode adicionar mais itens aqui futuramente */}
        </List>
      </Drawer>
    </>
  );
};