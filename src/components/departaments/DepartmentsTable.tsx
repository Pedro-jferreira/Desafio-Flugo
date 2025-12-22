import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography,
  Skeleton, 
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { DepartmentRow } from './DepartamentRow';
import type { Department } from '../../types';

interface DepartmentsTableProps {
  departments: Department[];
  isLoading: boolean;
  error?: string | null;
  onEdit: (id: string) => void;
  onDelete: (department: Department) => void;
  // Mapas de dados auxiliares
  managersMap: Record<string, { name: string, avatar?: string }>;
  employeeCounts: Record<string, number>;
}

export const DepartmentsTable = ({ 
  departments, 
  isLoading, 
  error,
  onEdit,
  onDelete,
  managersMap,
  employeeCounts
}: DepartmentsTableProps) => {

  return (
     <TableContainer
      component={Paper}
      elevation={0}
      sx={{
     
        borderRadius: '16px',
        width: '100%',
        boxShadow: '0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)'
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="tabela de departamentos">
        <TableHead sx={{ backgroundColor: 'background.neutral' }}>
          <TableRow>
            <TableCell width="30%">Nome</TableCell>
            <TableCell width="35%">Gestor Responsável</TableCell>
            <TableCell width="25%">Colaboradores</TableCell>
            <TableCell align="right" width="10%">Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {error ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />
                  <Typography variant="body1" color="text.secondary">{error}</Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : isLoading ? (
             Array.from(new Array(3)).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                <TableCell><Skeleton variant="rectangular" width={100} height={24}  /></TableCell>
                <TableCell><Skeleton variant="circular" width={30} height={30} sx={{ ml: 'auto' }} /></TableCell>
              </TableRow>
            ))
          ) : departments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                <Typography variant="body2" color="text.secondary">Nenhum departamento encontrado.</Typography>
              </TableCell>
            </TableRow>
          ) : (
            departments.map((dept) => {
              const manager = dept.managerId ? managersMap[dept.managerId] : undefined;
              const count = employeeCounts[dept.id] || 0;

              return (
                <DepartmentRow 
                  key={dept.id} 
                  data={dept} 
                  managerName={manager?.name}
                  managerAvatar={manager?.avatar}
                  employeeCount={count}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};