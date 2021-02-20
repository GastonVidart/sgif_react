import React, {useEffect, useState} from 'react';

import tAltaCurso from '../services/alta-curso'

import Button from '@material-ui/core/Button';




import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DayCheckbox from './dayCheckBox';


export default function FormDialog({ materias, horarios, addRow }) {
    const [open, setOpen] = useState(false);
    const [profesores, setProfesores] = useState([]);
    
    const [profesor, setProfesor] = useState();
    const [materia, setMateria] = useState('');

    const [horario, setHorario] = useState();
    const [programa, setPrograma] = useState('');

    const [diaSelected, setDiaSelected] = useState();
    const [bloque, setBloque] = useState([]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        addRow(profesor, materia, diaSelected, horario, programa);

        setOpen(false);
    };

    useEffect(() => {
        tAltaCurso(`http://localhost:5000/alta-curso/profesor?materia=${materia}`, { method: "GET" })
        .then( v => {
            if (v.ok) {
                setProfesores([...v.response]);
            } else {
                setProfesores([]);
            }})
    }, [materia])


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
            <div className="form-row">
                <div className="col">
                    <div className="form-group row no-gutters mb-2 align-items-center">
                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="dni">Materia</label>
                        <div className="col col-md-4">
                        <select name="materia" id="materia" className="form-control" required aria-required="true"
                            onChange={(e) => setMateria(e.target.value)}>
                                <option value="N/A">N/A</option>
                            {materias.length > 0 && materias.map( (opc, i) => {
                                return(
                                    <option key={i}>{opc.nombre}</option>
                                )
                            })}
                        </select>
                        </div>
                    </div>
                </div>
            </div>

            <DayCheckbox horarios={horarios} upData={(bloque, dia) => {
                setBloque(bloque);
                setDiaSelected(dia);
            }}/>

            <div className="form-row">
                <div className="col-sm">
                    <div className="form-group row no-gutters align-items-center">
                        <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="horario">Seleccionar Horario</label>
                        <div className="col-sm">
                            <select name="horario" id="horario" className="form-control" required aria-required="true"
                                onChange={e => setHorario(e.target.value.split(','))}
                                >
                                <option value="N/A">N/A</option>
                                {bloque.length > 0 && bloque.map( (opc, i) => {
                                    return(
                                        <option key={i} value={[opc._id, opc.bloqueHorario.horaInicio]}>{opc.bloqueHorario.horaInicio}</option>
                                    )
                                })}
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
                                onChange={ e => setProfesor(e.target.value.split(','))}
                                >
                                <option value="N/A">N/A</option>
                                {profesores.length > 0 && profesores.map( opc => {
                                    return(
                                        <option value={ [opc._id, opc.nombre, opc.apellido] }>{opc.nombre} {opc.apellido}</option>
                                    )
                                })}
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
