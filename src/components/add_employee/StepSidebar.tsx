import { Box, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';

interface StepSidebarProps {
  activeStep: number;
  steps: string[];
}

export const StepSidebar = ({ activeStep, steps }: StepSidebarProps) => {
  return (
    <Box sx={{ height: '100%' }}>
      <Stepper 
        activeStep={activeStep} 
        orientation="vertical"
        connector={
            <StepConnector 
                sx={{
                    // 1. Controla a Cor e Espessura da linha padrão
                    [`& .${stepConnectorClasses.line}`]: {
                        minHeight: '104px', // <--- DEFINE A DISTÂNCIA DE 120PX
                        borderColor: '#919EAB33', // Cor da linha (Divider)
                        borderLeftWidth: '2px', // Espessura
                    },
                    
                }}
            />
        }
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};