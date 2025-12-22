import { AppBar as MuiAppBar, Toolbar, Avatar, Box, Typography, Divider, MenuItem, ListItemIcon, Menu, IconButton, Drawer, List, ListItemButton, ListItemText, ListItem } from '@mui/material';
import Avatar1 from '../../assets/Img_Avatar.25.png';
import Logo from '../../assets/flugo_logo 1.svg';
import { useAppTheme } from '../../theme/ThemeContext';
import { useState } from 'react';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import DomainIcon from '@mui/icons-material/Domain';
import UsersIcon from '../../assets/icon.svg';

export const AppBar = () => {
  const { mode, toggleTheme } = useAppTheme();
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  
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
  const handleLogout = async () => {
    handleClose();
    try {
      await logOut();
      navigate('/login'); // Redireciona para login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  const displayName = user?.displayName || "Usuário";
  const displayEmail = user?.email || "";


  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  const menuItems = [
    {
      text: 'Colaboradores',
      path: '/',
      icon: (
        <img
          src={UsersIcon}
          alt="Ícone Colaboradores"
          style={{ width: '20px', height: '20px' }}
        />
      )
    },
    {
      text: 'Departamentos',
      path: '/departamentos',
      // Como o ícone é do MUI
      icon: <DomainIcon sx={{ fontSize: 20 }} />
    }
  ];
  return (
    <>
      <MuiAppBar
        position="static"
        elevation={0}
        sx={{
          width: '100%',
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
                {displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
               {displayEmail}
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

            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
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
          keepMounted: true, 
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280, 
            p: 2,
            backgroundColor: 'background.default'
          },
        }}
      >
        <Box sx={{ mb: 4, mt: 2, px: 1 }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo Flugo"
            sx={{
              height: 40, // Ajuste a altura conforme necessário
              width: 'auto'
            }}
          />
        </Box>

        <List>
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {navigate(item.path);
                  handleNavigate();;
                }}
                sx={{
                  borderRadius: '8px',
                  backgroundColor: active ? 'rgba(34, 197, 94, 0.08)' : 'transparent', // Verde bem clarinho se ativo
                  '&:hover': {
                    backgroundColor: active ? 'rgba(34, 197, 94, 0.16)' : 'grey.100',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px', color: active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    variant: 'subtitle2',
                    fontWeight: active ? 600 : 400,
                    color: active ? 'primary.main' : 'text.secondary'
                  }}
                />

                {active && (
                  <KeyboardArrowRightIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: 20
                    }}
                  />
                )}
                  {!active && (
                  <KeyboardArrowRightIcon
                    sx={{
                      color: 'text.secondary',
                      fontSize: 20
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      </Drawer>
    </>
  );
};