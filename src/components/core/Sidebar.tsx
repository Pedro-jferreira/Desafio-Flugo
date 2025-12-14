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

import FlugoLogo from '../../assets/flugo_logo 1.svg';
import UsersIcon from '../../assets/icon.svg';

const drawerWidth = 280;

export const Sidebar = () => {
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
          backgroundColor: 'background.paper',
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
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: '40px' }}>
              <img
                src={UsersIcon}
                alt="Ícone Colaboradores"
                style={{ width: '20px', height: '20px' }}
              />
            </ListItemIcon>

            <ListItemText
              primary="Colaboradores"
              primaryTypographyProps={{
                variant: 'subtitle1',
                color: 'text.secondary'
              }}
            />

            {/* Setinha na mesma cor */}
            <KeyboardArrowRightIcon
              sx={{
                color: 'text.secondary',
                fontSize: 20
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};