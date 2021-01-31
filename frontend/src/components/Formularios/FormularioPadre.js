import React from 'react';
import * as Icon from 'react-feather'

class FormularioPadre extends React.Component {
    constructor(props) {
        super(props);
        //TODO: incializar aca con lo que viene de props
        this.state = {
            campo: {
                dni: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese un DNI",
                    habilitado: true
                },
                tipoDni: {
                    valor: 'DNI',
                    valido: true,
                    msjError: "Seleccione un Tipo de DNI",
                    habilitado: true
                },
                nombre: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese el nombre",
                    habilitado: false
                },
                apellido: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese el apellido",
                    habilitado: false
                },
                genero: {
                    valor: '',
                    valido: false,
                    msjError: "Seleccione un género",
                    habilitado: false
                },
                email: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese un email",
                    habilitado: false
                },
                fechaNacimiento: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese la Fecha de Nacimiento",
                    habilitado: false
                },
                nacionalidad: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese la Nacionalidad",
                    habilitado: false
                },
                telefono: {
                    valor: '',
                    valido: true,
                    msjError: "Ingrese un Número de Tel.",
                    habilitado: false
                },
                ocupacion: {
                    valor: '',
                    valido: true,
                    msjError: "Fecha la Ocupación",
                    habilitado: false
                },
                lugarTrabajo: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese el Lugar de Trabajo",
                    habilitado: false
                },
                telefonoLaboral: {
                    valor: '',
                    valido: true,
                    msjError: "Ingrese un Tel. Laboral",
                    habilitado: false
                },
                emailLaboral: {
                    valor: '',
                    valido: true,
                    msjError: "Ingrese un email",
                    habilitado: false
                },
                partidaNacimiento: {
                    valor: '',
                    valido: true,
                    msjError: "Partida de Nacimiento Inválida",
                    habilitado: true,
                    nombre: 'Subir Partida de Nacimiento'
                },
                //TODO: ver si va valido y msj de error*/
                bautismo: {
                    valor: false,
                    habilitado: false
                },
                comunion: {
                    valor: false,
                    habilitado: false
                },
                confirmacion: {
                    valor: false,
                    habilitado: false
                },
                egresoPrimario: {
                    valor: false,
                    habilitado: false
                },
                egresoSecundario: {
                    valor: false,
                    habilitado: false
                },
                //TODO: ver si lo pongo en el form (componente) o en la barra de navegación o que se extraiga de ahi
                relacionParentesco: {
                    valor: '',
                    habilitado: false,
                    valido: true,
                    msjError: "Parentezco inválido",
                }
            },
            oidPadre: '',
            oidPersona: '',
            existePadre: false,
            padreCompleto: true, //Define si se esta creando un padre por completo, o solo el rol            
            //TODO: ver si la validacion se aplica a cada formulario o en gral
            validar: false,
            requeridos: ["dni", "nombre", "apellido", "genero", "email", "fechaNacimiento", "nacionalidad", "telefono"],

            //TODO: implementar spinner
            spinner: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    validarCampo(target) {
        const { id } = target;
        let validoAux = true;
        let validoHTML = target.checkValidity();

        if (validoHTML) {
            //Validación específica por campo
            //En cada case se debería cambiar el valor de validoAux, para condiciones adicionales
            switch (id) {
                /*case "dni":
                    //console.log("dni");
                    break;*/
                default:
                    //console.log("default");
                    break;
            }
        }
        return validoAux && validoHTML;
    }

    handleInputChange(event) {
        let valido, valorAux, campoAux
        let inputAux = {};
        const target = event.target;
        const { id, value, type } = target;

        console.log("Padre id input: ", id);

        valido = this.validarCampo(target);

        //Cambio Partida Nac
        if (id === "partidaNacimiento") {
            const archivo = target.files[0];
            if (archivo !== undefined) {
                valorAux = URL.createObjectURL(archivo);
                inputAux = {
                    nombre: archivo.name
                }
            } else {
                return;
            }
        } else {
            valorAux = type === "checkbox" ? target.checked : value;
        }
        this.setState(state => {
            campoAux = {
                ...state.campo[id],
                valor: valorAux,
                valido,
            }
            Object.assign(campoAux, inputAux);
            return {
                campo: {
                    ...state.campo,
                    [id]: campoAux
                }

            }
        })
    }

    render() {
        const { campo, spinner } = this.state;

        return (
            <div>
                {/*TODO: padre/madre */}
                <h4 className="card-title my-2 titSeccion" id="datos_alumno ">Datos Padre</h4>
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
                                            <div className={!spinner ? '' : 'd-none'}>
                                                Buscar
                                                <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-1" />
                                            </div>
                                            <div className={`spinner-border spinner-border-sm text-light my-1 ${spinner ? '' : 'd-none'}`} role="status">
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
                                                value={campo.dni.valor} onChange={this.handleInputChange}
                                                aria-labelledby="etiq_dni" aria-required="true"
                                            />
                                            <div className="invalid-feedback">
                                                {campo.dni.msjError}
                                            </div>
                                            <div className="input-group-append">
                                                <label className="d-none" id="etiq_tipo_dni" htmlFor="tipoDni">Tipo DNI</label>
                                                <select id="tipoDni" name="tipoDni" className="form-control" required
                                                    value={campo.tipoDni.valor} onChange={this.handleInputChange}
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
                                            value={campo.nombre.valor} onChange={this.handleInputChange}
                                            aria-labelledby="etiq_nombre" disabled={!campo.nombre.habilitado} required aria-required="true" />
                                        <div className="invalid-feedback">
                                            {campo.nombre.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg  ml-lg-3">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_apellido" htmlFor="apellido">Apellido</label>
                                    <div className="col-sm">
                                        <input type="text" className="form-control" id="apellido" name="apellido"
                                            value={campo.apellido.valor} onChange={this.handleInputChange} aria-labelledby="etiq_apellido"
                                            disabled={!campo.apellido.habilitado} required aria-required="true" />
                                        <div className="invalid-feedback">
                                            {campo.apellido.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-xl-4">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_genero" htmlFor="genero">Género</label>
                                    <div className="col-sm">
                                        <select id="genero" name="genero" className="form-control" required
                                            value={campo.genero.valor} onChange={this.handleInputChange}
                                            aria-labelledby="etiq_genero" aria-required="true" disabled={!campo.genero.habilitado}>
                                            <option value="Seleccione">Seleccione</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                        {/*TODO: agregar invalid feedback */}
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
                                            value={campo.fechaNacimiento.valor} onChange={this.handleInputChange}
                                            required aria-labelledby="etiq_fnac" aria-required="true" disabled={!campo.fechaNacimiento.habilitado} />
                                        <div className="invalid-feedback">
                                            {campo.fechaNacimiento.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg  ml-lg-3">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_lnac" htmlFor="nacionalidad">Nacionalidad</label>
                                    <div className="col-sm">
                                        <input type="text" id="nacionalidad" name="nacionalidad" className="form-control"
                                            value={campo.nacionalidad.valor} onChange={this.handleInputChange}
                                            required aria-labelledby="etiq_lnac" aria-required="true" disabled={!campo.nacionalidad.habilitado} />
                                        <div className="invalid-feedback">
                                            {campo.nacionalidad.msjError}
                                        </div>
                                        {/*TODO: poner breakpoint antes */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-lg">
                                <div className="form-group row no-gutters mb-2 ">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start requerido" id="etiq_email" htmlFor="email">Email</label>
                                    <div className="col-md">
                                        {/*aria-describedby="emailHelp"*/}
                                        <input type="email" id="email" name="email" className="form-control"
                                            value={campo.email.valor} onChange={this.handleInputChange}
                                            aria-labelledby="etiq_email" required aria-required="true" disabled={!campo.email.habilitado} />
                                        <div className="invalid-feedback">
                                            {campo.email.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg  ml-lg-3">
                                <div className="form-group row no-gutters align-items-center">
                                    <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="telefono">Teléfono</label>
                                    <div className="col-sm">
                                        <input type="text" id="telefono" name="telefono"
                                            className="form-control" required aria-required="true"
                                            value={campo.telefono.valor} onChange={this.handleInputChange} disabled={!campo.telefono.habilitado}
                                        />
                                        <div className="invalid-feedback">
                                            {campo.telefono.msjError}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-11 no-gutters px-3 mb-3 card shadow-sm">
                        <div className="row no-gutters">
                            <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_laborales">
                                <h5 className="card-title titSeccion" id="datos_laborales" >Datos Laborales</h5>
                                <div className="form-row">
                                    <div className="col-lg">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start" id="etiq_ocupacion" htmlFor="ocupacion">Ocupación</label>
                                            <div className="col-md">
                                                <input type="text" id="ocupacion" name="ocupacion" className="form-control"
                                                    value={campo.ocupacion.valor} onChange={this.handleInputChange}
                                                    aria-labelledby="etiq_ocupacion" disabled={!campo.ocupacion.habilitado} />
                                                <div className="invalid-feedback">
                                                    {campo.ocupacion.msjError}
                                                </div>
                                            </div>
                                        </div>
                                    </div><div className="col-lg  ml-lg-3">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_lugarTrabajo" htmlFor="lugarTrabajo">Lugar de Trabajo</label>
                                            <div className="col-md">
                                                <input type="text" id="lugarTrabajo" name="lugarTrabajo" className="form-control"
                                                    value={campo.lugarTrabajo.valor} onChange={this.handleInputChange}
                                                    aria-labelledby="etiq_lugarTrabajo" disabled={!campo.lugarTrabajo.habilitado} />
                                                <div className="invalid-feedback">
                                                    {campo.lugarTrabajo.msjError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col-auto px-3 py-1 my-1 mr-3" htmlFor="telefonoLaboral">Teléfono Laboral</label>
                                            <div className="col-sm">
                                                <input type="text" id="telefonoLaboral" name="telefonoLaboral"
                                                    className="form-control" value={campo.telefonoLaboral.valor}
                                                    onChange={this.handleInputChange} disabled={!campo.telefonoLaboral.habilitado}
                                                />
                                                <div className="invalid-feedback">
                                                    {campo.telefonoLaboral.msjError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg ml-lg-3">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_emailLaboral" htmlFor="emailLaboral">Email Laboral</label>
                                            <div className="col-md">
                                                <input type="email" id="emailLaboral" name="emailLaboral" className="form-control"
                                                    value={campo.emailLaboral.valor} onChange={this.handleInputChange}
                                                    aria-labelledby="etiq_emailLaboral" disabled={!campo.emailLaboral.habilitado} />
                                                <div className="invalid-feedback">
                                                    {campo.emailLaboral.msjError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col-11 no-gutters px-3 mb-3 card shadow-sm">
                        <div className="row no-gutters">
                            <div className="col-9 card-body pt-2 pb-0" role="group" aria-labelledby="datos_complementarios">
                                <h5 className="card-title titSeccion" id="datos_complementarios" >Datos Complementarios</h5>
                                <div className="form-row">
                                    <div className="col-lg">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_egresoPrimario" htmlFor="egresoPrimario">Egresó Primario de la institución</label>
                                            <input type="checkbox" id="egresoPrimario" name="egresoPrimario" className="checkbox"
                                                aria-labelledby="etiq_egresoPrimario" value={campo.egresoPrimario.valor} onChange={this.handleInputChange}
                                                disabled={!campo.egresoPrimario.habilitado} />
                                        </div>
                                    </div>
                                    <div className="col-lg ml-lg-3">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_egresoSecundario" htmlFor="egresoSecundario">Egresó Secundario de la institución</label>
                                            <input type="checkbox" id="egresoSecundario" name="egresoSecundario" className="checkbox"
                                                aria-labelledby="etiq_egresoSecundario" value={campo.egresoSecundario.valor} onChange={this.handleInputChange}
                                                disabled={!campo.egresoSecundario.habilitado} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    {/*TODO: ver separacion entre eltos, reducir */}
                                    <div className="col-lg">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_bautismo" htmlFor="bautismo">Bautismo</label>
                                            <input type="checkbox" id="bautismo" name="bautismo" className="checkbox"
                                                aria-labelledby="etiq_bautismo" value={campo.bautismo.valor} onChange={this.handleInputChange}
                                                disabled={!campo.bautismo.habilitado} />
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className=" px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_comunion" htmlFor="comunion">Comunión</label>
                                            <input type="checkbox" id="comunion" name="comunion" className="checkbox"
                                                aria-labelledby="etiq_comunion" value={campo.comunion.valor} onChange={this.handleInputChange}
                                                disabled={!campo.comunion.habilitado} />
                                        </div>
                                    </div>
                                    <div className="col-xl">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className=" px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_confirmacion" htmlFor="confirmacion">Confirmación</label>
                                            <input type="checkbox" id="confirmacion" name="confirmacion" className="checkbox"
                                                aria-labelledby="etiq_confirmacion" value={campo.confirmacion.valor} onChange={this.handleInputChange}
                                                disabled={!campo.confirmacion.habilitado} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-8">
                                        <div className="form-group row no-gutters mb-3 justify-content-center">
                                            {/*TODO: convertir para archivo primero hacer handle change*/}
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="partidaNacimiento"
                                                    aria-describedby="etiq_partidaNacimiento" onChange={this.handleInputChange}
                                                    disabled={!campo.partidaNacimiento.habilitado} />
                                                <label className="custom-file-label" id="etiq_partidaNacimiento" htmlFor="partidaNacimiento">
                                                    {campo.partidaNacimiento.nombre}
                                                </label>
                                                <div className="invalid-feedback">
                                                    {campo.partidaNacimiento.msjError}
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

export default FormularioPadre;