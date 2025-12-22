import { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { HeaderPages } from '../components/core/HeaderPages';
import { useDepartments } from '../hooks/useDepartments';
import { EmployeeService } from '../services/EmployeeService'; // Para buscar gestores/contagem
import type { Department } from '../types';
import { DepartmentService } from '../services/DepartamentService';
import { DepartmentsTable } from '../components/departaments/DepartmentsTable';
import { MigrationDialog } from '../components/add_department/MigrationDialog';

export const DepartmentsPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const { departments, loading, error, refresh } = useDepartments();
  const [managersMap, setManagersMap] = useState<Record<string, { name: string, avatar?: string }>>({});
  const [employeeCounts, setEmployeeCounts] = useState<Record<string, number>>({});

  const [migrationOpen, setMigrationOpen] = useState(false);
  const [deptToDelete, setDeptToDelete] = useState<Department | null>(null);
  useEffect(() => {
    const fetchAuxiliaryData = async () => {
      try {
        const result = await EmployeeService.getAll({ pageSize: 1000 }); // PageSize alto para pegar tudo
        const allEmployees = result.data;
        const mMap: Record<string, { name: string, avatar?: string }> = {};
                const cMap: Record<string, number> = {};
        allEmployees.forEach(emp => {
            mMap[emp.id] = { name: emp.name, avatar: emp.avatarUrl };
            
            if (emp.departmentId) {
                cMap[emp.departmentId] = (cMap[emp.departmentId] || 0) + 1;
            }
        });

        setManagersMap(mMap);
        setEmployeeCounts(cMap);

      } catch (err) {
        console.error("Erro ao carregar dados auxiliares", err);
      }
    };

    fetchAuxiliaryData();
  }, [departments]); 

 
const handleDeleteClick = async (department: Department) => {
    const count = employeeCounts[department.id] || 0;
    if (count > 0) {
        setDeptToDelete(department);
        setMigrationOpen(true);
        return;
    }
    if (!confirm(`Tem certeza que deseja excluir o departamento "${department.name}"?`)) return;

    try {
      await DepartmentService.delete(department.id);
      enqueueSnackbar('Departamento excluído com sucesso!', { variant: 'success' });
      refresh();
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Erro ao excluir departamento.', { variant: 'error' });
    }
  };

  const handleConfirmMigration = async (targetDeptId: string) => {
    if (!deptToDelete) return;

    try {
        await DepartmentService.deleteWithMigration(deptToDelete.id, targetDeptId);
        enqueueSnackbar('Departamento excluído e colaboradores migrados!', { variant: 'success' });
        
        setMigrationOpen(false);
        setDeptToDelete(null);
        refresh(); 
    } catch (err) {
        console.error(err);
        enqueueSnackbar('Erro ao migrar e excluir.', { variant: 'error' });
    }
  };
  const handleEdit = (id: string) => {
    navigate(`/departamentos/editar/${id}`);
  };

  return (
  <Box sx={{ width: '100%', my: { xs: 1, md: '35px' } }}>
      <Stack spacing={5}>
        <HeaderPages 
            title={'Departamentos'} 
            onNewClick={() => navigate('/departamentos/adicionar')} 
            buttonText="Novo Departamento"
        />
        
        <DepartmentsTable
          departments={departments}
          isLoading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDeleteClick} // Passa a função nova
          managersMap={managersMap}
          employeeCounts={employeeCounts}
        />

        {/* MODAL DE MIGRAÇÃO REUTILIZADO */}
        {deptToDelete && (
            <MigrationDialog 
                open={migrationOpen}
                onClose={() => {
                    setMigrationOpen(false);
                    setDeptToDelete(null);
                }}
                onConfirm={handleConfirmMigration}
                removedCount={employeeCounts[deptToDelete.id] || 0}
                currentDeptId={deptToDelete.id}
            />
        )}
      </Stack>
    </Box>
  );
};