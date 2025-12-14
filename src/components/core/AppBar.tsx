import { AppBar as MuiAppBar, Toolbar, Avatar, Box } from '@mui/material';
import Avatar1 from '../../assets/Img_Avatar.25.png';

export const AppBar = () => {
  return (
    <MuiAppBar
      position="static"
      sx={{
        width:'100%',
        height: '80px',
        backgroundColor: '#fff',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ px: '40px !important' }}>
        <Box sx={{ flexGrow: 1 }} />

        <Box
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

      </Toolbar>
    </MuiAppBar>
  );
};