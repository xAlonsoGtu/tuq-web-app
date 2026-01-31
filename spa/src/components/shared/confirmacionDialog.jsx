import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmacionDialog({showDialog, titulo, descripcion, handleConfirmacion}) {

  const handleClose = () => {
    handleConfirmacion(false);
  };

  const handleAceptar = () => {
    handleConfirmacion(true);
  };

  return (
      <Dialog
        open={showDialog}
        onClose={handleClose}
        closeAfterTransition={false}
      >
        <DialogTitle>
          {titulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {descripcion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">Cancelar</Button>
          <Button onClick={handleAceptar} variant="outlined"  color="success">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
  );
}