import { Box, Button } from '@mui/material';

interface FormActionsProps {
  activeStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isLoading?: boolean; 
}

export const FormActions = ({ 
  activeStep, 
  totalSteps, 
  onBack, 
  onNext,
  isLoading = false 
}: FormActionsProps) => {
  const isLastStep = activeStep === totalSteps - 1;
  const isFirstStep = activeStep === 0;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button
        disabled={isFirstStep || isLoading}
        onClick={onBack}
        variant="text"
        sx={{ 
          color: 'text.primary', 
        }}
      >
        Voltar
      </Button>

      <Button
      loading  = {isLoading}
        variant="contained"
        onClick={onNext}
        color="primary" 
        size="large"
           
    
      >
        {isLastStep ? 'Concluir' : 'Próximo'}
      </Button>
    </Box>
  );
};