import React, {useEffect, useState} from "react";

import DenseTable from "./Table"
import FormDialog from './FormDialogAltaCurso'
import AlertDialog from './Alerts'

import tAltaCurso from '../services/alta-curso'

const cols = [
    { id: 'profesor', label: 'Profesor', minWidth: 170 },
    { id: 'materia', label: 'Materia', minWidth: 100 },
    {
      id: 'dia',
      label: 'Dia',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'horario',
      label: 'Horario',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'programa',
      label: 'Programa',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
];

function AltaCurso(){
    const [dictado, setDictado] = useState([])
    const [columns, setColumns] = useState(cols)
    
    const [alertSalir, setAlertSalir] = useState({title:'Desea finalizar el registro?', texto: 'Si finaliza el registro se guardarán los cambios realizados hasta el momento.'});
    
    const [division, setDivision] = useState('');
    
    const [preceptor, setPreceptor] = useState([]);
    const [preceptorSelected, setPreceptorSelected] = useState();
    
    const [materias, setMaterias] = useState([]);
    const [horarios, setHorarios] = useState([])
    const [curso, setCurso] = useState()

    const [anio, setAnio] = useState(0)
    useEffect(() => {
        setDictado([]);
        tAltaCurso(`http://localhost:5000/alta-curso?anio=${anio}`, { method: "POST" })
        .then( v => {
            if (v.ok) {
                setDivision(v.response.curso.division);
                setMaterias([...v.response.materias]);
                setCurso(v.response.curso);
                setHorarios([...v.response.horarios]);
            } else {
                setDivision('');
            }})
    }, [anio])

    useEffect(() => {
        tAltaCurso(`http://localhost:5000/alta-curso/preceptor?anio=${anio}`, { method: "GET" })
        .then( v => {
            if (v.ok) {
                let preceptorDB = v.response.preceptor ? v.response.preceptor : [];
                setPreceptor([...preceptorDB]);
            } else {
                setPreceptor([]);
            }})
    }, [anio])


    return (
        <div className="col" role="main">

            {/*< !--Sub - Header Página-- >*/}
            < div className="row m-3 no-gutters justify-content-md-between align-items-center" >
                <div className="pl-3 rounded-lg contTitulo">
                    <h2 className="m-0 titulo">Registrar Curso</h2>
                </div>

                {/* <!--BOTONES IFAZ-- > */}
                <div className="d-flex justify-content-between">
                    <AlertDialog datos={alertSalir}/>
                </div>
            </div >

            {/* < !--Formulario--> */}
            <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                <div className="col">

                    <form>
                        {/* <!--shadow-sm--> */}
                        <div className="row no-gutters px-3 mb-3 card shadow">
                            <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_basicos">
                                <div className="row no-gutters">
                                    <div className="col">
                                        <div className="form-row">
                                            <div className="col">
                                                <div className="form-group row no-gutters mb-2 align-items-center">
                                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="anio">Año</label>
                                                    <div className="col col-md-4">
                                                        <input type="number" id="anio" name="anio" className="form-control" onChange={(e) => setAnio(e.target.value)}
                                                            required min={"1"} max={"5"} aria-labelledby="etiq_anio" aria-required="true" />
                                                    </div>
                                                </div>                                                    
                                            </div>
                                            <div className="col">
                                                <div className="form-group row no-gutters mb-2 align-items-center">
                                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_div" htmlFor="dni">División</label>
                                                    <div className="col col-md-4">
                                                        <input type="number" id="anio" name="anio" className="form-control" value={division}
                                                                required min={"1"} max={"3"} aria-labelledby="etiq_div" aria-required="true" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-sm">
                                                <div className="form-group row no-gutters align-items-center">
                                                    <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="preceptor">Preceptor</label>
                                                    <div className="col-sm">
                                                        <select name="preceptor" id="preceptor" className="form-control" required aria-required="true"
                                                            onChange={ e => setPreceptorSelected(e.target.value)}
                                                        >
                                                            {preceptor.length > 0 && preceptor.map( (opc, i) => {
                                                                return(
                                                                    <option value={opc._id}>{opc.nombre} {opc.apellido}</option>
                                                                )
                                                            })}
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-lg">
                                                <div className="form-group row m-3 no-gutters justify-content-md-between align-items-center">
                                                    <label className="col-auto px-3 py-1 my-1 mr-3">Dictados Ingresados</label>
                                                    <div className="d-flex justify-content-between">
                                                        <FormDialog materias={materias} horarios={horarios} addRow={(profe, materia, dia, hora, programa) => {
                                                            let horario = hora[1]
                                                            let profesor = profe[1] + ' ' + profe[2]
                                                            setDictado([...dictado, {profesor, materia, dia, horario, programa}])
                                                            tAltaCurso(`http://localhost:5000/alta-curso/dictado`, { 
                                                                method: 'POST', 
                                                                body: JSON.stringify({
                                                                    dictado: {
                                                                        cicloLectivo: 2020,
                                                                        programa: programa,
                                                                        idProfesor: profe[0],
                                                                        nombreMateria: materia,
                                                                        anioMateria: anio,
                                                                        horarios: hora[0],
                                                                        idCurso: curso._id,
                                                                        idPreceptor: preceptorSelected
                                                                    }
                                                                }),
                                                                headers:{
                                                                    'Content-Type': 'application/json'
                                                                }
                                                            })
                                                            .then( v => {
                                                                console.log('save API response ',v);
                                                            })
                                                            
                                                            }}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <DenseTable columns={columns} rows={dictado}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                    </form>
                </div>
            </div>
        </div >
    )
}

export default AltaCurso;