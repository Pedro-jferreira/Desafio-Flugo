import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StepSidebar } from '../components/add_employee/StepSidebar';
import { BasicInfoStep, ProfessionalInfoStep, } from '../components/add_employee/FormSteps';
import { FormActions } from '../components/add_employee/FormActions';
import { Seniority, Status } from '../types';
import { useAddEmployee } from '../hooks/useEmployees';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { colaboradorSchema } from '../schema';
import { useSnackbar } from 'notistack';
import { FormHeader } from '../components/core/FormHeader';

const steps = ['Infos Básicas', 'Infos Profissionais'];

export const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { addColaborador, loading } = useAddEmployee();
  const { enqueueSnackbar } = useSnackbar();

 const methods = useForm({
    resolver: zodResolver(colaboradorSchema),
    defaultValues: {
      name: '',
      email: '',
      active: true,
      departmentId: '',
      role: '',
      admissionDate: '',
      seniority: Seniority.JUNIOR, 
      managerId: '',
      baseSalary: 0
    },
    mode: 'all'
  });

  const progress = activeStep === 0 ? 0 : 50;

  const handleNext = async () => {
    let isValid = false;

    if (activeStep === 0) {
      isValid = await methods.trigger(['name', 'email']);
    } else if (activeStep === 1) {
     isValid = await methods.trigger([
        'departmentId', 
        'role', 
        'seniority', 
        'admissionDate', 
        'baseSalary'
      ]);
    }

    if (isValid) {
      if (activeStep === steps.length - 1) {
        const data = methods.getValues();

        try {
          await addColaborador({
       name: data.name,
            email: data.email,
            status: data.active ? Status.ATIVO : Status.INATIVO,
            departmentId: data.departmentId,
            role: data.role,
            seniority: data.seniority,
            admissionDate: data.admissionDate,
            managerId: data.managerId || undefined, 
            baseSalary: Number(data.baseSalary)
          });
          enqueueSnackbar('Colaborador cadastrado com sucesso!', {
            variant: 'success'
          });
          navigate('/');

        } catch (error: any) {
          if (error.message === "EMAIL_DUPLICADO") {
            setActiveStep(0);
            methods.setError('email', {
              type: 'manual',
              message: 'Este e-mail já está cadastrado.'
            });
            enqueueSnackbar('Verifique os erros no formulário.', { variant: 'warning' });
          } else {
            console.error(error);
            enqueueSnackbar('Erro ao salvar. Tente novamente mais tarde.', {
              variant: 'error'
            });
          }
        }
      } else {
        setActiveStep((prev) => prev + 1);
      }
    } else {
      enqueueSnackbar('Verifique os erros no formulário.', { variant: 'warning' });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  return (
    <FormProvider {...methods} >

      <Box
        sx={{
          width: '100%',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          my: '12px',
        }}
      >
       <FormHeader 
            progress={progress}
            parentLabel="Colaboradores"
            parentPath="/"
            title={"Cadastrar Colaborador"} 
          />
      

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap:  { xs: '10px', md: '40px' },
            width: '100%',
            mt: {xs: '20px',md:'39px'},
            flex: { xs: 1, md: 'none' },
          }}
        >
          <Box
            sx={{
              height: { md:'440px'},
              display: 'flex',
              alignItems: 'flex-start',
              flexShrink: 0,
               mb: {xs: '15px'},
            }}
          >
            <StepSidebar activeStep={activeStep} steps={steps} />
          </Box>

          <Box
            sx={{
             flex: 1,
            height: { xs: 'auto', md: '440px' },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'transparent',
              }}
            >
              <Box sx={{ flex: 1 }}>
                {activeStep === 0 && (
                  <BasicInfoStep />
                )}
                {activeStep === 1 && (
                  <ProfessionalInfoStep />
                )}
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <FormActions
                  activeStep={activeStep}
                  totalSteps={steps.length}
                  isLoading={loading}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};
