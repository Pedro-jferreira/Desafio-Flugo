import { Controller, useFormContext } from "react-hook-form";
import type { ColaboradorSchemaType } from "../../schema";
import { FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { IOSSwitch } from "../core/IOSSwitch";
import { Department } from "../../types";
import { useRef } from "react";

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
  const { control, formState: { errors } } = useFormContext<ColaboradorSchemaType>();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" color="text.secondary">
        Informações Profissionais
      </Typography>

      <Controller
        name="department"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.department}>
            <InputLabel
              id="departamento-label"
              sx={{
                color: 'text.disabled',
                '&.Mui-focused': { color: 'primary.main' },
              }}
            >
              Selecione um departamento
            </InputLabel>

            <Select
              {...field} // Passa value, onChange, onBlur automaticamente
              labelId="departamento-label"
              label="Selecione um departamento"
            >
              <MenuItem value={Department.TI}>TI</MenuItem>
              <MenuItem value={Department.DESIGN}>Design</MenuItem>
              <MenuItem value={Department.MARKETING}>Marketing</MenuItem>
              <MenuItem value={Department.PRODUTO}>Produto</MenuItem>
            </Select>

            {errors.department && (
              <FormHelperText>{errors.department.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Stack>
  );
};