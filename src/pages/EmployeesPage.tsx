import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import { EmployeesHeader } from '../components/employees/EmployeesHeader';
import { ColaboradoresTable } from '../components/employees/EmployeesTable';


export const EmployeesPage = () => {
  const navigate = useNavigate();
  const { 
    colaboradores, 
    loading, 
    error,              
    orderByField, 
    orderDirection, 
    handleSort,
    loadMore, 
    hasMore 
  } = useEmployees();

  return (
    <Box sx={{ width: '100%', my: '35px' }}> 
      <Stack spacing={5}>
        <EmployeesHeader onNewClick={() => navigate('/adicionar')} />
        <ColaboradoresTable 
          employees={colaboradores}
          isLoading={loading}
          error={error}
          orderBy={orderByField}
          orderDirection={orderDirection}
          onSort={handleSort} 
          onLoadMore={loadMore} 
          hasMore={hasMore} 
        />
      </Stack>
    </Box>
  );
};