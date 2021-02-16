import React from "react";

import '../css/formulario.css';
import FormularioAlumno from "./FormularioAlumno";
import FormularioResponsable from "./FormularioResponsable";
import { NoExisteResponsable, NoExistePersona, BadRequest } from "../utils/Errores";
import { Tipo } from "./Notificacion";
import PantallaCarga from "./PantallaCarga";

const sacramentos = ["bautismo", "comunion", "confirmacion"];
const urlBase = 'http://localhost:5000/insc-alumno';

class InscribirAlumno extends React.Component {
    //Componente principal para formulario con multiples partes
    //Contiene el estado y funciones que se comparten entre las partes del mismo

    constructor(props) {
        super(props);

        const { esReinscripcion, alumno } = this.props;

        this.state = {
            paso0: {
                inputs: {
                    dni: {
                        valor: esReinscripcion ? alumno.dni : '',
                        valido: false,
                        msjError: "Ingrese un DNI",
                        habilitado: !esReinscripcion
                    },
                    tipoDni: {
                        valor: esReinscripcion ? alumno.tipoDni : 'DNI',
                        valido: true,
                        msjError: "Seleccione un Tipo de DNI",
                        habilitado: !esReinscripcion
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
                    lugarNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el Lugar de Nacimiento",
                        habilitado: false
                    },
                    legajo: {
                        valor: '',
                        valido: true,
                        msjError: "Implementar",
                        habilitado: false
                    },
                    fechaIngreso: {
                        valor: this.fechaDefault(),
                        valido: true,
                        msjError: "Fecha de Ingreso Inválida",
                        habilitado: false
                    },
                    fechaEgreso: {
                        valor: '',
                        valido: true,
                        msjError: "Fecha de Ingreso Inválida",
                        habilitado: false
                    },
                    nombreEscuelaAnt: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el Nombre de la Escuela",
                        habilitado: false
                    },
                    bautismo: {
                        fueTomado: {
                            valor: false,
                            valido: true,
                            habilitado: false
                        },
                        fecha: {
                            valor: '',
                            valido: true,
                            msjError: "Ingrese la Fecha",
                            habilitado: false
                        },
                        diocesis: {
                            valor: '',
                            valido: true,
                            msjError: "Ingrese la Diócesis",
                            habilitado: false
                        }
                    },
                    comunion: {
                        fueTomado: {
                            valor: false,
                            valido: true,
                            habilitado: false
                        },
                        fecha: {
                            valor: '',
                            valido: true,
                            msjError: "Ingrese la Fecha",
                            habilitado: false
                        },
                        diocesis: {
                            valor: '',
                            valido: true,
                            msjError: "Ingrese la Diócesis",
                            habilitado: false
                        }
                    },
                    confirmacion: {
                        fueTomado: {
                            valor: false,
                            valido: true,
                            habilitado: false
                        },
                        fecha: {
                            valor: '',
                            valido: true,
                            msjError: "Ingrese la Fecha",
                            habilitado: false
                        },
                        diocesis: {
                            valor: '',
                            valido: true,
                            msjError: "Ingrese la Diócesis",
                            habilitado: false
                        }
                    },
                    foto: {
                        valor: null,
                        valido: true,
                        msjError: "Foto Incorrecta",
                        habilitado: false,
                        nombre: 'Subir Foto Alumno'
                    },
                    anioCorrespondiente: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Año de Inscripción",
                        habilitado: false
                    },
                    estadoInscripcion: {
                        valor: esReinscripcion ? alumno.anioCorrespondiente : '',
                        valido: true,
                        msjError: "Estado Inscripción Inválido",
                        habilitado: false
                    }
                },
                oidAlumno: esReinscripcion ? alumno.oidAlumno : '',
                oidPersona: '',
                alumnoCompleto: true, //Define si se esta creando un alumno por completo, o solo el rol                
                validar: false,
                requeridos: ["dni", "nombre", "apellido", "genero", "email", "fechaNacimiento", "lugarNacimiento", "nombreEscuelaAnt", "anioCorrespondiente"],
                spinner: false,
                reinscribir: esReinscripcion
            },
            paso1: {
                inputs: {
                    dni: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un DNI",
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
                    lugarNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el Lugar de Nacimiento",
                        habilitado: false
                    },
                    legajo: {
                        valor: '',
                        valido: true,
                        msjError: "Implementar",
                        habilitado: false
                    },
                    cuitCuil: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un CUIL/CUIT",
                        habilitado: false
                    },
                    telefono: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Teléfono",
                        habilitado: false
                    },
                    email: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Email",
                        habilitado: false
                    },
                    calle: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Calle",
                        habilitado: false
                    },
                    altura: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Altura",
                        habilitado: false
                    },
                    barrio: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Barrio",
                        habilitado: false
                    },
                    piso: {
                        valor: '',
                        valido: true,
                        msjError: "Piso Inválido",
                        habilitado: false
                    },
                    depto: {
                        valor: '',
                        valido: true,
                        msjError: "Dpto Inválido",
                        habilitado: false
                    },
                    tira: {
                        valor: '',
                        valido: true,
                        msjError: "Tira Inválida",
                        habilitado: false
                    },
                    modulo: {
                        valor: '',
                        valido: true,
                        msjError: "Módulo Iválido",
                        habilitado: false
                    },
                    localidad: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Localidad",
                        habilitado: false
                    },
                    provincia: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Provincia",
                        habilitado: false
                    },
                    codigoPostal: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Código Postal",
                        habilitado: false
                    }
                },
                oidPersona: '',
                oidResponsable: '',
                responsableCompleto: true,
                existeResponsable: false,
                validar: false,
                requeridos: ["dni", "cuitCuil", "nombre", "apellido", "genero", "email", "telefono",
                    "fechaNacimiento", "lugarNacimiento", "calle", "altura", "barrio", "localidad", "provincia", "codigoPostal"],
                spinner: false
            },
            cantPasos: 2,
            pasoActual: 0,
            inscrValida: esReinscripcion
        };

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);
        this.handleChangeResponsable = this.handleChangeResponsable.bind(this);
        this.handleCompletarFamilia = this.handleCompletarFamilia.bind(this);
        this.pasoSiguiente = this.pasoSiguiente.bind(this);
        this.pasoPrevio = this.pasoPrevio.bind(this);
        this.registrar = this.registrar.bind(this);
        this.handleChangeSacramento = this.handleChangeSacramento.bind(this);
    }

    componentDidMount() {
        const { esReinscripcion, } = this.props;
        //Se cargan los datos del alumno que se esta reinscribiendo
        if (esReinscripcion) {
            this.searchAlumno();
        } else {
            this.validarFechaInscripcion().then(validoInsc => {
                this.setState({
                    inscrValida: validoInsc
                })
                if (!validoInsc) {
                    this.props.history.push("/");
                }
            })
        }
    }

    //Cambio el estado segun el input que se haya modificado.
    handleChangeAlumno(event) {
        let valido;
        const target = event.target;
        const { id, value, type } = target;

        //console.log("Alumno id target", id);

        valido = this.validarCampo(target);

        //Cambio de estado diferente
        if (id === "fotoAlumno") {
            const archivo = target.files[0];
            if (archivo !== undefined) {
                this.setState(estadoPrevio => ({
                    paso0: {
                        ...estadoPrevio.paso0,
                        inputs: {
                            ...estadoPrevio.paso0.inputs,
                            "foto": {
                                ...estadoPrevio.paso0.inputs.foto,
                                valor: URL.createObjectURL(archivo),
                                valido: valido,
                                nombre: archivo.name
                            }
                        }
                    }
                }));
            }
        } else {
            const data = type === 'checkbox' ? target.checked : value;

            this.setState(estadoPrevio => ({
                paso0: {
                    ...estadoPrevio.paso0,
                    inputs: {
                        ...estadoPrevio.paso0.inputs,
                        [id]: {
                            ...estadoPrevio.paso0.inputs[id],
                            valor: data,
                            valido: valido
                        }
                    }
                }
            }));
        }
        return;
    }

    handleChangeSacramento(event) {
        let valido;
        const target = event.target;
        const { id, value, type } = target;
        const datosId = id.split("_");
        const idCampo = datosId[0];
        const idSacrRec = datosId[1];
        let sacramento;

        //console.log("Sacr id target", id);
        valido = this.validarCampo(target);

        switch (idSacrRec) {
            case "Bau":
                sacramento = "bautismo";
                break;
            case "Com":
                sacramento = "comunion";
                break;
            case "Con":
                sacramento = "confirmacion";
                break;
            default:
                throw new Error("Handle Change Sacramento: Sacramento Inválido");
        }

        const data = type === 'checkbox' ? target.checked : value;
        this.setState(state => {
            return {
                paso0: {
                    ...state.paso0,
                    inputs: {
                        ...state.paso0.inputs,
                        [sacramento]: {
                            ...state.paso0.inputs[sacramento],
                            [idCampo]: {
                                ...state.paso0.inputs[sacramento][idCampo],
                                valor: data,
                                valido: valido
                            }
                        }
                    }
                }
            }
        })
    }

    handleChangeResponsable(event) {
        let valido;
        const target = event.target;
        const { id, value, type } = target;

        //console.log("Responsable id target", id);

        valido = this.validarCampo(target);

        const data = type === 'checkbox' ? target.checked : value;

        this.setState(estadoPrevio => ({
            paso1: {
                ...estadoPrevio.paso1,
                inputs: {
                    ...estadoPrevio.paso1.inputs,
                    [id]: {
                        ...estadoPrevio.paso1.inputs[id],
                        valor: data,
                        valido: valido
                    }
                }
            }
        }));
    }

    validarCampo(target) {
        const { id } = target;
        let validoAux = true;
        let validoHTML = target.checkValidity();

        if (validoHTML) {
            //Validación específica por campo
            //En cada case se debería cambiar el valor de validoAux, para condiciones adicionales
            switch (id) {
                case "dni":
                    //console.log("dni");
                    break;
                case "fotoAlumno":
                    //console.log("fotoAlumno");
                    break;
                case "anioCorrespondiente":
                    //console.log("anioCorresp");
                    break;
                default:
                    //console.log("default");
                    break;
            }
        }
        return validoAux && validoHTML;
    }

    registrar() {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        let exito = Promise.resolve(false);
        if (this.formularioValido()) {
            console.log("Registrar: Formulario Válido")
            exito = this.registrarPersona();
            return exito;
        } else {
            this.setState(state => {
                let paso = "paso" + state.pasoActual;
                return {
                    [paso]: {
                        ...state[paso],
                        validar: true
                    }
                }
            })
            mensajeNotif = "Formulario Inválido.";
            addNotificacion(Tipo.Error, mensajeNotif);
            console.error("Error:", mensajeNotif);
            return exito;
        }
    }

    registrarPersona() {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        const estado = this.state;
        let exito = Promise.resolve(false);

        console.log("Finaliza Registro");

        const reinscribir = estado.paso0.reinscribir;
        const alumnoCompleto = estado.paso0.alumnoCompleto;
        const existeResponsable = estado.paso1.existeResponsable;
        const responsableCompleto = estado.paso1.responsableCompleto;
        let idResponsable;

        if (!reinscribir) {
            if (!existeResponsable) {
                //Tanto si es responsable completo como rol, se crea de la misma manera
                console.log("Crea Responsable", responsableCompleto ? 'Completo' : 'Rol')
                idResponsable = this.crearResponsable(estado, responsableCompleto)

            } else {
                console.log("El responsable existe")
                idResponsable = Promise.resolve(estado.paso1.oidResponsable)
            }

            //Tanto si es alumno completo, como alumno rol, se crea de la misma manera
            console.log("Crea Alumno", alumnoCompleto ? 'Completo' : 'Rol');
            exito = idResponsable.then(idResp => {
                console.log("Id Responsable: ", idResp);
                return this.crearAlumno(estado, alumnoCompleto, idResp)
                    .then(() => {
                        mensajeNotif = "Inscripción Exitosa!";
                        addNotificacion(Tipo.Exito, mensajeNotif);
                        console.log("Notificación:", mensajeNotif);
                        return true;
                    })
                    .catch(err => {
                        throw new Error(err.message);
                    })
            }).catch(err => {
                throw new Error(err.message);
            })
            return exito;

        } else {
            exito = this.reinscribirAlumno().catch(err => {
                throw new Error(err.message);
            });
            return exito;
        }
    }

    async reinscribirAlumno() {
        let params = new URLSearchParams('');
        const pasoActual = this.state.paso0;
        const { oidAlumno } = pasoActual;
        const anioCorrespondiente = pasoActual.inputs.anioCorrespondiente.valor;
        params.append("anio", anioCorrespondiente);
        var url = `${urlBase}/alumno/${oidAlumno}`;
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
                console.log("Respuesta Reinscripción Alumno", data)
                if (data.response) {
                    return data.response
                } else if (!data.response) {
                    throw new Error(data.response.message);
                }
            })
        return exito;
    }

    async crearAlumno(estadoPrevio, esCompleto, oidResponsable) {
        const urlCompleto = '/alumno';
        const urlRol = '/alumno/persona/';
        let url;
        let metodo = 'PUT';
        const inputs = estadoPrevio.paso0.inputs;
        const clavesAlumno = ["tipoDni", "fechaNacimiento", "lugarNacimiento",
            "email", "fechaIngreso", "fechaEgreso", "nombreEscuelaAnt", "anioCorrespondiente"];
        const clavesPersona = ["dni", "nombre", "apellido", "genero"];
        let alumnoAux = {}, personaAux = {};

        clavesAlumno.forEach(clave => {
            //TODO: foto , no esta modelado aca
            Object.assign(alumnoAux, { [clave]: inputs[clave].valor })
        })

        let datos = {
            oidResponsable,
            alumno: alumnoAux
        }

        Object.assign(datos.alumno, this.crearSacramentos(inputs));

        if (esCompleto) {
            url = urlBase + urlCompleto;
            metodo = 'POST';
            clavesPersona.forEach(clave => {
                Object.assign(personaAux, { [clave]: inputs[clave].valor })
            })
            const persona = {
                alumno: personaAux
            }
            Object.assign(datos.alumno, persona.alumno);
        } else {
            url = urlBase + urlRol + estadoPrevio.paso0.oidPersona
        }
        console.log("datos a enviar", datos)

        const idAlumno = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
        }).then(response => {
            //Si es necesario se pueden agregar errores personalizados segun el tipo de creacion
            return response.json().then(data => {
                if (response.status === 500) {
                    throw new Error(data.message);
                } else if (response.status === 404) {
                    throw new NoExisteResponsable(data.message);
                } else if (response.status === 400) {
                    throw new BadRequest(data.message);
                }
                return data;
            })
        }).then(data => {
            console.log("Respuesta Creación Alumno ", esCompleto ? 'Completo' : 'Rol', data.response)
            if (data.response.alumno.hasOwnProperty("_id")) {
                return data.response.alumno._id;
            } else {
                throw new Error("Crear alumno respondio sin oid");
            }
        })
        return idAlumno
    }

    crearSacramentos(inputs) {
        let sacrs = [], aux;
        sacramentos.forEach(sacr => {
            if (inputs[sacr].fueTomado.valor) {
                aux = {
                    tipo: sacr,
                    fecha: inputs[sacr].fecha.valor,
                    diocesis: inputs[sacr].diocesis.valor,
                };
                sacrs.push(aux);
            }
        })
        return { sacramentos: sacrs };
    }

    async crearResponsable(estadoPrevio, esCompleto) {
        let idResponsable;
        const urlCompleto = '/responsable';
        const urlRol = '/responsable/persona/';
        let url;
        let metodo = 'PUT';
        const inputs = estadoPrevio.paso1.inputs;

        const clavesResponsable = ["cuitCuil", "telefono", "email",
            "fechaNacimiento", "lugarNacimiento", "calle", "altura", "barrio", "piso",
            "depto", "tira", "modulo", "localidad", "codigoPostal", "provincia"];
        const clavesPersona = ["dni", "nombre", "apellido", "genero"];
        let responsableAux = {}, personaAux = {};

        clavesResponsable.forEach(clave => {
            Object.assign(responsableAux, { [clave]: inputs[clave].valor })
        })

        let datos = {
            responsable: responsableAux
        }

        if (esCompleto) {
            url = urlBase + urlCompleto;
            metodo = 'POST';
            clavesPersona.forEach(clave => {
                Object.assign(personaAux, { [clave]: inputs[clave].valor })
            })
            const persona = {
                responsable: personaAux
            }
            Object.assign(datos.responsable, persona.responsable);
        } else {
            url = urlBase + urlRol + estadoPrevio.paso1.oidPersona
        }

        idResponsable = await fetch(url, {
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
                console.log("Respuesta Creación Responsable ", esCompleto ? 'Completo' : 'Rol', data)
                if (data.response.hasOwnProperty("_id")) {
                    return data.response._id;
                } else {
                    throw new Error("Crear responsable respondio sin oid");
                }
            })
        return idResponsable;

    }

    render() {
        return (
            <React.Fragment>
                <PantallaCarga inscrValida={this.state.inscrValida} />
                <FormularioAlumno
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeAlumno}
                    formulario={this.state.paso0}
                    searchAlumno={this.searchAlumno}
                    pasoSiguiente={() => this.pasoSiguiente()}
                    esReinscripcion={this.props.esReinscripcion}
                    completarFamilia={this.handleCompletarFamilia}
                    registrar={this.registrar}
                    addNotificacion={this.props.addNotificacion}
                    handleSacramento={this.handleChangeSacramento}
                    inscrValida={this.state.inscrValida}
                />

                <FormularioResponsable
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeResponsable}
                    formulario={this.state.paso1}
                    searchResponsable={this.searchResponsable}
                    pasoPrevio={() => this.pasoPrevio()}
                    registrar={this.registrar}
                    addNotificacion={this.props.addNotificacion}
                    inscrValida={this.state.inscrValida}
                />
            </React.Fragment>
        )
    }

    validarFechaInscripcion = async () => {
        const { addNotificacion } = this.props;
        let mensajeNotif, tipoNotif;
        let valida = false;
        valida = await fetch(urlBase + '/validar-fecha')
            .then(response => {
                return response.json().then(data => {
                    if (response.status === 500) {
                        throw new Error(data.message);
                    }
                    return data;
                })
            })
            .then(data => {
                const valido = data.response.valido;
                let msjClg;
                if (valido) {
                    tipoNotif = Tipo.Exito;
                    msjClg = "Notificación:";
                } else {
                    tipoNotif = Tipo.Error;
                    msjClg = "Error:";
                }
                mensajeNotif = data.response.message;
                addNotificacion(tipoNotif, mensajeNotif);
                console.log(msjClg, mensajeNotif);
                return valido;
            })
            .catch(err => {
                mensajeNotif = err.message;
                addNotificacion(Tipo.Error, mensajeNotif);
                console.log("Error:", mensajeNotif);
            })
        return valida;
    }

    searchResponsable = async () => {
        //TODO: que el search vacie todo siempre
        const { addNotificacion } = this.props;
        let mensajeNotif;
        const dniResp = this.state.paso1.inputs.dni.valor;
        console.log("dniResp", dniResp);

        if (dniResp === '') {
            mensajeNotif = "Dni Responsable Vacío.";
            addNotificacion(Tipo.Alerta, mensajeNotif);
            console.log("Notificación:", mensajeNotif);
            return
        }

        this.toggleSpinner();

        fetch(urlBase + '/responsable/' + dniResp)
            .then(response => {
                return response.json().then(data => {
                    console.log("Status Search Responsable", response.status)
                    if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 404) {
                        throw new NoExisteResponsable(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message);
                    }
                    return data
                })
            })
            .then(data => {
                const datos = data.responsable;
                this.setState(function (state) {
                    const inputs = { ...state.paso1.inputs };
                    Object.assign(inputs, this.extraeDatosResponsable(state, datos));
                    return {
                        paso1: {
                            ...state.paso1,
                            inputs,
                            existeResponsable: true,
                            oidResponsable: data.responsable._id
                        }
                    };
                })
                this.toggleSpinner();
                mensajeNotif = "Responsable Encontrado.";
                addNotificacion(Tipo.Exito, mensajeNotif);
                console.log("Notificación:", mensajeNotif, "oid Responsable", this.state.paso0.oidAlumno);
            })
            .catch(err => {
                if (err instanceof NoExisteResponsable) {
                    //REFACTOR: llevar a una func
                    fetch(urlBase + '/persona/' + dniResp)
                        .then(response => {
                            return response.json().then(data => {
                                //console.log("Status Search Persona Responsable", response.status)
                                if (response.status === 404) {
                                    throw new NoExistePersona(data.message);
                                } else if (response.status === 500) {
                                    throw new Error(data.message);
                                }
                                return data;
                            })
                        }).then(data => {
                            //console.log("Persona Encontrada ", data)
                            const datos = data.persona;
                            this.setState(function (state) {
                                const inputs = { ...state.paso1.inputs };
                                Object.assign(inputs, this.reiniciarFormulario(state));
                                Object.assign(inputs, this.extraeDatosPersona(state, datos));
                                return {
                                    paso1: {
                                        ...state.paso1,
                                        inputs,
                                        oidPersona: datos._id,
                                        responsableCompleto: false,
                                        existeResponsable: false
                                    }
                                };
                            })
                            this.toggleSpinner();
                            mensajeNotif = "Persona encontrada. Operación: Registrar Responsable.";
                            addNotificacion(Tipo.Exito, mensajeNotif);
                            console.log("Notificación:", mensajeNotif, " oid Persona", datos._id);
                        })
                        .catch(error => {
                            if (error instanceof NoExistePersona) {
                                //console.error("Responsable - Persona: ", error)
                                console.log("Puede crear un responsable nuevo")
                                this.setState(state => {
                                    const inputs = { ...state.paso1.inputs };
                                    Object.assign(inputs, this.reiniciarFormulario(state));
                                    return {
                                        paso1: {
                                            ...state.paso1,
                                            inputs,
                                            responsableCompleto: true,
                                            existeResponsable: false
                                        }
                                    }
                                })
                                this.toggleSpinner();
                                mensajeNotif = "No existe una persona con el DNI ingresado. Operación: Registrar Responsable.";
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
                    console.error("Error: ", err)
                }
            })
    }

    searchAlumno = async () => {
        //TODO: que el search vacie todo siempre
        const { addNotificacion, esReinscripcion } = this.props;
        let mensajeNotif;
        const dniAlumno = this.state.paso0.inputs.dni.valor;
        console.log("dniAlum", dniAlumno);
        if (dniAlumno === '') {
            mensajeNotif = "Dni Alumno Vacío.";
            addNotificacion(Tipo.Alerta, mensajeNotif);
            console.log("Notificación:", mensajeNotif);
            return;
        }

        this.toggleSpinner();

        fetch(urlBase + '/alumno/' + dniAlumno)
            .then(response => {
                return response.json().then(data => {
                    console.log("Status Search Alumno", response.status)
                    if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message);
                    }
                    return data;
                })
            })
            .then(data => {
                console.log("Respuesta Búsqueda Alumno:", data);
                const datos = data.response.alumnoDB;
                const valida = data.response.valido;
                const { operacion, message } = data.response

                if (valida) {
                    if (data.response.operacion === "Reinscribir") {
                        this.setState(function (state) {
                            const inputs = { ...state.paso0.inputs };
                            Object.assign(inputs, this.extraeDatosAlumno(state, datos));
                            return {
                                paso0: {
                                    ...state.paso0,
                                    inputs,
                                    oidAlumno: datos._id,
                                    reinscribir: true
                                }
                            };
                        })
                        if (!esReinscripcion) {
                            mensajeNotif = "Alumno encontrado. Operación: " + operacion + ".";
                            addNotificacion(Tipo.Exito, mensajeNotif);
                            console.log("Notificación:", mensajeNotif, "oid Alumno", this.state.paso0.oidAlumno);
                        }
                        this.toggleSpinner();
                    } else {
                        //Inscripcion
                        fetch(urlBase + '/persona/' + dniAlumno)
                            .then(response => {
                                return response.json().then(data => {
                                    //console.log("Status Search Persona Alumno", response.status)
                                    if (response.status === 404) {
                                        throw new NoExistePersona(data.message);
                                    } else if (response.status === 500) {
                                        throw new Error(data.message);
                                    }
                                    return data
                                })
                            }).then(data => {
                                //console.log("Persona Encontrada ", data)
                                const datos = data.persona;
                                this.setState(function (state) {
                                    const inputs = { ...state.paso0.inputs };
                                    Object.assign(inputs, this.extraeDatosAlumno(state, datos));
                                    return {
                                        paso0: {
                                            ...state.paso0,
                                            inputs,
                                            oidPersona: datos._id,
                                            reinscribir: false,
                                            alumnoCompleto: false
                                        }
                                    };
                                })
                                this.toggleSpinner();
                                mensajeNotif = "Persona encontrada. Operación: " + operacion + ".";
                                addNotificacion(Tipo.Exito, mensajeNotif);
                                console.log("Notificación:", mensajeNotif, "oid Persona", datos._id);
                            })
                            .catch(error => {
                                if (error instanceof NoExistePersona) {
                                    this.setState(state => {
                                        const inputs = { ...state.paso0.inputs };
                                        Object.assign(inputs, this.reiniciarFormulario(state));
                                        return {
                                            paso0: {
                                                ...state.paso0,
                                                inputs,
                                                reinscribir: false,
                                                alumnoCompleto: true
                                            }
                                        }
                                    })
                                    this.toggleSpinner();
                                    mensajeNotif = message;
                                    addNotificacion(Tipo.Exito, mensajeNotif);
                                    console.log("Notificación:", mensajeNotif);
                                } else {
                                    this.toggleSpinner();
                                    mensajeNotif = error.message;
                                    addNotificacion(Tipo.Error, mensajeNotif);
                                    console.error("Error:", mensajeNotif);
                                }
                            })
                    }
                } else {
                    this.toggleSpinner();
                    mensajeNotif = "Alumno encontrado. Operación inválida, " + message;
                    addNotificacion(Tipo.Error, mensajeNotif);
                    console.log("Notificación:", mensajeNotif);
                }
            })
            .catch((err) => {
                this.toggleSpinner();
                mensajeNotif = err.message;
                addNotificacion(Tipo.Error, mensajeNotif);
                console.error("Error: ", err)
            });
    }

    handleCompletarFamilia() {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        if (this.state.paso0.reinscribir) {
            const paso0 = this.state.paso0;
            const alumno = {
                //TODO: se podria guardar todo el estado, por si pierde conexion
                //TODO: refactor datos editables, si no se guarda todo el estado
                dni: paso0.inputs.dni.valor,
                tipoDni: paso0.inputs.tipoDni.valor,
                oidAlumno: paso0.oidAlumno,
                anioCorrespondiente: paso0.inputs.anioCorrespondiente.valor
            }
            this.props.completarFam(alumno)
        } else {
            mensajeNotif = "Debe buscar un alumno primero";
            addNotificacion(Tipo.Error, mensajeNotif);
            console.error("Error: ", mensajeNotif)
        }
    }

    toggleSpinner() {
        let paso = "paso";
        this.setState(state => {
            const idPaso = paso + state.pasoActual;
            const spinnerPrevio = state[idPaso].spinner;
            return {
                [idPaso]: {
                    ...state[idPaso],
                    spinner: !spinnerPrevio
                }
            }
        })
    }

    reiniciarFormulario(state) {
        const pasoActual = "paso" + state.pasoActual;
        const clavesFormulario = Object.keys(state[pasoActual].inputs);
        let aux, validoAux, habilitadoAux;
        let valorAux = '';
        let vacio = {};
        clavesFormulario.shift();

        clavesFormulario.forEach(clave => {
            validoAux = true;
            //Datos en required, al vaciarlos tienen que estar en false
            //TODO: ver msj de error, pq ahora lo mantiene

            if (sacramentos.includes(clave)) {
                const clavesSacrs = Object.keys(state[pasoActual].inputs[clave]);
                let auxSacr = {};
                aux = {
                    [clave]: {
                        ...state[pasoActual].inputs[clave]
                    }
                }
                clavesSacrs.forEach(claveSacr => {
                    valorAux = claveSacr === 'fueTomado' ? false : '';
                    habilitadoAux = claveSacr === 'fueTomado';
                    auxSacr = {
                        [claveSacr]: {
                            ...state[pasoActual].inputs[clave][claveSacr],
                            valor: valorAux,
                            valido: validoAux,
                            habilitado: habilitadoAux
                        }
                    }
                    Object.assign(aux[clave], auxSacr);
                })
                Object.assign(vacio, aux);
            } else {
                const requeridos = this.state[pasoActual].requeridos;
                let auxFoto = {};
                habilitadoAux = true;

                if (requeridos.includes(clave)) {
                    validoAux = false;
                }

                if (state.pasoActual === 0) {
                    switch (clave) {
                        case 'fechaIngreso':
                            valorAux = this.fechaDefault();
                            break;
                        case 'tipoDni':                            
                            valorAux = 'DNI';
                            break;
                        case 'foto':
                            auxFoto = {
                                nombre: 'Subir Foto Alumno'
                            }
                            break;
                        case 'legajo':
                            habilitadoAux = false;
                            break;
                        default:
                            valorAux = '';
                            break;
                    }
                }

                aux = {
                    [clave]: {
                        ...state[pasoActual].inputs[clave],
                        valor: valorAux,
                        valido: validoAux,
                        habilitado: habilitadoAux
                    }
                }
                Object.assign(aux[clave], auxFoto);
                Object.assign(vacio, aux);
            }
        })
        return vacio;
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
                    ...state.paso1.inputs[clave],
                    valor: datosPersona[clave],
                    valido: true,
                    habilitado: false
                }
            };
            Object.assign(persona, aux);
        });

        return persona;
    }

    extraeDatosResponsable(state, datos) {
        const datosResponsable = datos.responsable;
        const clavesResponsableRec = Object.keys(datosResponsable);
        const clavesFormulario = Object.keys(state.paso1.inputs);

        //Se hace la interseccion de solo las claves que se necesitan                
        const clavesUtilesResponsable = clavesFormulario.filter(x => clavesResponsableRec.includes(x));
        //console.log("Intersecccion Claves Responsable", clavesUtilesResponsable);

        const inputs = { ...state.paso1.inputs };
        let aux, valorRecibido;

        Object.assign(inputs, this.reiniciarFormulario(state));

        Object.assign(inputs, this.extraeDatosPersona(state, datos));

        clavesUtilesResponsable.forEach(clave => {
            if (datosResponsable[clave] !== null) {
                if (clave.includes("fecha")) {
                    valorRecibido = datosResponsable[clave].substr(0, 10);
                } else {
                    valorRecibido = datosResponsable[clave];
                }
            }
            aux = {
                [clave]: {
                    ...state.paso1.inputs[clave],
                    valor: valorRecibido,
                    valido: true,
                    habilitado: false
                }
            };
            Object.assign(inputs, aux);
        });

        return inputs;
    }

    extraeDatosAlumno(state, datos) {
        const clavesRecibidas = Object.keys(datos);
        const clavesFormulario = Object.keys(state.paso0.inputs);

        //Se hace la interseccion de solo las claves que se necesitan        
        const clavesUtiles = clavesFormulario.filter(x => clavesRecibidas.includes(x));
        //console.log("Intersecccion Claves", clavesUtiles);

        const inputs = { ...state.paso0.inputs };
        let aux, valorRecibido, habilitadoAux;

        //Reinicio los datos del formulario        
        Object.assign(inputs, this.reiniciarFormulario(state));

        //Guardo en el estado los datos recibidos necesarios
        clavesUtiles.forEach(clave => {
            if (datos[clave] !== null) {
                //TODO: para la foto
                if (clave.includes("fecha")) {
                    valorRecibido = datos[clave].substr(0, 10);
                } else {
                    valorRecibido = clave === "tipoDni" ? datos[clave].toUpperCase() : datos[clave];
                }
                habilitadoAux = clave === "anioCorrespondiente" ? true : false;                
                aux = {
                    [clave]: {
                        ...state.paso0.inputs[clave],
                        valor: valorRecibido,
                        valido: true,
                        habilitado: habilitadoAux
                    }
                };
            }
            Object.assign(inputs, aux);
        });

        //Extraigo los datos de los sacramentos del alumno
        Object.assign(inputs, this.extraeSacramentos(state, datos.sacramentos))

        return inputs;
    }

    extraeSacramentos(state, datosSacr) {
        let aux = {};
        let clave, auxSacr, valorRecibido;

        if (datosSacr !== undefined) {
            datosSacr.forEach(sacr => {
                const tipoSacr = sacramentos.filter(tipoAux => tipoAux === sacr.tipo)
                Object.assign(aux, {
                    [tipoSacr]: {
                        ...state.paso0.inputs[tipoSacr]
                    }
                })

                const campos = Object.keys(sacr);
                campos.forEach(campo => {
                    if (campo === "tipo") {
                        clave = "fueTomado";
                        valorRecibido = true;
                    } else if (campo !== "_id") {
                        clave = campo;
                        valorRecibido = campo === "fecha" ? sacr[campo].substr(0, 10) : sacr[campo];
                    }
                    //console.log("campo", campo, "clave", clave, "valor", valorRecibido);
                    auxSacr = {
                        [clave]: {
                            ...state.paso0.inputs[tipoSacr][clave],
                            valor: valorRecibido,
                            valido: true,
                            habilitado: false
                        }
                    }
                    Object.assign(aux[tipoSacr], auxSacr);
                })
            });
        }
        return aux;
    }

    pasoSiguiente() {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        if (this.formularioValido()) {
            console.log("Formulario Válido")
            this.setState(function (state) {
                let siguiente = state.pasoActual + 1;
                if (siguiente < state.cantPasos) {
                    return { pasoActual: siguiente }
                } else if (state.pasoActual === state.cantPasos - 1) {
                    //Si es el ultimo paso, define que tiene que registrar los datos
                    console.log("Ultimo paso, Finalizar Transacción")
                }
            });
            return true;
        } else {
            this.setState(state => {
                let paso = "paso" + state.pasoActual;
                return {
                    [paso]: {
                        ...state[paso],
                        validar: true
                    }
                }
            })
            mensajeNotif = "Formulario Inválido.";
            addNotificacion(Tipo.Error, mensajeNotif);
            console.error("Error:", mensajeNotif);
            return false;
        }
    }

    pasoPrevio() {
        this.setState(state => {
            let anterior = state.pasoActual - 1;
            if (anterior >= 0) {
                return { pasoActual: anterior }
            }
        });
    }

    formularioValido() {
        let idPaso = this.state.pasoActual;
        let paso = "paso" + idPaso;
        let datosPasoActual = this.state[paso];
        let formValido = false;
        switch (idPaso) {
            case 0:
                let datosAlumno = Object.values(datosPasoActual.inputs);
                //console.log("Alumno ", datosPasoActual);                
                formValido = datosAlumno.every(campo => {
                    //console.log("campo", campo)
                    if (!campo.hasOwnProperty("valido")) {
                        let datosSacrs = Object.values(campo);
                        let sacrValido = datosSacrs.every(campoS => {
                            return campoS.valido;
                        })
                        return sacrValido;
                    } else {
                        return campo.valido
                    }
                })
                break;
            case 1:
                let datosResponsable = Object.values(datosPasoActual.inputs);
                //console.log("Responsable ", datosResponsable);
                formValido = datosResponsable.every(campo => {
                    return campo.valido;
                })
                break;
            default:
                break;
        }
        return formValido;
    }

    fechaDefault() {
        const actual = new Date();
        const fecha = actual.toISOString().substr(0, 10);
        return fecha;
    }
}

export default InscribirAlumno;
