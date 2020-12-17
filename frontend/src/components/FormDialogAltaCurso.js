import React from 'react';

import Button from '@material-ui/core/Button';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import addRow from './TableDictados'

export default function FormDialog({ addRow }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    addRow('Maxi','filosofia', 'Viernes', '8:00', 'prog_Fil2020')
    setOpen(false);
  };



    // START checkbox
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    // END checkbox
  

  return (
    <div>
      <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-primary mr-1 boton" onClick={handleClickOpen}>Registrar Dictado</button>
        </div>
      <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Registro Dictado Nuevo</DialogTitle>
        <DialogContent>
            <div className="form-row">
                <div className="col">
                    <div className="form-group row no-gutters mb-2 align-items-center">
                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="dni">Materia</label>
                        <div className="col col-md-4">
                            <input className="form-control" type="text" id="anio" name="anio"
                                placeholder="Nombre Materia" alt="Año del curso" required
                                // value={this.props.alumno.dni} onChange={this.props.handleInputChange}
                                aria-labelledby="etiq_anio" aria-required="true" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row" style={{"marginTop" : "10px"}}>
                <div className="col">
                    <div className="form-group row no-gutters mb-2 align-items-center">
                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="dni">Seleccione el día</label>
                    </div>
                    <div style={{"marginLeft" : "10px"}}>
                        <FormGroup row>
                            <FormControlLabel
                                label="Lunes"
                                control={
                                    <Checkbox 
                                        checked={state.checkedA} 
                                        onChange={handleChange} 
                                        name="checkedA"
                                        color="primary" 
                                    />
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Martes"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedC}
                                        onChange={handleChange}
                                        name="checkedC"
                                        color="primary"
                                    />
                                }
                                label="Miercoles"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedD}
                                        onChange={handleChange}
                                        name="checkedD"
                                        color="primary"
                                    />
                                }
                                label="Jueves"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedE}
                                        onChange={handleChange}
                                        name="checkedE"
                                        color="primary"
                                    />
                                }
                                label="Viernes"
                            />
                        </FormGroup>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-sm">
                    <div className="form-group row no-gutters align-items-center">
                        <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="horario">Seleccionar Horario</label>
                        <div className="col-sm">
                            <select name="horario" id="horario" className="form-control" required aria-required="true"
                                // value={this.props.responsable.genero} onChange={this.props.handleInputChange}
                                >
                                <option value="nueve">9:00</option>
                                <option value="diez">10:00</option>
                                <option value="once">11:00</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-row">
                <div className="col-sm">
                    <div className="form-group row no-gutters align-items-center">
                        <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="profesor">Seleccionar Profesor</label>
                        <div className="col-sm">
                            <select name="profesor" id="profesor" className="form-control" required aria-required="true"
                                // value={this.props.responsable.genero} onChange={this.props.handleInputChange}
                                >
                                <option value="Seleccione">Rafaela Mazu</option>
                                <option value="Masculino">Gabriela Aranda</option>
                                <option value="Femenino">Andrés Flores</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-3 ml-3 d-flex align-items-center">
                <div className="form-group row no-gutters mb-2 justify-content-center">
                    <div>
                        <label className="custom-file-label" id="etiq_programaMat" htmlFor="programaMat">Subir Programa</label>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="programaMat"
                            aria-describedby="etiq_programaMat" onChange={null} 
                        />
                    </div>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
