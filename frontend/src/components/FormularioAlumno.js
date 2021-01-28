import Sacramento from "./Sacramento";
import React from 'react';

import * as Icon from 'react-feather';

class FormularioAlumno extends React.Component {
    constructor(props) {
        super(props);
        this.idPaso = 0;
    }
    /*componentDidMount(){ sino hacerlo antes de este punto, que valide el navbar
        hacer validar fecha inscripción
        si no puede dar error, sino seguir
    }*/

    render() {
        //Control sobre si se tiene que mostrar o no esta parte del formulario        

        if (this.props.pasoActual !== this.idPaso) {
            return null;
        }

        const formulario = this.props.formulario;
        const campo = formulario.inputs;

        return (
            /*<!--Contenedor Derecha-->*/
            //TODO: subir al formulario principal?
            <div className="col" role="main">

                {/*< !--Sub - Header Página-- >*/}
                < div className="row m-3 no-gutters justify-content-sm-between align-items-center" >
                    <div className="pl-3 rounded-lg contTitulo">
                        <h2 className="m-0 titulo">Inscribir Alumno</h2>
                    </div>

                    {/* <!--BOTONES IFAZ-- > */}
                    <div className="d-flex justify-content-between ml-2 mt-2">
                        <button type="button" className="btn btn-primary mr-1 boton">Completar Familia</button>
                        <button type="button" className="btn btn-primary boton" onClick={this.props.pasoSiguiente}>
                            Continuar
                            <Icon.ArrowRight width={"1.3rem"} height={"1.3rem"} className="ml-1" />
                        </button>
                    </div>
                </div >

                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        {/* TODO: ver si subir al formulario principal? */}
                        <form className={formulario.validar ? "was-validated" : ""} noValidate>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_basicos">
                                    <h3 className="card-title mb-1 titSeccion" id="datos_basicos">Datos Básicos</h3>
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <div className="form-row">
                                                <div className="col-xl-8">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_dni" htmlFor="dni">DNI</label>
                                                        {/*className= "... ml-3 ..." */}
                                                        <div className="col-auto ml-md-3 mr-3 order-md-12">
                                                            <button type="button" className="btn btn-primary boton"
                                                                id="dni" aria-labelledby="etiq_dni" onClick={this.props.searchAlumno}>
                                                                Buscar
                                                                <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-1" />
                                                                {/*<div className="d-sm-block d-none">Buscar</div>
                                                                <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-md-1" />*/}
                                                            </button>

                                                            {/*<Notificacion />*/}
                                                        </div>
                                                        <div className="col-xs col-md">
                                                            <div className="input-group">
                                                                <input className="form-control" type="text" id="dni" name="dni"
                                                                    placeholder="Ingrese un Dni" alt="IngresoDni" required
                                                                    value={campo.dni.valor} onChange={this.props.handleInputChange}
                                                                    aria-labelledby="etiq_dni" aria-required="true"
                                                                />
                                                                <div className="invalid-feedback">
                                                                    {campo.dni.msjError}
                                                                </div>
                                                                <div className="input-group-append">
                                                                    <label className="d-none" id="etiq_tipo_dni" htmlFor="tipoDni">Tipo DNI</label>
                                                                    <select id="tipoDni" name="tipoDni" className="form-control" required
                                                                        value={campo.tipoDni.valor} onChange={this.props.handleInputChange}
                                                                        aria-labelledby="etiq_tipo_dni" aria-required="true" aria-expanded="false">
                                                                        <option value="DNI">DNI</option>
                                                                        <option value="LC">LC</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <div className="col-auto  mr-3 input-group">
                                                            <div className="input-group-prepend">
                                                                <span id="etiq_legajo" className="input-group-text">Legajo</span>
                                                            </div>
                                                            <input type="number" className="form-control" id="legajo" name="legajo"
                                                                value={campo.legajo.valor}
                                                                aria-labelledby="etiq_legajo" disabled />
                                                        </div>
                                                    </div>
                                                </div >
                                            </div>

                                            <div className="form-row">
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_nombre" htmlFor="nombre">Nombre</label>
                                                        <div className="col-sm">
                                                            <input type="text" className="form-control" id="nombre" name="nombre"
                                                                value={campo.nombre.valor} onChange={this.props.handleInputChange}
                                                                required aria-labelledby="etiq_nombre" aria-required="true" disabled={!campo.nombre.habilitado} />
                                                            <div className="invalid-feedback">
                                                                {campo.nombre.msjError}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_apellido" htmlFor="apellido">Apellido</label>
                                                        <div className="col-sm">
                                                            <input type="text" className="form-control" id="apellido" name="apellido"
                                                                value={campo.apellido.valor} onChange={this.props.handleInputChange}
                                                                required aria-labelledby="etiq_apellido" aria-required="true" disabled={!campo.apellido.habilitado} />
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
                                                                value={campo.genero.valor} onChange={this.props.handleInputChange}
                                                                aria-labelledby="etiq_genero" aria-required="true" disabled={!campo.genero.habilitado}>
                                                                <option value="Seleccione">Seleccione</option>
                                                                <option value="Masculino">Masculino</option>
                                                                <option value="Femenino">Femenino</option>
                                                            </select>
                                                            {/*TODO: agregar invalid feedback */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 ">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start requerido" id="etiq_email" htmlFor="email">Email</label>
                                                        <div className="col-md">
                                                            {/*aria-describedby="emailHelp"*/}
                                                            <input type="email" id="email" name="email" className="form-control"
                                                                value={campo.email.valor} onChange={this.props.handleInputChange}
                                                                aria-labelledby="etiq_email" required aria-required="true" disabled={!campo.email.habilitado} />
                                                            <div className="invalid-feedback">
                                                                {campo.email.msjError}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-row text-center">
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_fnac" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                                        <div className="col-sm">
                                                            <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control"
                                                                value={campo.fechaNacimiento.valor} onChange={this.props.handleInputChange}
                                                                required aria-labelledby="etiq_fnac" aria-required="true" disabled={!campo.fechaNacimiento.habilitado} />
                                                            <div className="invalid-feedback">
                                                                {campo.fechaNacimiento.msjError}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_lnac" htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
                                                        <div className="col-sm">
                                                            <input type="text" id="lugarNacimiento" name="lugarNacimiento" className="form-control"
                                                                value={campo.lugarNacimiento.valor} onChange={this.props.handleInputChange}
                                                                required aria-labelledby="etiq_lnac" aria-required="true" disabled={!campo.lugarNacimiento.habilitado} />
                                                            <div className="invalid-feedback">
                                                                {campo.lugarNacimiento.msjError}
                                                            </div>
                                                            {/*TODO: poner breakpoint antes */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 ml-3 d-flex align-items-center">
                                            <div className="form-group row no-gutters mb-2 justify-content-center">
                                                <img src={campo.foto.valor} className="img-thumbnail m-2"
                                                    alt="Foto Alumno" />
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="fotoAlumno"
                                                        aria-describedby="etiq_falumno" onChange={this.props.handleInputChange} disabled={!campo.foto.habilitado} />
                                                    <label className="custom-file-label" id="etiq_falumno" htmlFor="fotoAlumno">{formulario.nombreFoto}</label>
                                                    <div className="invalid-feedback">
                                                        {campo.foto.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col-9 card-body pt-2 pb-0" role="group" aria-labelledby="datos_escolares">
                                    <h3 className="card-title titSeccion" id="datos_escolares" >Datos Escolares</h3>
                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="fechaIngreso">Fecha de Ingreso</label>
                                                <div className="col-sm">
                                                    <input type="date" id="fechaIngreso" name="fechaIngreso" className="form-control"
                                                        value={campo.fechaIngreso.valor} onChange={this.props.handleInputChange}
                                                        required aria-required="true" disabled={!campo.fechaIngreso.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.fechaIngreso.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3" id="etiq_fegreso" htmlFor="fechaEgreso">Fecha de Egreso</label>
                                                <div className="col-sm">
                                                    <input type="date" id="fechaEgreso" name="fechaEgreso" className="form-control"
                                                        value={campo.fechaEgreso.valor} onChange={this.props.handleInputChange}
                                                        aria-labelledby="etiq_fegreso" disabled={!campo.fechaEgreso.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.fechaEgreso.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col px-3 py-1 my-1 mr-3 requerido" id="etiq_nescuela" htmlFor="nombreEscuelaAnt">Nombre Escuela Anterior</label>
                                                <div className="col-sm">
                                                    <input type="text" id="nombreEscuelaAnt" name="nombreEscuelaAnt" className="form-control"
                                                        value={campo.nombreEscuelaAnt.valor} onChange={this.props.handleInputChange}
                                                        required aria-labelledby="etiq_nescuela" aria-required="true" disabled={!campo.nombreEscuelaAnt.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.nombreEscuelaAnt.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col px-3 py-1 my-1 mr-3 requerido" id="etiq_acorresp" htmlFor="anioCorrespondiente">Año Correspondiente</label>
                                                <div className="col-sm">
                                                    <input type="number" id="anioCorrespondiente" name="anioCorrespondiente" className="form-control"
                                                        value={campo.anioCorrespondiente.valor} onChange={this.props.handleInputChange}
                                                        required min={"1"} max={"5"} aria-labelledby="etiq_acorresp" aria-required="true"
                                                        disabled={!campo.anioCorrespondiente.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.anioCorrespondiente.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="sacramentos">
                                    <h3 className="card-title titSeccion" id="sacramentos">Sacramentos</h3>
                                    {/* TODO: ver para que actualice dentro del arreglo sacramento
                                    * TODO: pasar estados sacramentos y funciones
                                    * value={this.state.alumno.fechaIngreso} onChange={this.handleInputChange} */}
                                    <Sacramento nombre={"Bautismo"} />
                                    <Sacramento nombre={"Comunión"} />
                                    <Sacramento nombre={"Confirmación"} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

export default FormularioAlumno;