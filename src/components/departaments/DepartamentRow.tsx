import { useState } from 'react';
import {
    TableRow, TableCell, Typography, Box, IconButton, Menu, MenuItem, ListItemIcon, Avatar, Chip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { type Department } from '../../types';

interface DepartmentRowProps {
    data: Department;
    managerName?: string;
    managerAvatar?: string;
    employeeCount: number;
    onEdit: (id: string) => void;
    onDelete: (department: Department) => void; // Passamos o objeto todo para validação futura
}

export const DepartmentRow = ({
    data,
    managerName,
    managerAvatar,
    employeeCount,
    onEdit,
    onDelete
}: DepartmentRowProps) => {
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
        onDelete(data);
    };

    return (
        <TableRow >

            {/* NOME DO DEPARTAMENTO */}
            <TableCell component="th" scope="row">
                <Typography variant="body2"
                    color="text.primary"
                    noWrap>
                    {data.name}
                </Typography>
            </TableCell>

            {/* GESTOR RESPONSÁVEL */}
            <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {managerName ? (
                        <>
                            <Avatar
                                src={managerAvatar}
                                alt={managerName}
                                sx={{ width: 32, height: 32 }}
                            />
                            <Typography variant="body2" color="text.primary">
                                {managerName}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="caption" color="text.disabled" fontStyle="italic">
                            Sem gestor definido
                        </Typography>
                    )}
                </Box>
            </TableCell>

            {/* CONTAGEM DE COLABORADORES */}
            <TableCell>
                <Chip
                    icon={<PeopleAltIcon fontSize="small" />}
                    label={`${employeeCount} colaborador(es)`}
                    size="small"
                    variant="outlined"
                    color={employeeCount > 0 ? "default" : "warning"}
                />
            </TableCell>

            {/* AÇÕES */}
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
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
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