import { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { StepSidebar } from '../components/add_employee/StepSidebar';
import { BasicInfoStep, ProfessionalInfoStep, } from '../components/add_employee/FormSteps';
import { FormActions } from '../components/add_employee/FormActions';
import { Seniority, Status } from '../types';
import { useUpdateEmployee } from '../hooks/useEmployees';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { colaboradorSchema } from '../schema';
import { useSnackbar } from 'notistack';
import { FormHeader } from '../components/core/FormHeader';

const steps = ['Infos Básicas', 'Infos Profissionais'];

export const UpdateEmployeePage = () => {
    const { id } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    // Hook de Update
    const { getColaborador, updateColaborador, loading } = useUpdateEmployee();
    const { enqueueSnackbar } = useSnackbar();
    const [fetchingData, setFetchingData] = useState(true);

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
    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            const data = await getColaborador(id);

            if (data) {
                methods.reset({
                    name: data.name,
                    email: data.email,
                    active: data.status === Status.ATIVO,
                    departmentId: data.departmentId,
                    role: data.role,
                    admissionDate: data.admissionDate,
                    seniority: data.seniority,
                    managerId: data.managerId || '',
                    baseSalary: data.baseSalary
                });
            } else {
                enqueueSnackbar('Colaborador não encontrado.', { variant: 'error' });
                navigate('/404');
            }
            setFetchingData(false);
        };

        loadData();
    }, [id]);

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
                    if (!id) return;

                    // --- 2. CHAMAR O MÉTODO DE UPDATE ---
                    await updateColaborador(id, {
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

                    enqueueSnackbar('Colaborador atualizado com sucesso!', {
                        variant: 'success'
                    });
                    navigate('/');

                } catch (error: any) {
                    console.error(error);
                    enqueueSnackbar('Erro ao atualizar. Tente novamente.', { variant: 'error' });
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

    if (fetchingData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }
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
                    title={"Editar Colaborador"}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: '10px', md: '40px' },
                        width: '100%',
                        mt: { xs: '20px', md: '39px' },
                        flex: { xs: 1, md: 'none' },
                    }}
                >
                    <Box
                        sx={{
                            height: { md: '440px' },
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexShrink: 0,
                            mb: { xs: '15px' },
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
