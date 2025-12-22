import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DomainIcon from '@mui/icons-material/Domain';
import FlugoLogo from '../../assets/flugo_logo 1.svg';
import UsersIcon from '../../assets/icon.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 280;

export const Sidebar = () => {
  const navigate = useNavigate();
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
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px dashed #919EAB33',
          backgroundColor: 'background.default',
          paddingX: '16px',
        },
      }}
    >

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '24px 16px 8px',
        }}
      >
        <img
          src={FlugoLogo}
          alt="Flugo Logo"
          style={{ height: '28px' }}
        />
      </Box>
      <List>
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
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
  );
};