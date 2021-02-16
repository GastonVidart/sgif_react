import React from 'react';
import * as Icon from 'react-feather';
import { NoExisteHermano, BadRequest, NoExistePersona } from '../../utils/Errores';
import { Tipo } from '../Notificacion';

class FormularioHermano extends React.Component {

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
                fechaNacimiento: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese la Fecha de Nacimiento",
                    habilitado: false
                },
                escuelaActual: {
                    valor: '',
                    valido: true,
                    msjError: "Nombre de la Escuela Inválido",
                    habilitado: false
                },
                grado: {
                    valor: '',
                    valido: true,
                    msjError: "Grado Inválido",
                    habilitado: false
                },
                //TODO: arreglo hermanos?
                //hermanos: [{ type: Schema.Types.ObjectId, ref: 'Persona' }]
            },
            oidHermano: '',
            oidPersona: '',
            existeHermano: false,
            hermanoCompleto: true, //Define si se esta creando un hermano por completo, o solo el rol                        
            validar: false,
            requeridos: ["dni", "nombre", "apellido", "genero", "fechaNacimiento"],
            spinner: false,
            idForm: this.props.id
        }

        this.urlBase = this.props.urlBase;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.esValido = this.esValido.bind(this);
        this.registrarPersona = this.registrarPersona.bind(this);
        this.getId = this.getId.bind(this);
    }

    getId() {
        return this.state.idForm;
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

    searchHermano = async () => {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        const dniHermano = this.state.campo.dni.valor;
        console.log("Search Hermano dni:", dniHermano);
        if (dniHermano === '') {
            mensajeNotif = "Dni Hermano Vacío.";
            addNotificacion(Tipo.Alerta, mensajeNotif);
            console.log("Notificación:", mensajeNotif);
            return;
        }

        this.toggleSpinner();

        fetch(this.urlBase + '/hermano/' + dniHermano)
            .then(response => {
                return response.json().then(data => {
                    if (response.status === 404) {
                        throw new NoExisteHermano(data.message)
                    } else if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message)
                    }
                    return data;
                })
            })
            .then(data => {
                //console.log("Hermano Encontrado ", data);
                const datos = data.hermano;
                this.setState(state => {
                    const campo = { ...state.campo };
                    Object.assign(campo, this.extraeDatosHermano(state, datos));
                    return {
                        campo,
                        existeHermano: true,
                        oidHermano: data.hermano._id
                    };
                })
                this.toggleSpinner();
                mensajeNotif = "Hermano encontrado.";
                addNotificacion(Tipo.Exito, mensajeNotif);
                console.log("Notificación:", mensajeNotif, "oid Hermano", data.hermano._id);
            })
            .catch(err => {
                if (err instanceof NoExisteHermano) {
                    //console.error("Hermano: ", err);
                    fetch(this.urlBase + '/persona/' + dniHermano)
                        .then(response => {
                            return response.json().then(data => {
                                console.log("Status Search Persona Hermano", response.status)
                                if (response.status === 404) {
                                    throw new NoExistePersona(data.message);
                                } else if (response.status === 400) {
                                    throw new BadRequest(data.message);
                                } else if (response.status === 500) {
                                    throw new Error(data.message);
                                }
                                return data;
                            })
                        }).then(data => {
                            //console.log("Persona Encontrada ", data)
                            const datos = data.persona;
                            this.setState(function (state) {
                                const campo = { ...state.campo };
                                Object.assign(campo, this.reiniciarFormulario(state));
                                Object.assign(campo, this.extraeDatosPersona(state, datos));
                                return {
                                    campo,
                                    oidPersona: datos._id,
                                    hermanoCompleto: false,
                                    existeHermano: false
                                };
                            })
                            this.toggleSpinner();
                            mensajeNotif = "Persona encontrada.";
                            addNotificacion(Tipo.Exito, mensajeNotif);
                            console.log("Notificación:", mensajeNotif, "oid Persona", datos._id);
                        })
                        .catch(error => {
                            if (error instanceof NoExistePersona) {
                                //console.error("Padre - Persona: ", error)                                
                                this.setState(state => {
                                    const campo = { ...state.campo };
                                    Object.assign(campo, this.reiniciarFormulario(state));
                                    return {
                                        campo,
                                        hermanoCompleto: true,
                                        existeHermano: false
                                    }
                                })
                                this.toggleSpinner();
                                mensajeNotif = "Puede crear un hermano nuevo.";
                                addNotificacion(Tipo.Exito, mensajeNotif);
                                console.log("Notificación:", mensajeNotif);
                            } else {
                                this.toggleSpinner();
                                mensajeNotif = error.message;
                                addNotificacion(Tipo.Error, mensajeNotif);
                                console.error("Error:", mensajeNotif);
                            }
                        })
                } else {
                    this.toggleSpinner();
                    mensajeNotif = err.message;
                    addNotificacion(Tipo.Error, mensajeNotif);
                    console.error("Error:", mensajeNotif);
                }
            })
    }

    toggleSpinner() {
        this.setState(state => {
            return {
                spinner: !state.spinner
            }
        })
    }

    esValido() {
        let datosHermano = Object.values(this.state.campo);
        const formValido = datosHermano.every(campo => {
            //console.log(campo, " valido? ", campo.valido)
            return campo.valido;
        })
        return formValido;
    }

    registrarPersona(oidAlumno) {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        const { existeHermano, oidHermano, hermanoCompleto } = this.state;
        const estado = this.state;
        let idHermano;
        if (!existeHermano) {
            //Tanto si es hermano completo como rol, se crea de la misma manera
            console.log("Crea Hermano", hermanoCompleto ? 'Completo' : 'Rol')
            idHermano = this.crearHermano(estado, hermanoCompleto, oidAlumno)
                .catch(err => {
                    mensajeNotif = err.message;
                    addNotificacion(Tipo.Error, mensajeNotif);
                    console.error("Error en Crear Hermano:", mensajeNotif);
                    return false;
                })

        } else if (existeHermano) {
            console.log("El hermano existe, se asocia con el alumno");
            idHermano = this.asociarHermano(oidHermano, oidAlumno)
                .catch(err => {
                    mensajeNotif = err.message;
                    addNotificacion(Tipo.Error, mensajeNotif);
                    console.error("Error en Asociar Hermano:", mensajeNotif);
                    return false;
                })
        }
        return idHermano;
    }

    async crearHermano(estado, esCompleto, oidAlumno) {
        let idHermano;
        const urlCompleto = '/hermano';
        const urlRol = '/hermano/persona/';
        let url;
        let metodo = 'PUT';
        let datos = {
            hermano: {
                fechaNacimiento: estado.campo.fechaNacimiento.valor,
                escuelaActual: estado.campo.escuelaActual.valor,
                grado: estado.campo.grado.valor,
            },
            oidAlumno
        }

        if (esCompleto) {
            url = this.urlBase + urlCompleto;
            metodo = 'POST';
            const persona = {
                hermano: {
                    dni: estado.campo.dni.valor,
                    nombre: estado.campo.nombre.valor,
                    apellido: estado.campo.apellido.valor,
                    genero: estado.campo.genero.valor,
                }
            }
            Object.assign(datos.hermano, persona.hermano);
        } else {
            url = this.urlBase + urlRol + estado.oidPersona;
        }
        console.log("datos enviados", datos)
        idHermano = await fetch(url, {
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
                console.log("Respuesta Creación Hermano ", esCompleto ? 'Completo' : 'Rol', data)
                if (data.response.hermano.hasOwnProperty("_id")) {
                    return data.response.hermano._id;
                } else {
                    throw new Error("Crear hermano respondio sin oid");
                }
            })
        return idHermano;
    }

    async asociarHermano(oidHermano, oidAlumno) {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        let params = new URLSearchParams('');
        params.append("oidAlumno", oidAlumno);
        var url = `${this.urlBase}/asociar-hermano/${oidHermano}`;
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
                //console.log("Respuesta Asociación Hermano", data)
                if (data.response.valido) {
                    mensajeNotif = "Hermano Asociado.";
                    addNotificacion(Tipo.Exito, mensajeNotif);
                    console.log("Notificación:", mensajeNotif);
                    return data.response.valido
                } else if (!data.response.valido) {
                    throw new Error(data.response.message);
                }
            })
        return exito;
    }

    render() {
        const { campo, spinner } = this.state;

        return (
            <div >
                <h4 className="card-title my-2 titSeccion" id="datos_hermano ">Datos Hermano</h4>
                <div className="row no-gutters">
                    <div className="col-11">
                        <div className="form-row">
                            <div className="col-xl-8">
                                <div className="form-group row no-gutters mb-2 align-items-center">
                                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_dni" htmlFor="dni">DNI</label>
                                    {/*className= "... ml-3 ..." */}
                                    <div className="col-auto ml-md-3 mr-3 order-md-12">
                                        <button type="button" className="btn btn-primary boton"
                                            id="dni" aria-labelledby="etiq_dni" onClick={this.searchHermano}>
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
                            <div className="col-lg ml-lg-3">
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
                            <div className="col-lg">
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
                            <div className="col-lg ml-lg-3">
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
                                                    value={campo.escuelaActual.valor} onChange={this.handleInputChange}
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
                                                <input type="text" id="grado" name="grado" className="form-control"
                                                    value={campo.grado.valor} onChange={this.handleInputChange}
                                                    aria-labelledby="etiq_grado" disabled={!campo.grado.habilitado} />
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

    extraeDatosHermano(state, datos) {
        const datosHermano = datos.hermano;
        const clavesHermanoRec = Object.keys(datosHermano);
        const clavesFormulario = Object.keys(state.campo);

        //Se hace la interseccion de solo las claves que se necesitan                
        const clavesUtilesHermano = clavesFormulario.filter(x => clavesHermanoRec.includes(x));
        //console.log("Intersecccion Claves Padre", clavesUtilesPadre);

        const campo = { ...state.campo };
        let aux, valorRecibido;

        Object.assign(campo, this.reiniciarFormulario(state));

        Object.assign(campo, this.extraeDatosPersona(state, datos));

        clavesUtilesHermano.forEach(clave => {
            if (datosHermano[clave] === null) {
                valorRecibido = '';
            } else {
                if (clave.includes("fecha")) {
                    valorRecibido = datosHermano[clave].substr(0, 10);
                } else {
                    valorRecibido = datosHermano[clave];
                }
            }

            aux = {
                [clave]: {
                    ...state.campo[clave],
                    valor: valorRecibido,
                    valido: true,
                    habilitado: false
                }
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

            //TODO: hermano no tiene tipoDni
            valorAux = clave === 'tipoDni' ? 'DNI' : '';

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

export default FormularioHermano;