import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Imports de Componentes
import { StepSidebar } from '../components/add_employee/StepSidebar';
import { FormActions } from '../components/add_employee/FormActions';
import { DeptBasicInfoStep, DeptPeopleStep } from '../components/add_department/DeptFormSteps';

// Imports de Lógica
import { departmentSchema } from '../schema';
import { DepartmentService } from '../services/DepartamentService';
import { FormHeader } from '../components/core/FormHeader';

const steps = ['Dados do Dept.', 'Membros'];

export const AddDepartmentPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      managerId: '',
      memberIds: [] as string[]
    },
    mode: 'all'
  });

  const progress = activeStep === 0 ? 0 : 50;

  const handleNext = async () => {
    let isValid = false;

    if (activeStep === 0) {
      isValid = await methods.trigger(['name']);
    } else if (activeStep === 1) {
      isValid = await methods.trigger(['managerId', 'memberIds']);
    }

    if (isValid) {
      if (activeStep === steps.length - 1) {
        await handleSubmit();
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const data = methods.getValues();
    setIsSubmitting(true);

    try {

      await DepartmentService.create(
        { 
          name: data.name, 
          managerId: data.managerId || undefined 
        }, 
        data.memberIds 
      );

      enqueueSnackbar('Departamento criado e colaboradores atualizados!', { variant: 'success' });
      navigate('/departamentos');

    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erro ao criar departamento.', { variant: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', my: '12px' }}>
        
        <FormHeader 
      progress={progress}
      parentLabel="Departamentos"
      parentPath="/departamentos"
      title={"Cadastrar Departamento"} 
    />

        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '10px', md: '40px' },
            width: '100%',
            mt: {xs: '20px', md:'39px'},
            flex: { xs: 1, md: 'none' },
        }}>
          <Box sx={{
              height: { md:'440px'},
              display: 'flex',
              alignItems: 'flex-start',
              flexShrink: 0,
              mb: {xs: '15px'},
          }}>
            <StepSidebar activeStep={activeStep} steps={steps} />
          </Box>

          <Box sx={{
             flex: 1,
             height: { xs: 'auto', md: '440px' },
             minWidth: 0,
             display: 'flex',
             flexDirection: 'column',
          }}>
            <Paper elevation={0} sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'transparent',
            }}>
              <Box sx={{ flex: 1 }}>
                {activeStep === 0 && <DeptBasicInfoStep />}
                {activeStep === 1 && <DeptPeopleStep />}
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <FormActions
                  activeStep={activeStep}
                  totalSteps={steps.length}
                  isLoading={isSubmitting}
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