import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import { ColaboradoresTable } from '../components/employees/EmployeesTable';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { DepartmentService } from '../services/DepartamentService';
import { HeaderPages } from '../components/core/HeaderPages';


export const EmployeesPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [departmentsMap, setDepartmentsMap] = useState<Record<string, string>>({});
  const {
    employees,
    loading,
    error,
    orderByField,
    orderDirection,
    handleSort,
    loadMore,
    hasMore,
    removeEmployees
  } = useEmployees();

  const handleDelete = async (ids: string[]) => {
    if (!confirm(`Tem certeza?`)) return;

    try {
      await removeEmployees(ids); // <--- Chamada limpa
      enqueueSnackbar('Excluído com sucesso!', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Erro ao excluir.', { variant: 'error' });
    }
  };
  const handleEdit = (id: string) => {
    navigate(`/editar/${id}`); // Agora funciona!
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await DepartmentService.getAll();
        const map: Record<string, string> = {};
        data.forEach(dept => {
          map[dept.id] = dept.name;
        });
        setDepartmentsMap(map);
      } catch (error) {
        console.error("Erro ao carregar departamentos", error);
      }
    };
    fetchDepartments();
  }, []);
  return (
    <Box sx={{ width: '100%', my: { xs: 1, md: '35px' } }}>
      <Stack spacing={5}>
        <HeaderPages buttonText={'Novo Colaborador'} title={'Colaboradores'} onNewClick={() => navigate('/adicionar')} />
        <ColaboradoresTable
          onDelete={handleDelete}
          onEdit={handleEdit} employees={employees}
          isLoading={loading}
          error={error}
          orderBy={orderByField}
          orderDirection={orderDirection}
          onSort={handleSort}
          onLoadMore={loadMore}
          hasMore={hasMore}
          departmentsMap={departmentsMap}
        />
      </Stack>
    </Box>
  );
};