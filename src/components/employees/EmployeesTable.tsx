import { useEffect, useRef } from 'react';
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
  CircularProgress
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // Ícone de erro
import { EmployeeRow } from './EmployeeRow';
import { type Employee } from '../../types';
import type { OrderDirection, SortField } from '../../hooks/useEmployees';

interface EmployeesTableProps {
  employees: Employee[];
  isLoading: boolean;
  error?: string | null;     // Novo: Prop de erro
  orderBy: SortField | null;        // Novo: Qual campo está ordenado
  orderDirection: OrderDirection; // Novo: Direção
  onSort: (field: SortField) => void; // Novo: Função para ordenar
  onLoadMore: () => void;    // Novo: Função para carregar mais
  hasMore: boolean;          // Novo: Tem mais dados?
}

export const ColaboradoresTable = ({ 
  employees: employees, 
  isLoading, 
  error,
  orderBy,
  orderDirection,
  onSort,
  onLoadMore,
  hasMore
}: EmployeesTableProps) => {

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
            <TableCell sx={{ width: '30%' }}><HeaderItem label="Nome" property="name" /></TableCell>
            <TableCell sx={{ width: '30%' }}><HeaderItem label="Email" property="email" /></TableCell>
            <TableCell sx={{ width: '20%' }}><HeaderItem label="Departamento" property="department" /></TableCell>
            <TableCell align="right" sx={{ width: '20%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <HeaderItem label="Status" property="status" />
              </Box>
            </TableCell>
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
              {employees.map((colaborador, index) => (
                <EmployeeRow key={colaborador.id} data={colaborador} index={ index} />
              ))}
              
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