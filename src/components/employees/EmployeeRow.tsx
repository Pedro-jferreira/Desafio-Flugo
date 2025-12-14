import { TableRow, TableCell, Avatar, Typography, Box, Chip } from '@mui/material';
import { Status, type Employee as Employee } from '../../types';

import Avatar1 from '../../assets/Img_Avatar.1.png';
import Avatar3 from '../../assets/Img_Avatar.3.png';
import Avatar4 from '../../assets/Img_Avatar.4.png';
import Avatar5 from '../../assets/Img_Avatar.5.png';


const AVATARS = [Avatar1 , Avatar3, Avatar4, Avatar5];

interface EmployeeRowProps {
  data: Employee;
  index: number;
}

export const EmployeeRow = ({ data, index }: EmployeeRowProps) => {
  const avatarImage = data.avatarUrl || AVATARS[index % AVATARS.length];
  const getStatusColor = (status: Status) => {
    if (status === Status.ATIVO) {
      return {
        bg: '#22C55E29', 
        color: '#118D57' 
      };
    }
    return {
      bg: '#FF563029', 
      color: '#B71D18' 
    };
  };

  const statusStyle = getStatusColor(data.status);

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

      <TableCell component="th" scope="row">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar alt={data.name} src={avatarImage} />
          <Typography variant="body2"  color="#212B36">
            {data.name}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" color="#212B36">
          {data.email}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" color="#212B36">
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
            minWidth: '51px'
          }}
        />
      </TableCell>

    </TableRow>
  );
};