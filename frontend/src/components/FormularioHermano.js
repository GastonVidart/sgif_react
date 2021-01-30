import React from 'react';
import * as Icon from 'react-feather'

class FormularioHermano extends React.Component {

    render() {
        const { formulario, handleInputChange } = this.props
        const campo = formulario.inputs        

        {/*TODO: implementar cambio de componente*/ }

        return (
            <div>
                {/*TODO: padre/madre */}
                <h4 className="card-title my-2 titSeccion" id="datos_alumno ">Datos Hermano</h4>
                <div className="row no-gutters">
                    <div className="col-11">
                        <div className="form-row">
                            <div className="col-xl-8">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_dni" htmlFor="dni">DNI</label>
                                    {/*className= "... ml-3 ..." */}
                                    <div className="col-auto ml-md-3 mr-3 order-md-12">
                                        <button type="button" className="btn btn-primary boton"
                                            id="dni" aria-labelledby="etiq_dni" onClick={this.props.search}>
                                            <div className={!formulario.spinner ? '' : 'd-none'}>
                                                Buscar
                                                <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-1" />
                                            </div>
                                            <div className={`spinner-border spinner-border-sm text-light my-1 ${formulario.spinner ? '' : 'd-none'}`} role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            {/*<div className="d-sm-block d-none">Buscar</div>
                                            <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-md-1" />*/}
                                        </button>

                                        {/*<Notificacion />*/}
                                    </div>
                                    <div className="col-xs col-md">
                                        <div className="input-group">
                                            <input className="form-control" type="text" id="dni" name="dni"
                                                placeholder="Ingrese un Dni" alt="IngresoDni" required
                                                value={campo.dni.valor} onChange={handleInputChange}
                                                aria-labelledby="etiq_dni" aria-required="true"
                                            />
                                            <div className="invalid-feedback">
                                                {campo.dni.msjError}
                                            </div>
                                            <div className="input-group-append">
                                                <label className="d-none" id="etiq_tipo_dni" htmlFor="tipoDni">Tipo DNI</label>
                                                <select id="tipoDni" name="tipoDni" className="form-control" required
                                                    value={campo.tipoDni.valor} onChange={handleInputChange}
                                                    aria-labelledby="etiq_tipo_dni" aria-required="true" aria-expanded="false">
                                                    <option value="DNI">DNI</option>
                                                    <option value="LC">LC</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-lg">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_nombre" htmlFor="nombre">Nombre</label>
                                    <div className="col-sm">
                                        <input type="text" className="form-control" id="nombre" name="nombre"
                                            value={campo.nombre.valor} onChange={handleInputChange}
                                            aria-labelledby="etiq_nombre" disabled={!campo.nombre.habilitado} required aria-required="true" />
                                        <div className="invalid-feedback">
                                            {campo.nombre.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg ml-lg-3">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_apellido" htmlFor="apellido">Apellido</label>
                                    <div className="col-sm">
                                        <input type="text" className="form-control" id="apellido" name="apellido"
                                            value={campo.apellido.valor} onChange={handleInputChange} aria-labelledby="etiq_apellido"
                                            disabled={!campo.apellido.habilitado} required aria-required="true" />
                                        <div className="invalid-feedback">
                                            {campo.apellido.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-lg">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_genero" htmlFor="genero">Género</label>
                                    <div className="col-sm">
                                        <select id="genero" name="genero" className="form-control" required
                                            value={campo.genero.valor} onChange={handleInputChange}
                                            aria-labelledby="etiq_genero" aria-required="true" disabled={!campo.genero.habilitado}>
                                            <option value="Seleccione">Seleccione</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                        {/*TODO: agregar invalid feedback */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg ml-lg-3">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_fnac" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                    <div className="col-sm">
                                        <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control"
                                            value={campo.fechaNacimiento.valor} onChange={handleInputChange}
                                            required aria-labelledby="etiq_fnac" aria-required="true" disabled={!campo.fechaNacimiento.habilitado} />
                                        <div className="invalid-feedback">
                                            {campo.fechaNacimiento.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-11 no-gutters px-3 mb-3 mt-2 card shadow-sm">
                        <div className="row no-gutters">
                            <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_academicos">
                                <h5 className="card-title titSeccion" id="datos_academicos" >Datos Académicos</h5>
                                <div className="form-row">
                                    <div className="col-lg">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start" id="etiq_escuela" htmlFor="escuelaActual">Escuela</label>
                                            <div className="col-md">
                                                <input type="text" id="escuelaActual" name="escuelaActual" className="form-control"
                                                    value={campo.escuelaActual.valor} onChange={handleInputChange}
                                                    aria-labelledby="etiq_escuela" disabled={!campo.escuelaActual.habilitado} />
                                                <div className="invalid-feedback">
                                                    {campo.escuelaActual.msjError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg ml-lg-3">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col-auto px-3 py-1 my-1 mr-3" id="etiq_grado" htmlFor="grado">Grado</label>
                                            <div className="col-sm">
                                                <input type="number" id="grado" name="grado" className="form-control"
                                                    value={campo.grado.valor} onChange={this.props.handleInputChange}
                                                    min={"1"} max={"5"} aria-labelledby="etiq_grado"
                                                    disabled={!campo.grado.habilitado} />
                                                <div className="invalid-feedback">
                                                    {campo.grado.msjError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default FormularioHermano;