import { Box, Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, useTheme, useMediaQuery } from '@mui/material';

interface StepSidebarProps {
  activeStep: number;
  steps: string[];
}

export const StepSidebar = ({ activeStep, steps }: StepSidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ height: isMobile ? 'auto' : '100%', width: isMobile ?'100%' :'auto'   }}>
      <Stepper 
        activeStep={activeStep} 
        orientation={isMobile ? "horizontal" : "vertical"}
        connector={isMobile ? undefined : (
            <StepConnector 
                sx={{
                    [`& .${stepConnectorClasses.line}`]: {
                        minHeight: '104px', 
                        borderColor: 'divider', 
                        borderLeftWidth: '2px', 
                    },
                }}
            />
        )}
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