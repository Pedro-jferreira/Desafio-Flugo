import { useEffect, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Skeleton,
  CircularProgress,
  Tooltip,
  IconButton,
  alpha,
  Checkbox
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Ícone de erro
import { EmployeeRow } from './EmployeeRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { type Employee } from '../../types';
import type { OrderDirection, SortField } from '../../hooks/useEmployees';

interface EmployeesTableProps {
  employees: Employee[];
  isLoading: boolean;
  error?: string | null;    
  orderBy: SortField | null;      
  orderDirection: OrderDirection; 
  onSort: (field: SortField) => void;
  onLoadMore: () => void;    
  hasMore: boolean;         
  onDelete: (ids: string[]) => void;
  onEdit: (id: string) => void;
  departmentsMap: Record<string, string>;
}

export const ColaboradoresTable = ({ 
  employees: employees, 
  isLoading, 
  error,
  orderBy,
  orderDirection,
  onSort,
  onLoadMore,
  hasMore,
  onDelete,
  onEdit,
  departmentsMap
}: EmployeesTableProps) => {

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n) => n.id);
      setSelectedIds(newSelecteds);
      return;
    }
    setSelectedIds([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1),
      );
    }
    setSelectedIds(newSelected);
  };

  const isSelected = (id: string) => selectedIds.indexOf(id) !== -1;

  const handleDeleteSelected = () => {
    onDelete(selectedIds);
    setSelectedIds([]); // Limpa seleção após deletar
  };

  // --- Lógica de Infinite Scroll (Observer Nativo) ---
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !error) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading, onLoadMore, error]);

  const HeaderItem = ({ label, property }: { label: string, property: SortField }) => {
    const active = orderBy === property;
    
    return (
      <Box 
        onClick={() => onSort(property)}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5, 
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover': { opacity: 0.8 }
        }}
      >
        <Typography 
          variant="subtitle2" 
          color={active ? "text.primary" : "text.secondary"}
          fontWeight={active ? 700 : 600}
        >
          {label}
        </Typography>

        <ArrowDownwardIcon 
          sx={{ 
            fontSize: 14, 
            color: active ? 'text.primary' : 'text.disabled',
            // Gira a seta (180deg) se for ASC
            transform: active && orderDirection === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            opacity: active ? 1 : 0 
          }} 
        />
      </Box>
    );
  };

  const isInitialLoading = isLoading && employees.length === 0;
const numSelected = selectedIds.length;
  const rowCount = employees.length;
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
      {numSelected > 0 && (
        <Box sx={{
          pl: 2, pr: 1, py: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08)
        }}>
          <Typography color="primary" variant="subtitle1" component="div">
            {numSelected} selecionado(s)
          </Typography>
          <Tooltip title="Excluir Selecionados">
            <IconButton onClick={handleDeleteSelected}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Table
        sx={{
          width: '100%',
          tableLayout: 'fixed',
          minWidth: 650
        }}
        aria-label="tabela de colaboradores"
      >
        <TableHead sx={{ backgroundColor: 'background.neutral' }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell sx={{ width: '30%' }}><HeaderItem label="Nome" property="name" /></TableCell>
            <TableCell sx={{ width: '25%' }}><HeaderItem label="Email" property="email" /></TableCell>
            <TableCell sx={{ width: '20%' }}><HeaderItem label="Departamento" property="departmentId" /></TableCell>
            <TableCell align="right" sx={{ width: '15%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <HeaderItem label="Status" property="status" />
              </Box>
            </TableCell>
            <TableCell align="right" sx={{ width: '10%' }} /> {/* Coluna Vazia para Menu */}
          </TableRow>
        </TableHead>

        <TableBody>
          {/* 1. ESTADO DE ERRO */}
          {error ? (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <ErrorOutlineIcon color="error" sx={{ fontSize: 40 }} />
                  <Typography variant="body1" color="text.secondary">
                    {error}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : isInitialLoading ? (
            /* 2. LOADING INICIAL (Skeletons) */
            Array.from(new Array(5)).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton variant="text" width="80%" /></TableCell>
                <TableCell><Skeleton variant="text" width="90%" /></TableCell>
                <TableCell><Skeleton variant="text" width="60%" /></TableCell>
                <TableCell><Skeleton variant="text" width="40%" sx={{ ml: 'auto' }} /></TableCell>
              </TableRow>
            ))
          ) : employees.length === 0 ? (
            /* 3. LISTA VAZIA */
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Nenhum colaborador encontrado.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            /* 4. LISTA DE DADOS + SCROLL INFINITO */
            <>
             {employees.map((colaborador, index) => {
                const isItemSelected = isSelected(colaborador.id);
                const deptName = departmentsMap[colaborador.departmentId] || 'Sem Departamento';
                return (
                  <EmployeeRow 
                    key={colaborador.id} 
                    data={colaborador} 
                    index={index} 
                    selected={isItemSelected}
                    onSelect={handleClick}
                    onDelete={(id) => onDelete([id])}
                    onEdit={onEdit}
                    departmentName={deptName}
                  />
                );
              })}
              {/* ELEMENTO SENTINELA (Scroll Trigger) */}
              {hasMore && (
                 <TableRow ref={observerTarget}>
                   <TableCell colSpan={4} align="center" sx={{ py: 2 }}>
                     {/* Spinner pequeno no final da lista quando arrasta */}
                     <CircularProgress size={24} color="primary" />
                   </TableCell>
                 </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};