import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function AlertDialog({ datos,siguiente }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary mr-1 boton" onClick={handleClickOpen}>Finalizar Registro</button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{datos.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {datos.texto}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button type="button" className="btn btn-primary mr-1 boton" onClick={handleClose}>Cancelar</button>
          <button type="button" className="btn btn-primary mr-1 boton" onClick={ () => window.location.href = '/'}>Aceptar</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}