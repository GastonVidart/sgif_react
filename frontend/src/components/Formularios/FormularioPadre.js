import React from 'react';
import * as Icon from 'react-feather'
import { NoExistePadre, BadRequest, NoExistePersona } from '../../utils/Errores';

class FormularioPadre extends React.Component {
    constructor(props) {
        super(props);
        //TODO: incializar aca
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
                    valido: false,
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
                    habilitado: false,
                    nombre: 'Subir Partida de Nacimiento'
                },                
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
                relacionParentesco: {
                    valor: 'Padre',
                    habilitado: false,
                    valido: true,
                    msjError: "Parentezco inválido",
                }
            },
            oidPadre: '',
            oidPersona: '',
            existePadre: false,
            padreCompleto: true, //Define si se esta creando un padre por completo, o solo el rol                        
            validar: false,
            requeridos: ["dni", "nombre", "apellido", "genero", "email", "fechaNacimiento", "nacionalidad", "telefono"],
            booleanos: ["bautismo", "comunion", "confirmacion", "egresoPrimario", "egresoSecundario"],

            //TODO: implementar spinner
            spinner: false
        }

        this.urlBase = this.props.urlBase;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.esValido = this.esValido.bind(this);
        this.registrarPersona = this.registrarPersona.bind(this);
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
        let valido, valorAux, campoAux;
        let inputAux = {}
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

        //Manejo de genero
        if (id === 'genero') {
            this.setState(state => {
                return {
                    campo: {
                        ...state.campo,
                        relacionParentesco: {
                            ...state.campo.relacionParentesco,
                            valor: value === 'Masculino' ? 'Padre' : value === 'Femenino' ? 'Madre' : '',
                            valido: true
                        }
                    }

                }
            })
        }
    }

    searchPadre = async () => {
        const dniPadre = this.state.campo.dni.valor;
        console.log("Search Padre dni:", dniPadre);
        if (dniPadre === '') {
            //TODO:notif
            console.log("Dni Padre Vacío")
            return;
        }

        fetch(this.urlBase + '/padre/' + dniPadre)
            .then(response => {
                return response.json().then(data => {
                    if (response.status === 404) {
                        throw new NoExistePadre(data.message)
                    } else if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message)
                    }
                    return data;
                })
            })
            .then(data => {
                console.log("Padre Encontrado ", data);
                const datos = data.padre;
                this.setState(state => {
                    const campo = { ...state.campo };
                    Object.assign(campo, this.extraeDatosPadre(state, datos));
                    return {
                        campo,
                        existePadre: true,
                        oidPadre: data.padre._id
                    };
                })
            })
            .catch(err => {
                if (err instanceof NoExistePadre) {
                    //console.error("Padre: ", err);
                    fetch(this.urlBase + '/persona/' + dniPadre)
                        .then(response => {
                            return response.json().then(data => {
                                console.log("Status Search Persona Padre", response.status)
                                if (response.status === 404) {
                                    throw new NoExistePersona(data.message);
                                } else if (response.status === 400) {
                                    throw new BadRequest(data.message);
                                } else if (response.status === 500) {
                                    throw new Error(data.message);
                                }
                                return data;
                            })
                            //TODO: notif
                        }).then(data => {
                            console.log("Persona Encontrada ", data)
                            const datos = data.persona;
                            this.setState(function (state) {
                                const campo = { ...state.campo };
                                Object.assign(campo, this.reiniciarFormulario(state));
                                Object.assign(campo, this.extraeDatosPersona(state, datos));
                                return {
                                    campo,
                                    oidPersona: datos._id,
                                    padreCompleto: false,
                                    existePadre: false
                                };
                            })
                            //TODO: notif
                            console.log("Padre id Persona", this.state.oidPersona)
                        })
                        .catch(error => {
                            if (error instanceof NoExistePersona) {
                                //console.error("Padre - Persona: ", error)
                                console.log("Puede crear un padre nuevo")
                                this.setState(state => {
                                    const campo = { ...state.campo };
                                    Object.assign(campo, this.reiniciarFormulario(state));
                                    return {
                                        campo,
                                        padreCompleto: true,
                                        existePadre: false
                                    }
                                })
                                //TODO: notif
                            } else {
                                console.log("Error Buscar Padre: ", error)
                            }
                        })
                } else {
                    //TODO: notif
                    console.log("Error Buscar Padre: ", err)
                }
            })
    }

    esValido() {
        let datosPadre = Object.values(this.state.campo);
        const formValido = datosPadre.every(campo => {
            //console.log(campo, " valido? ", campo.valido)
            return campo.valido;
        })
        return formValido;
    }

    registrarPersona(oidAlumno) {
        const { existePadre, oidPadre, padreCompleto } = this.state;
        const estado = this.state;
        let idPadre;
        if (!existePadre) {
            //Tanto si es padre completo como rol, se crea de la misma manera
            console.log("Crea Padre", padreCompleto ? 'Completo' : 'Rol')
            idPadre = this.crearPadre(estado, padreCompleto, oidAlumno)
                .catch(err => {
                    console.log("Error en Crear Padre:", err.message);
                    //TODO:notif
                    return false;
                })

        } else if (existePadre) {
            console.log("El padre existe, se asocia con el alumno");
            idPadre = this.asociarPadre(oidPadre, oidAlumno)
                .catch(err => {
                    console.log("Error en Asociar Padre:", err.message);
                    //TODO:notif
                    return false;
                })
        }
        return idPadre;
    }

    async crearPadre(estado, esCompleto, oidAlumno) {
        let idPadre;
        const urlCompleto = '/padre';
        const urlRol = '/padre/persona/';
        let url;
        let metodo = 'PUT';
        let datos = {
            padre: {
                email: estado.campo.email.valor,
                fechaNacimiento: estado.campo.fechaNacimiento.valor,
                nacionalidad: estado.campo.nacionalidad.valor,
                telefono: estado.campo.telefono.valor,
                ocupacion: estado.campo.ocupacion.valor,
                lugarTrabajo: estado.campo.lugarTrabajo.valor,
                telefonoLaboral: estado.campo.telefonoLaboral.valor,
                emailLaboral: estado.campo.emailLaboral.valor,
                partidaNacimiento: estado.campo.partidaNacimiento.valor,
                bautismo: estado.campo.bautismo.valor,
                comunion: estado.campo.comunion.valor,
                confirmacion: estado.campo.confirmacion.valor,
                egresoPrimario: estado.campo.egresoPrimario.valor,
                egresoSecundario: estado.campo.egresoSecundario.valor,
                relacionParentesco: estado.campo.relacionParentesco.valor
            },
            oidAlumno
        }

        if (esCompleto) {
            url = this.urlBase + urlCompleto;
            metodo = 'POST';
            const persona = {
                padre: {
                    dni: estado.campo.dni.valor,
                    nombre: estado.campo.nombre.valor,
                    apellido: estado.campo.apellido.valor,
                    genero: estado.campo.genero.valor,
                }
            }
            Object.assign(datos.padre, persona.padre);
        } else {
            url = this.urlBase + urlRol + estado.oidPersona;
        }
        console.log("datos enviados", datos)
        idPadre = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(response => {
                //Si es necesario se pueden agregar errores personalizados segun el tipo de creacion
                return response.json().then(data => {
                    if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 404) {
                        throw new NoExistePersona(data.message)
                    } else if (response.status === 500) {
                        throw new Error(data.message)
                    }
                    return data;
                });
            })
            .then(data => {
                console.log("Respuesta Creación Padre ", esCompleto ? 'Completo' : 'Rol', data)
                if (data.response.padre.hasOwnProperty("_id")) {
                    return data.response.padre._id;
                } else {
                    throw new Error("Crear padre respondio sin oid");
                }
            })
        return idPadre;
    }

    async asociarPadre(oidPadre, oidAlumno) {
        let params = new URLSearchParams('');
        params.append("oidAlumno", oidAlumno);
        var url = `${this.urlBase}/asociar-padre/${oidPadre}`;
        //console.log("URL asociar", (url +'?'+ params));
        let exito = await fetch(url + '?' + params, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json().then(data => {
                    if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 404) {
                        throw new NoExistePersona(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message)
                    }
                    return data;
                })
            })
            .then(data => {
                console.log("Respuesta Asociación Padre", data)
                if (data.response.valido) {
                    return data.response.valido
                } else if (!data.response.valido) {
                    throw new Error(data.response.message);
                    //TODO: notif
                }
            })
        return exito;
    }

    render() {
        const { campo, spinner } = this.state;

        return (
            <div>                
                <h4 className="card-title my-2 titSeccion" id="datos_alumno ">Datos {campo.relacionParentesco.valor}</h4>
                <div className="row no-gutters">
                    <div className="col-11">
                        <div className="form-row">
                            <div className="col-xl-8">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_dni" htmlFor="dni">DNI</label>
                                    {/*className= "... ml-3 ..." */}
                                    <div className="col-auto ml-md-3 mr-3 order-md-12">
                                        <button type="button" className="btn btn-primary boton"
                                            id="dni" aria-labelledby="etiq_dni" onClick={this.searchPadre}>
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
                                            <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start requerido" id="etiq_ocupacion" htmlFor="ocupacion">Ocupación</label>
                                            <div className="col-md">
                                                <input type="text" id="ocupacion" name="ocupacion" className="form-control"
                                                    value={campo.ocupacion.valor} onChange={this.handleInputChange}
                                                    aria-labelledby="etiq_ocupacion" disabled={!campo.ocupacion.habilitado} required />
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
                                                aria-labelledby="etiq_egresoPrimario" checked={campo.egresoPrimario.valor} onChange={this.handleInputChange}
                                                disabled={!campo.egresoPrimario.habilitado} />
                                        </div>
                                    </div>
                                    <div className="col-lg ml-lg-3">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className="col px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_egresoSecundario" htmlFor="egresoSecundario">Egresó Secundario de la institución</label>
                                            <input type="checkbox" id="egresoSecundario" name="egresoSecundario" className="checkbox"
                                                aria-labelledby="etiq_egresoSecundario" checked={campo.egresoSecundario.valor} onChange={this.handleInputChange}
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
                                                aria-labelledby="etiq_bautismo" checked={campo.bautismo.valor} onChange={this.handleInputChange}
                                                disabled={!campo.bautismo.habilitado} />
                                        </div>
                                    </div>
                                    <div className="col-lg">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className=" px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_comunion" htmlFor="comunion">Comunión</label>
                                            <input type="checkbox" id="comunion" name="comunion" className="checkbox"
                                                aria-labelledby="etiq_comunion" checked={campo.comunion.valor} onChange={this.handleInputChange}
                                                disabled={!campo.comunion.habilitado} />
                                        </div>
                                    </div>
                                    <div className="col-xl">
                                        <div className="form-group row no-gutters mb-2 align-items-center">
                                            <label className=" px-3 py-1 my-1 mr-3 align-self-start"
                                                id="etiq_confirmacion" htmlFor="confirmacion">Confirmación</label>
                                            <input type="checkbox" id="confirmacion" name="confirmacion" className="checkbox"
                                                aria-labelledby="etiq_confirmacion" checked={campo.confirmacion.valor} onChange={this.handleInputChange}
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

    extraeDatosPadre(state, datos) {
        const datosPadre = datos.padre;
        const clavesPadreRec = Object.keys(datosPadre);
        const clavesFormulario = Object.keys(state.campo);

        //Se hace la interseccion de solo las claves que se necesitan                
        const clavesUtilesPadre = clavesFormulario.filter(x => clavesPadreRec.includes(x));
        //console.log("Intersecccion Claves Padre", clavesUtilesPadre);

        const campo = { ...state.campo };
        let aux, valorRecibido;

        Object.assign(campo, this.reiniciarFormulario(state));

        Object.assign(campo, this.extraeDatosPersona(state, datos));

        clavesUtilesPadre.forEach(clave => {
            if (datosPadre[clave] === null) {
                valorRecibido = '';
            } else {
                if (clave.includes("fecha")) {
                    valorRecibido = datosPadre[clave].substr(0, 10);
                } else {
                    valorRecibido = datosPadre[clave];
                }
            }

            //FIXME: partida nac arreglar, pq se guarda en valor lo que se recibe y no el archivo
            let inputAux = clave === "partidaNacimiento" ? { nombre: valorRecibido } : {};
            let campoAux = {
                ...state.campo[clave],
                valor: valorRecibido,
                valido: true,
                habilitado: false
            }
            Object.assign(campoAux, inputAux);
            aux = {
                [clave]: campoAux
            };
            Object.assign(campo, aux);
        });
        return campo;
    }

    extraeDatosPersona(state, datosPersona) {
        let persona = {};
        let aux;

        const clavesPersonaRec = Object.keys(datosPersona);
        const clavesPersona = ["dni", "nombre", "apellido", "genero"];

        const clavesUtilesPersona = clavesPersona.filter(x => clavesPersonaRec.includes(x));
        //console.log("Intersecccion Claves Persona", clavesUtilesPersona);

        clavesUtilesPersona.forEach(clave => {
            aux = {
                [clave]: {
                    ...state.campo[clave],
                    valor: datosPersona[clave],
                    valido: true,
                    habilitado: false
                }
            };
            Object.assign(persona, aux);
        });

        //TODO: manejo de genero
        aux = {
            relacionParentesco: {
                ...state.campo.relacionParentesco,
                valor: datosPersona.genero === 'Masculino' ? 'Padre' : datosPersona.genero === 'Femenino' ? 'Madre' : false,
                valido: true,
                habilitado: false
            }
        };
        Object.assign(persona, aux);


        return persona;
    }

    reiniciarFormulario(state) {
        const clavesFormulario = Object.keys(state.campo);
        let aux, validoAux;
        let valorAux = '';
        let vacio = {};
        clavesFormulario.shift();

        clavesFormulario.forEach(clave => {
            validoAux = true;
            //Datos en required, al vaciarlos tienen que estar en false
            //TODO: ver msj de error, pq ahora lo mantiene            
            const requeridos = this.state.requeridos;
            if (requeridos.includes(clave)) {
                validoAux = false;
            }

            //TODO: sobreescribe valor recibido en tipoDni
            valorAux = clave === 'tipoDni' ? 'DNI' : clave === 'relacionParentesco' ? 'Padre' : '';

            valorAux = this.state.booleanos.includes(clave) ? false : '';

            //TODO: reinciar partida de nac con 'subir partida' en nombre
            aux = {
                [clave]: {
                    ...state.campo[clave],
                    valor: valorAux,
                    valido: validoAux,
                    habilitado: true
                }
            }
            Object.assign(vacio, aux);
        })
        return vacio;
    }
}

export default FormularioPadre;