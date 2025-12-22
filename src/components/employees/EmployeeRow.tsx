import { TableRow, TableCell, Avatar, Typography, Box, Chip, Tooltip, useTheme, alpha, Checkbox, MenuItem, ListItemIcon, Menu, IconButton } from '@mui/material';
import { Status, type Employee as Employee } from '../../types';

import Avatar1 from '../../assets/Img_Avatar.1.png';
import Avatar3 from '../../assets/Img_Avatar.3.png';
import Avatar4 from '../../assets/Img_Avatar.4.png';
import Avatar5 from '../../assets/Img_Avatar.5.png';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const AVATARS = [Avatar1, Avatar3, Avatar4, Avatar5];

interface EmployeeRowProps {
  data: Employee;
  index: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  departmentName: string;
}

export const EmployeeRow = ({ 
  data, 
  index, 
  selected, 
  onSelect, 
  onDelete, 
  onEdit ,
  departmentName
}: EmployeeRowProps) => {
  const theme = useTheme();
  const avatarImage = data.avatarUrl || AVATARS[index % AVATARS.length];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); 
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(data.id);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(data.id);
  };
const getStatusStyles = (status: Status) => {
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

      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selected}
          inputProps={{ 'aria-labelledby': `employee-checkbox-${index}` }}
          onClick={(event) => {
            // Para a propagação para evitar clique duplo se a Row já tiver onClick
            event.stopPropagation(); 
            onSelect(data.id);
          }}
        />
      </TableCell>
      
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
          {departmentName}
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
      {/* AÇÕES (MENU) */}
      <TableCell align="right">
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                 content: '""',
                 display: 'block',
                 position: 'absolute',
                 top: 0,
                 right: 14,
                 width: 10,
                 height: 10,
                 bgcolor: 'background.paper',
                 transform: 'translateY(-50%) rotate(45deg)',
                 zIndex: 0,
               },
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Editar
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" color="error" />
            </ListItemIcon>
            Excluir
          </MenuItem>
        </Menu>
        </TableCell>

    </TableRow>
  );
};