import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { 
  Stack, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormHelperText, 
  CircularProgress,
  Autocomplete,
  Chip
} from "@mui/material";
import type { DepartmentSchemaType } from "../../schema";
import { EmployeeService } from "../../services/EmployeeService";
import { type Employee, Seniority } from "../../types";

// --- PASSO 1: INFORMAÇÕES BÁSICAS ---
export const DeptBasicInfoStep = () => {
  const { register, formState: { errors } } = useFormContext<DepartmentSchemaType>();

  return (
    <Stack spacing={3}>
      <Typography variant="h6" color="text.secondary">
        Dados do Departamento
      </Typography>

      <TextField
        label="Nome do Departamento"
        fullWidth
        placeholder="Ex: Recursos Humanos"
        InputLabelProps={{ shrink: true }}
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Stack>
  );
};

// --- PASSO 2: MEMBROS E GESTÃO ---
export const DeptPeopleStep = () => {
  const { control,  watch, formState: { errors } } = useFormContext<DepartmentSchemaType>();
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega todos os funcionários para popular as listas
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await EmployeeService.getAll({ pageSize: 1000 });
        setEmployees(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <Stack alignItems="center"><CircularProgress /></Stack>;

  // Filtra apenas Gestores para o primeiro campo
  const managers = employees.filter(e => e.seniority === Seniority.GESTOR);
  
  // Para o campo de membros, removemos quem já foi selecionado como gestor (opcional, mas faz sentido)
  const currentManagerId = watch('managerId');
  const availableMembers = employees.filter(e => e.id !== currentManagerId);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" color="text.secondary">
        Estrutura da Equipe
      </Typography>

      {/* SELEÇÃO DO GESTOR */}
      <Controller
        name="managerId"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.managerId}>
            <InputLabel id="manager-label" shrink>Gestor Responsável</InputLabel>
            <Select
              {...field}
              labelId="manager-label"
              label="Gestor Responsável"
              displayEmpty
            >
              <MenuItem value="">
                <em style={{ color: '#919EAB' }}>Sem gestor definido</em>
              </MenuItem>
              {managers.map((mgr) => (
                <MenuItem key={mgr.id} value={mgr.id}>
                  {mgr.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.managerId?.message}</FormHelperText>
          </FormControl>
        )}
      />

      {/* SELEÇÃO MÚLTIPLA DE MEMBROS (AUTOCOMPLETE) */}
      <Controller
        name="memberIds"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            options={availableMembers}
            getOptionLabel={(option) => option.name}
            // Mapeia o array de IDs selecionados de volta para objetos Employee para o Autocomplete mostrar
            value={availableMembers.filter(e => (value || []).includes(e.id))}
            onChange={(_, newValue) => {
              // Ao selecionar, salvamos apenas os IDs no formulário
              onChange(newValue.map(v => v.id));
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Adicionar Colaboradores" 
                placeholder="Selecione..." 
                InputLabelProps={{ shrink: true }}
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  size="small"
                />
              ))
            }
          />
        )}
      />
      <Typography variant="caption" color="text.secondary">
        * Os colaboradores selecionados serão movidos automaticamente para este novo departamento.
      </Typography>
    </Stack>
  );
};