import React from "react";

import DenseTable from "./TableDictados"
import FormDialog from './FormDialogAltaCurso'

import AlertDialog from './Alerts'

class AltaCurso extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dictado: {
                profesor:'',
                materia: '',
                dia: '',
                horario: '',
                programa: ''
            },
            alertSalir: {
                title: 'Desea finalizar el registro?',
                texto: 'Si finaliza el registro se guardarán los cambios realizados hasta el momento.'
            }
        }

        this.addRow = this.addRow.bind(this);
    }   

    addRow(profesor, materia, dia, horario, programa) {

        let dic = {
            profesor,
            materia,
            dia,
            horario,
            programa
        }
        this.setState({
            dictado: dic
        })
    }

    render() {

        const { dictado, alertSalir } = this.state

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
                                                            <input type="number" id="anio" name="anio" className="form-control"
                                                                // value={this.props.alumno.anioCorrespondiente} onChange={this.props.handleInputChange}
                                                                required min={"1"} max={"5"} aria-labelledby="etiq_anio" aria-required="true" />
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                                <div className="col">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_div" htmlFor="dni">División</label>
                                                        <div className="col col-md-4">
                                                            <input type="number" id="anio" name="anio" className="form-control"
                                                                    // value={this.props.alumno.anioCorrespondiente} onChange={this.props.handleInputChange}
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
                                                                // value={this.props.responsable.genero} onChange={this.props.handleInputChange}
                                                                >
                                                                <option value="Seleccione">Carlos</option>
                                                                <option value="Masculino">Sabrina</option>
                                                                <option value="Femenino">Juan</option>
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
                                                            <FormDialog addRow={this.addRow}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <DenseTable dictado={ dictado }/>
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
}

export default AltaCurso;