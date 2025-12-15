import { TableRow, TableCell, Avatar, Typography, Box, Chip, Tooltip, useTheme, alpha } from '@mui/material';
import { Status, type Employee as Employee } from '../../types';

import Avatar1 from '../../assets/Img_Avatar.1.png';
import Avatar3 from '../../assets/Img_Avatar.3.png';
import Avatar4 from '../../assets/Img_Avatar.4.png';
import Avatar5 from '../../assets/Img_Avatar.5.png';


const AVATARS = [Avatar1, Avatar3, Avatar4, Avatar5];

interface EmployeeRowProps {
  data: Employee;
  index: number;
}

export const EmployeeRow = ({ data, index }: EmployeeRowProps) => {
  const theme = useTheme();
  const avatarImage = data.avatarUrl || AVATARS[index % AVATARS.length];

const getStatusStyles = (status: Status) => {
    // Define qual cor base usar (Sucesso ou Erro) vindo do tema
    const mainColor = status === Status.ATIVO 
      ? theme.palette.success.main 
      : theme.palette.error.main;

    return {
      color: mainColor,
      bg: alpha(mainColor, 0.16) 
    };
  };

  const statusStyle = getStatusStyles(data.status);

  return (
    <TableRow   sx={{backgroundColor: 'background.paper', '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt={data.name} src={avatarImage} />

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Tooltip title={data.name} arrow placement="top-start">
              <Typography
                variant="body2"
                color="text.primary"
                noWrap
              >
                {data.name}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Tooltip title={data.email} arrow placement="top-start">
          <Typography
            variant="body2"
            color="text.primary"
            noWrap
          >
            {data.email}
          </Typography>
        </Tooltip>
      </TableCell>

      <TableCell>
        <Typography variant="body2"
          color="text.primary" noWrap>
          {data.department}
        </Typography>
      </TableCell>

      <TableCell align="right">
        <Chip
          label={data.status}
          size="small"
          sx={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
            fontWeight: 'bold',
            borderRadius: '6px',
            minWidth: '70px'
          }}
        />
      </TableCell>

    </TableRow>
  );
};