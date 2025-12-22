import { useState, useEffect } from 'react';
import { Box, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Componentes
import { StepSidebar } from '../components/add_employee/StepSidebar';
import { FormActions } from '../components/add_employee/FormActions';
import { DeptBasicInfoStep, DeptPeopleStep } from '../components/add_department/DeptFormSteps';
import { MigrationDialog } from '../components/add_department/MigrationDialog';

// Lógica
import { departmentSchema } from '../schema';
import { DepartmentService } from '../services/DepartamentService';
import { FormHeader } from '../components/core/FormHeader';

const steps = ['Dados do Dept.', 'Membros'];

export const UpdateDepartmentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [activeStep, setActiveStep] = useState(0);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estado para armazenar quem estava no departamento ORIGINALMENTE
    const [originalMemberIds, setOriginalMemberIds] = useState<string[]>([]);

    // Estados do Modal de Migração
    const [migrationDialogOpen, setMigrationDialogOpen] = useState(false);
    const [pendingRemovedIds, setPendingRemovedIds] = useState<string[]>([]);

    const methods = useForm({
        resolver: zodResolver(departmentSchema),
        defaultValues: {
            name: '',
            managerId: '',
            memberIds: [] as string[]
        },
        mode: 'all'
    });

    // --- CARREGAR DADOS ---
    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            try {
                const [dept, members] = await Promise.all([
                    DepartmentService.getById(id),
                    DepartmentService.getDepartmentMemberIds(id)
                ]);

                if (dept) {
                    methods.reset({
                        name: dept.name,
                        managerId: dept.managerId || '',
                        memberIds: members
                    });
                    setOriginalMemberIds(members); // Salva o estado inicial
                } else {
                    enqueueSnackbar('Departamento não encontrado.', { variant: 'error' });
                    navigate('/departamentos');
                }
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Erro ao carregar dados.', { variant: 'error' });
            } finally {
                setLoadingInitial(false);
            }
        };
        loadData();
    }, [id, navigate, methods, enqueueSnackbar]);

    const progress = activeStep === 0 ? 0 : 50;

    const handleNext = async () => {
        let isValid = false;
        if (activeStep === 0) isValid = await methods.trigger(['name']);
        else if (activeStep === 1) isValid = await methods.trigger(['managerId', 'memberIds']);

        if (isValid) {
            if (activeStep === steps.length - 1) {
                handlePreSubmit();
            } else {
                setActiveStep((prev) => prev + 1);
            }
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    // --- LÓGICA DE PRÉ-SUBMISSÃO (Verificar remoções) ---
    const handlePreSubmit = async () => {
        const currentMemberIds = methods.getValues('memberIds') || [];

        // Calcula quem foi removido (Estava no original, mas não está no atual)
        const removedIds = originalMemberIds.filter(id => !currentMemberIds.includes(id));

        if (removedIds.length > 0) {
            // Se removeu alguém, precisamos perguntar para onde vão
            setPendingRemovedIds(removedIds);
            setMigrationDialogOpen(true);
        } else {
            // Se não removeu ninguém (só manteve ou adicionou), salva direto
            await executeSave([], '');
        }
    };

    // --- SALVAR DEFINITIVO ---
    const executeSave = async (removedIds: string[], targetDeptId: string) => {
        if (!id) return;
        setIsSubmitting(true);
        const data = methods.getValues();

        // CORREÇÃO AQUI: Adicionado '|| []'
        const currentMemberIds = data.memberIds || [];

        // Calcula quem foi adicionado (Não estava no original, mas está no atual)
        const addedIds = currentMemberIds.filter(mid => !originalMemberIds.includes(mid));
        try {
            await DepartmentService.updateWithMemberManagement(
                id,
                { name: data.name, managerId: data.managerId || undefined },
                addedIds,
                removedIds,
                targetDeptId
            );

            enqueueSnackbar('Departamento atualizado com sucesso!', { variant: 'success' });
            navigate('/departamentos');
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Erro ao atualizar departamento.', { variant: 'error' });
        } finally {
            setIsSubmitting(false);
            setMigrationDialogOpen(false);
        }
    };

    if (loadingInitial) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    }

    return (
        <FormProvider {...methods}>
            <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', my: '12px' }}>

                      <FormHeader 
                      progress={progress}
                      parentLabel="Departamentos"
                      parentPath="/departamentos"
                      title={"Editar Departamento"} 
                    />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: '10px', md: '40px' },
                    width: '100%',
                    mt: { xs: '20px', md: '39px' },
                    flex: { xs: 1, md: 'none' },
                }}>
                    <Box sx={{
                        height: { md: '440px' },
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexShrink: 0,
                        mb: { xs: '15px' },
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

                {/* MODAL DE MIGRAÇÃO */}
                <MigrationDialog
                    open={migrationDialogOpen}
                    onClose={() => setMigrationDialogOpen(false)}
                    onConfirm={(targetId) => executeSave(pendingRemovedIds, targetId)}
                    removedCount={pendingRemovedIds.length}
                    currentDeptId={id || ''}
                />

            </Box>
        </FormProvider>
    );
};