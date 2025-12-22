import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { useState, useEffect } from 'react';
import type { Department } from '../../types';
import { DepartmentService } from '../../services/DepartamentService';


interface MigrationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (targetDeptId: string) => void;
  removedCount: number;
  currentDeptId: string; // Para não mostrar o próprio departamento na lista
}

export const MigrationDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  removedCount,
  currentDeptId 
}: MigrationDialogProps) => {
  const [targetId, setTargetId] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    if (open) {
      DepartmentService.getAll().then(data => {
        setDepartments(data.filter(d => d.id !== currentDeptId));
      });
    }
  }, [open, currentDeptId]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Movimentação Necessária</DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <DialogContentText sx={{ mb: 3 }}>
          Você removeu <strong>{removedCount} colaborador(es)</strong> deste departamento. 
          Como eles não podem ficar sem departamento, selecione para onde eles devem ser transferidos.
        </DialogContentText>
        
        <FormControl fullWidth>
          <InputLabel id="target-dept-label">Novo Departamento</InputLabel>
          <Select
            labelId="target-dept-label"
            label="Novo Departamento"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          >
            {departments.map(dept => (
              <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button 
          onClick={() => onConfirm(targetId)} 
          variant="contained" 
          disabled={!targetId}
        >
          Confirmar e Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};