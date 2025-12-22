import { Controller, useFormContext } from "react-hook-form";
import type { ColaboradorSchemaType } from "../../schema";
import { CircularProgress, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { IOSSwitch } from "../core/IOSSwitch";
import { type Department, Seniority, type Employee } from "../../types";
import { useEffect, useRef, useState } from "react";
import { DepartmentService } from "../../services/DepartamentService";
import { EmployeeService } from "../../services/EmployeeService";

export const BasicInfoStep = () => {
  const { register, control, formState: { errors } } = useFormContext<ColaboradorSchemaType>();

  const emailRef = useRef<HTMLInputElement | null>(null);

  const { ref: emailRhfRef, ...emailRest } = register('email');

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      emailRef.current?.focus(); 
    }
  };
  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      (e.target as HTMLInputElement).blur(); 
    }
  };
  return (
    <Stack spacing={3}>
      <Typography variant="h4" color="text.secondary">
        Informações Básicas
      </Typography>

      <TextField
        label="Título"
        fullWidth
        variant="outlined"
        placeholder="João da Silva"
        InputLabelProps={{ shrink: true }}
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        onKeyDown={handleNameKeyDown} 
        slotProps={{
            htmlInput: { 
                enterKeyHint: 'next' 
            }
        }}
      />

      <TextField
        label="E-mail"
        fullWidth
        variant="outlined"
        placeholder="e.g. john@gmail.com"
        InputLabelProps={{ shrink: true }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...emailRest} 
        
        inputRef={(e) => {
            emailRhfRef(e); 
            emailRef.current = e; 
        }}
        onKeyDown={handleEmailKeyDown}

        slotProps={{
            htmlInput: { 
                enterKeyHint: 'done' 
            }
        }}
      />

      <Controller
        name="active"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <IOSSwitch
                checked={field.value}
                onChange={field.onChange}
              />
            }
            label={
              <Typography variant="body2" color="text.primary">
                Ativar ao criar
              </Typography>
            }
            sx={{
              marginLeft: 0,
              gap: '9px',
              '& .MuiFormControlLabel-label': { marginLeft: 0 }
            }}
          />
        )}
      />
    </Stack>
  );
};
export const ProfessionalInfoStep = () => {
  const { register, control, formState: { errors } } = useFormContext<ColaboradorSchemaType>();

  // Estados para listas dinâmicas
  const [departments, setDepartments] = useState<Department[]>([]);
  const [managers, setManagers] = useState<Employee[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Carregar Departamentos e Possíveis Gestores
  useEffect(() => {
    const loadData = async () => {
      try {
        const [depts, employeesResult] = await Promise.all([
          DepartmentService.getAll(),
          EmployeeService.getAll({ pageSize: 100 }) 
        ]);

        setDepartments(depts);
        
        const gestores = employeesResult.data.filter(emp => emp.seniority === Seniority.GESTOR);
        setManagers(gestores);

      } catch (error) {
        console.error("Erro ao carregar dados profissionais:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  if (loadingData) {
    return <Stack alignItems="center" py={4}><CircularProgress /></Stack>;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h6" color="text.secondary">
        Informações Profissionais
      </Typography>

      {/* --- CARGO --- */}
      <TextField
        label="Cargo"
        fullWidth
        placeholder="Ex: Desenvolvedor Full Stack"
        InputLabelProps={{ shrink: true }}
        {...register('role')}
        error={!!errors.role}
        helperText={errors.role?.message}
      />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        
        {/* --- DEPARTAMENTO (Dinâmico) --- */}
        <Controller
            name="departmentId"
            control={control}
            defaultValue=""
            render={({ field }) => (
            <FormControl fullWidth error={!!errors.departmentId}>
                <InputLabel id="dept-label">Departamento</InputLabel>
                <Select
                    {...field}
                    labelId="dept-label"
                    label="Departamento"
                >
                <MenuItem value="" disabled>Selecione...</MenuItem>
                {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                    </MenuItem>
                ))}
                </Select>
                {errors.departmentId && (
                <FormHelperText>{errors.departmentId.message}</FormHelperText>
                )}
            </FormControl>
            )}
        />

        {/* --- SENIORIDADE (Enum) --- */}
        <Controller
            name="seniority"
            control={control}
            defaultValue={Seniority.JUNIOR} // Valor padrão seguro
            render={({ field }) => (
            <FormControl fullWidth error={!!errors.seniority}>
                <InputLabel id="seniority-label">Nível Hierárquico</InputLabel>
                <Select
                    {...field}
                    labelId="seniority-label"
                    label="Nível Hierárquico"
                >
                {Object.values(Seniority).map((level) => (
                    <MenuItem key={level} value={level}>
                    {level}
                    </MenuItem>
                ))}
                </Select>
                {errors.seniority && (
                <FormHelperText>{errors.seniority.message}</FormHelperText>
                )}
            </FormControl>
            )}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        
        {/* --- DATA DE ADMISSÃO --- */}
        <TextField
            label="Data de Admissão"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('admissionDate')}
            error={!!errors.admissionDate}
            helperText={errors.admissionDate?.message}
        />

        {/* --- SALÁRIO BASE --- */}
        <TextField
            label="Salário Base"
            fullWidth
            type="number"
            placeholder="0,00"
            InputLabelProps={{ shrink: true }}
            {...register('baseSalary')}
            error={!!errors.baseSalary}
            helperText={errors.baseSalary?.message}
            slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                }
            }}
        />
      </Stack>

      {/* --- GESTOR RESPONSÁVEL --- */}
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
                <em>Sem gestor (ou definir depois)</em>
              </MenuItem>
              {managers.map((manager) => (
                <MenuItem key={manager.id} value={manager.id}>
                  {manager.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
                {errors.managerId ? errors.managerId.message : "Selecione um colaborador com nível de Gestor"}
            </FormHelperText>
          </FormControl>
        )}
      />

    </Stack>
  );
};