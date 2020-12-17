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
    const [profesor, setProfesor] = React.useState('');
    const [materia, setMateria] = React.useState('');
    const [horario, setHorario] = React.useState('');
    const [programa, setPrograma] = React.useState('');
    const [filename, setFileName] = React.useState("Subir Programa");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        for (const property in dia) {
            if (dia[property]) {

                addRow(profesor, materia, property, horario, programa)
                break;
            }
        }
        setOpen(false);
    };


    // START checkbox
    const [dia, setDia] = React.useState({
        lunes: false,
        mates: false,
        miercoles: false,
        jueves: false,
        viernes: false,
    });



    const handleChange = (event) => {
        setDia({ ...dia, [event.target.name]: event.target.checked });
    };
    // END checkbox

    const shortRoute = (nameFile) => {
        let nameShort = nameFile.substring(12)
        setFileName(nameShort)
        setPrograma(nameShort)        
    }


    return (
        <div>
            <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-primary mr-1 boton" onClick={handleClickOpen}>Registrar Dictado</button>
            </div>
            <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Registro Dictado Nuevo</DialogTitle>
                <DialogContent>
                    <form className="was-validated">

                        <div className="form-row">
                            <div className="col">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="dni">Materia</label>
                                    <div className="col col-md-4">
                                        <input className="form-control" type="text" id="anio" name="anio"
                                            placeholder="Nombre Materia" alt="Año del curso" required
                                            onChange={e => setMateria(e.target.value)}
                                            aria-labelledby="etiq_anio" aria-required="true" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row" style={{ "marginTop": "10px" }}>
                            <div className="col">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="dni">Seleccione el día</label>
                                </div>
                                <div style={{ "marginLeft": "10px" }}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            label="Lunes"
                                            control={
                                                <Checkbox
                                                    checked={dia.lunes}
                                                    onChange={handleChange}
                                                    name="lunes"
                                                    color="primary"
                                                />
                                            }
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={dia.martes}
                                                    onChange={handleChange}
                                                    name="martes"
                                                    color="primary"
                                                />
                                            }
                                            label="Martes"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={dia.miercoles}
                                                    onChange={handleChange}
                                                    name="miercoles"
                                                    color="primary"
                                                />
                                            }
                                            label="Miercoles"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={dia.jueves}
                                                    onChange={handleChange}
                                                    name="jueves"
                                                    color="primary"
                                                />
                                            }
                                            label="Jueves"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={dia.viernes}
                                                    onChange={handleChange}
                                                    name="viernes"
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
                                            onChange={e => setHorario(e.target.value)}
                                        >
                                            <option value="8:00">8:00</option>
                                            <option value="9:00">9:00</option>
                                            <option value="10:00">10:00</option>
                                            <option value="11:00">11:00</option>
                                            <option value="12:00">12:00</option>
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
                                            onChange={e => setProfesor(e.target.value)}
                                        >
                                            <option value="Rafaela Mazu">Rafaela Mazu</option>
                                            <option value="Gabriela Aranda">Gabriela Aranda</option>
                                            <option value="Andrés Flores">Andrés Flores</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-lg-6 d-flex align-items-center">
                                <div className="form-group row no-gutters mb-2 justify-content-center">
                                    <div>
                                        <label className="custom-file-label" id="etiq_programa" htmlFor="programa">{filename}</label>
                                    </div>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="programa"
                                            aria-describedby="etiq_programa" onChange={e => shortRoute(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
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
