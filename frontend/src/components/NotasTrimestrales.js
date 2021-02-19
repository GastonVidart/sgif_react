import React, { useState, useEffect } from "react";

import DenseTable from "./Table"
import AlertDialog from './Alerts'

import tAltaCurso from '../services/alta-curso'

const columns = [
    { id: 'nombre', label: 'Nombre', minWidth: 100 },
    { id: 'apellido', label: 'Apellido', minWidth: 100 },
    { id: 'legajo', label: 'Legajo', minWidth: 100 },
    { id: 'nota', label: 'Nota', minWidth: 100 },
    { id: 'asistencia', label: 'Asistencia(%)', minWidth: 100 },
    { id: 'rindeExamen', label: 'Rindió Examen Final', minWidth: 100 },
];

const alumnosDB = [
    {fullname:"Maxi Ceballos", legajo: "fai1516", nota: "7", asistencia: "80", rindeExamen: "si"}
]



export default function NotasTrimestrales() {
    const [trimestre, setTrimestre] = useState()

    const [cursos, setCursos] = useState([])
    const [cursoSelected, setCursoSelected] = useState([])

    const [dictados, setDictados] = useState([])
    const [dictadoSelected, setDictadoSelected] = useState([])

    const [alumnos, setAlumnos] = useState([])
    const [alertSalir, setAlertSalir] = useState({title:'Desea finalizar el registro?', texto: 'Si finaliza el registro se guardarán los cambios realizados hasta el momento.'})

    useEffect(() => {
       
        tAltaCurso(`http://localhost:5000/notas-trimestrales/cursos?trimestre=${trimestre}`, { method: "GET" })
        .then( v => {
            if (v.ok) {
                
                setCursos(v.response)
            }
        })


    }, [trimestre])

    useEffect(() => {
        tAltaCurso(`http://localhost:5000/notas-trimestrales/curso/detalle?cursoID=${cursoSelected}`, { method: "GET" })
        .then( v => {
            if (v.ok) {
                setDictados(v.response.dictados)
                setAlumnos(v.response.alumnos)
            }
        })
    }, [cursoSelected])

    useEffect(() => {
        alumnos.length > 0 && alumnos.map( (opc,i) => {
            tAltaCurso(`http://localhost:5000/notas-trimestrales/dictado/alumno?dictadoID=${dictadoSelected}&alumnoID=${opc._id}`, { method: "GET" })
            .then( v => {
                if (v.ok) {
                    if (v.response) {
                        alumnos[i].asistencia = '+75'
                    } else {
                        alumnos[i].asistencia = '-75'
                    }
                    console.log("asistencia",alumnos);
                }
            })
        })
    }, [dictadoSelected])

    return (
        <div className="col" role="main">

            {/*< !--Sub - Header Página-- >*/}
            < div className="row m-3 no-gutters justify-content-md-between align-items-center" >
                <div className="pl-3 rounded-lg contTitulo">
                    <h2 className="m-0 titulo">Registrar Notas</h2>
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
                                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="anio">Trimestre</label>
                                                    <div className="col col-md-4">
                                                        <input type="number" id="trimestre" name="trimestre" className="form-control" onChange={(e) => setTrimestre(e.target.value)}
                                                            required min={"1"} max={"3"} aria-labelledby="etiq_anio" aria-required="true" />
                                                    </div>
                                                </div>                                                    
                                            </div>
                                            <div className="col">
                                                <div className="form-group row no-gutters mb-2 align-items-center">
                                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="anio">Seleccionar Curso</label>
                                                    <div className="col col-md-4">
                                                        <select name="curso" id="curso" className="form-control" required aria-required="true"
                                                                onChange={ e => setCursoSelected(e.target.value)}
                                                                >
                                                                    <option value="N/A">N/A</option>
                                                                {cursos.length > 0 && cursos.map( (opc, i) => {
                                                                    return(
                                                                        <option value={opc._id}>{opc.anio}º - {opc.division}ª</option>
                                                                    )
                                                                })}
                                                        </select>
                                                    </div>
                                                </div>                                                    
                                            </div>
                                            <div className="col">
                                                <div className="form-group row no-gutters mb-2 align-items-center">
                                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_div" htmlFor="dni">Seleccionar Dictado</label>
                                                    <div className="col col-md-4">
                                                        <select name="curso" id="curso" className="form-control" required aria-required="true"
                                                                    onChange={ e => setDictadoSelected(e.target.value)}
                                                                >
                                                                    <option value="N/A">N/A</option>
                                                                    {dictados.length > 0 && dictados.map( (opc, i) => {
                                                                        return(
                                                                            <option value={opc._id}>{opc.materia.nombre}</option>
                                                                        )
                                                                    })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <DenseTable columns={columns} rows={ alumnos }/> 
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

