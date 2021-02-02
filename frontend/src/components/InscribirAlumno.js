import React, { Component } from "react";

import '../css/formulario.css';
import FormularioAlumno from "./FormularioAlumno";
import FormularioResponsable from "./FormularioResponsable";
import { NoExisteResponsable, NoExistePersona, BadRequest } from "../utils/Errores";

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
                    //sacramento: [], //TODO: ver lo del sacramento
                    foto: {
                        valor: null,
                        valido: true,
                        msjError: "Foto Incorrecta",
                        habilitado: false
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
                    } //TODO: se muestra en un flotante cuando se hace el get por dni                    
                },
                oidAlumno: esReinscripcion ? alumno.oidAlumno : '',
                oidPersona: '',
                alumnoCompleto: true, //Define si se esta creando un alumno por completo, o solo el rol
                nombreFoto: 'Subir Foto Alumno',
                validar: false,
                requeridos: ["dni", "nombre", "apellido", "genero", "email", "fechaNacimiento", "lugarNacimiento", "nombreEscuelaAnt", "anioCorrespondiente"],
                spinner: false,
                reinscribir: esReinscripcion,
                primeraCarga: true
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
                    }, //TODO: agregar a formulario                    
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
        };

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);
        this.handleChangeResponsable = this.handleChangeResponsable.bind(this);
        this.handleCompletarFamilia = this.handleCompletarFamilia.bind(this);
        this.pasoSiguiente = this.pasoSiguiente.bind(this);
        this.pasoPrevio = this.pasoPrevio.bind(this);
        this.registrar = this.registrar.bind(this);
    }

    //Cambio el estado segun el input que se haya modificado.
    handleChangeAlumno(event) {
        let valido;
        const target = event.target;
        const { id, value, type } = target;

        console.log("Alumno id target", id);

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
                                valido: valido
                            }
                        },
                        nombreFoto: archivo.name
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

    handleChangeResponsable(event) {
        let valido;
        const target = event.target;
        const { id, value, type } = target;

        console.log("Responsable id target", id);

        valido = this.validarCampo(target);

        const data = target.type === 'checkbox' ? target.checked : value;

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
        let exito = Promise.resolve(false);
        if (this.formularioValido()) {
            console.log("Registrar: Formulario Válido")
            exito = this.registrarPersona();
            return exito;
        } else {
            console.log("Formulario Inválido")
            this.setState(state => {
                let paso = "paso" + state.pasoActual;
                return {
                    [paso]: {
                        ...state[paso],
                        validar: true
                    }
                }
            })
            return exito;
        }
    }

    registrarPersona() {
        const estado = this.state;
        let exito = Promise.resolve(false);

        console.log("Finaliza Registro");

        const reinscribir = estado.paso0.reinscribir;
        const alumnoCompleto = estado.paso0.alumnoCompleto;
        const existeResponsable = estado.paso1.existeResponsable;
        const responsableCompleto = estado.paso1.responsableCompleto;
        let idResponsable;

        if (!reinscribir) {
            //TODO: si existe ver que se hace con el responsable, si solo se muestra y listo                
            if (!existeResponsable) {

                //Tanto si es responsable completo como rol, se crea de la misma manera
                console.log("Crea Responsable", responsableCompleto ? 'Completo' : 'Rol')
                idResponsable = this.crearResponsable(estado, responsableCompleto)

            } else if (existeResponsable) {
                console.log("El responsable existe")
                idResponsable = Promise.resolve(estado.paso1.oidResponsable)
            }

            //Tanto si es alumno completo, como alumno rol, se crea de la misma manera
            console.log("Crea Alumno", alumnoCompleto ? 'Completo' : 'Rol');
            exito = idResponsable.then(idResp => {
                console.log("Id Responsable: ", idResp);
                return this.crearAlumno(estado, alumnoCompleto, idResp)
                    .then(data => {
                        //TODO: notif lo que dice abajo
                        console.log("Inscripción Exitosa!", data)
                        return true;
                    })
                    .catch(err => {
                        console.log("Error Inscribir Alumno: ", err)
                        return false;
                    })

            }).catch(err => {
                console.log("ERROR: ", err)
                throw new Error(err.message);
            })

            return exito;

        } else {                        
            exito = this.reinscribirAlumno().catch(err => {
                console.log("Error en Reinscribir Alumno:", err.message);
                //TODO:notif
                return false;
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
        var url = `http://localhost:5000/insc-alumno/alumno/${oidAlumno}`;
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
                    //TODO: notif
                }
            })
        return exito;
    }

    async crearAlumno(estadoPrevio, esCompleto, oidResponsable) {
        const urlBase = 'http://localhost:5000/insc-alumno';
        const urlCompleto = '/alumno';
        const urlRol = '/alumno/persona/';
        let url;
        let metodo = 'PUT';

        //TODO: sacramentos, no esta modelado aca y otros
        var datos = {
            oidResponsable,
            alumno: {
                tipoDni: estadoPrevio.paso0.inputs.tipoDni.valor,
                fechaNacimiento: estadoPrevio.paso0.inputs.fechaNacimiento.valor,
                lugarNacimiento: estadoPrevio.paso0.inputs.lugarNacimiento.valor,
                email: estadoPrevio.paso0.inputs.email.valor,
                fechaIngreso: estadoPrevio.paso0.inputs.fechaIngreso.valor,
                fechaEgreso: estadoPrevio.paso0.inputs.fechaEgreso.valor,
                nombreEscuelaAnt: estadoPrevio.paso0.inputs.nombreEscuelaAnt.valor,
                anioCorrespondiente: estadoPrevio.paso0.inputs.anioCorrespondiente.valor
            }
        }

        if (esCompleto) {
            url = urlBase + urlCompleto;
            metodo = 'POST';
            const persona = {
                alumno: {
                    dni: estadoPrevio.paso0.inputs.dni.valor,
                    nombre: estadoPrevio.paso0.inputs.nombre.valor,
                    apellido: estadoPrevio.paso0.inputs.apellido.valor,
                    genero: estadoPrevio.paso0.inputs.genero.valor
                }
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

    async crearResponsable(estadoPrevio, esCompleto) {
        let idResponsable;
        const urlBase = 'http://localhost:5000/insc-alumno';
        const urlCompleto = '/responsable';
        const urlRol = '/responsable/persona/';
        let url;
        let metodo = 'PUT';
        let datos = {
            responsable: {
                cuitCuil: estadoPrevio.paso1.inputs.cuitCuil.valor,
                telefono: estadoPrevio.paso1.inputs.telefono.valor,
                email: estadoPrevio.paso1.inputs.email.valor,
                fechaNacimiento: estadoPrevio.paso1.inputs.fechaNacimiento.valor,
                lugarNacimiento: estadoPrevio.paso1.inputs.lugarNacimiento.valor,
                calle: estadoPrevio.paso1.inputs.calle.valor,
                altura: estadoPrevio.paso1.inputs.altura.valor,
                barrio: estadoPrevio.paso1.inputs.barrio.valor,
                piso: estadoPrevio.paso1.inputs.piso.valor,
                depto: estadoPrevio.paso1.inputs.depto.valor,
                tira: estadoPrevio.paso1.inputs.tira.valor,
                modulo: estadoPrevio.paso1.inputs.modulo.valor,
                localidad: estadoPrevio.paso1.inputs.localidad.valor,
                codigoPostal: estadoPrevio.paso1.inputs.codigoPostal.valor,
                provincia: estadoPrevio.paso1.inputs.provincia.valor,
            }
        }

        if (esCompleto) {
            url = urlBase + urlCompleto;
            metodo = 'POST';
            const persona = {
                responsable: {
                    dni: estadoPrevio.paso1.inputs.dni.valor,
                    nombre: estadoPrevio.paso1.inputs.nombre.valor,
                    apellido: estadoPrevio.paso1.inputs.apellido.valor,
                    genero: estadoPrevio.paso1.inputs.genero.valor,
                }
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
        const { esReinscripcion } = this.props;
        //Se cargan los datos del alumno que se esta reinscribiendo
        //FIXME: Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state
        if (esReinscripcion && this.state.paso0.primeraCarga) {
            this.searchAlumno();
        }

        return (
            <React.Fragment>
                {/*TODO: validar fecha inscripcion*/}
                <FormularioAlumno
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeAlumno}
                    formulario={this.state.paso0}
                    searchAlumno={this.searchAlumno}
                    pasoSiguiente={() => this.pasoSiguiente()}
                    esReinscripcion={this.props.esReinscripcion}
                    completarFamilia={this.handleCompletarFamilia}
                    registrar={this.registrar}
                />

                <FormularioResponsable
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeResponsable}
                    formulario={this.state.paso1}
                    searchResponsable={this.searchResponsable}
                    pasoPrevio={() => this.pasoPrevio()}
                    registrar={this.registrar}
                />
                {/*TODO: mostrar notifs*/}
            </React.Fragment>
        )
    }

    searchResponsable = async () => {
        const dniResp = this.state.paso1.inputs.dni.valor;
        console.log("dniResp", dniResp);

        if (dniResp === '') {
            //TODO: notif
            console.log("Dni Responsable Vacío")
            return
        }

        fetch('http://localhost:5000/insc-alumno/responsable/' + dniResp)
            .then(response => {
                //TODO: manejo de estados de error aca https://developer.mozilla.org/es/docs/Web/API/Response/status
                //TODO: cuando no tiene conexión loading https://getbootstrap.com/docs/4.5/components/spinners/
                return response.json().then(data => {
                    console.log("Status Search Responsable", response.status)
                    if (response.status === 404) {
                        throw new NoExisteResponsable(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message);
                    }
                    return data
                })
            })
            .then(data => {
                console.log("Responsable Encontrado ", data);
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
            })
            .catch(err => {
                if (err instanceof NoExisteResponsable) {
                    console.error("Responsable: ", err)
                    //TODO: llevar a una func
                    fetch('http://localhost:5000/insc-alumno/persona/' + dniResp)
                        .then(response => {
                            return response.json().then(data => {
                                console.log("Status Search Persona Responsable", response.status)
                                if (response.status === 404) {
                                    throw new NoExistePersona(data.message);
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
                            //TODO: notif
                            console.log("id Persona", this.state.paso1.oidPersona)
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
                                //TODO: notif
                            } else {
                                console.log("Error Buscar Responsable: ", error)
                            }
                        })
                } else {
                    console.error("Error: ", err)
                }
            })
    }

    searchAlumno = async () => {
        const dniAlumno = this.state.paso0.inputs.dni.valor;
        console.log("dniAlum", dniAlumno);
        if (dniAlumno === '') {
            //TODO: notif
            console.log("Dni Alumno Vacío")
            return
        }

        //this.toggleSpinner();

        fetch('http://localhost:5000/insc-alumno/alumno/' + dniAlumno)
            .then(response => {
                return response.json().then(data => {
                    console.log("Status Search Alumno", response.status)
                    if (response.status === 500) {
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
                            console.log("Alumno encontrado. Operacion: ", operacion);
                            const inputs = { ...state.paso0.inputs };
                            Object.assign(inputs, this.extraeDatosAlumno(state, datos));
                            return {
                                paso0: {
                                    ...state.paso0,
                                    inputs,
                                    oidAlumno: datos._id,
                                    reinscribir: true,
                                    primeraCarga: false
                                }
                            };
                        })
                        console.log("oid Alumno", this.state.paso0.oidAlumno)
                        //TODO: buscar responsable y mostrarlo - puse que no
                    } else {
                        //Inscripcion
                        fetch('http://localhost:5000/insc-alumno/persona/' + dniAlumno)
                            .then(response => {
                                return response.json().then(data => {
                                    console.log("Status Search Persona Alumno", response.status)
                                    if (response.status === 404) {
                                        throw new NoExistePersona(data.message);
                                    } else if (response.status === 500) {
                                        throw new Error(data.message);
                                    }
                                    return data
                                })
                            }).then(data => {
                                console.log("Persona Encontrada ", data)
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
                                //TODO: notif
                            })
                            .catch(error => {
                                if (error instanceof NoExistePersona) {
                                    console.error("Alumno - Persona: ", error)
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
                                    //TODO: notif
                                } else {
                                    console.log("Error Buscar Alumno: ", error)
                                }
                            })
                        console.log("Operacion válida, op", operacion);
                    }
                } else {
                    //TODO: notif
                    console.log("Operacion inválida, message ", message);
                }
                //TODO: controlar multiples clicks? bloquear boton con disable

            })
            //TODO: notif
            .catch((err) => console.error("Error: ", err));
    }

    handleCompletarFamilia() {
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
            //TODO: notif
            console.log("Debe buscar un alumno primero")
        }
    }

    //TODO: probar
    toggleSpinner() {
        let paso = "paso";
        this.setState(state => {
            console.log(state);
            paso = paso + state.pasoActual;
            console.log(paso);
            const spinnerPrevio = state[paso].spinner;
            return {
                [paso]: {
                    ...state[paso],
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
            const requeridos = this.state[pasoActual].requeridos;
            if (requeridos.includes(clave)) {
                validoAux = false;
            }

            if (state.pasoActual === 0) {
                //TODO: sobreescribe valor recibido en tipoDni
                //TODO: reinciar foto 'subir foto'
                //TODO: reiniciar y habilitar cuil cuit despues de buscar persona
                valorAux = clave === 'fechaIngreso' ? this.fechaDefault() : clave === 'tipoDni' ? 'DNI' : '';
            }
            habilitadoAux = clave === "legajo" ? false : true;

            aux = {
                [clave]: {
                    ...state[pasoActual].inputs[clave],
                    valor: valorAux,
                    valido: validoAux,
                    habilitado: habilitadoAux
                }
            }
            Object.assign(vacio, aux);
        })
        return vacio;
    }

    extraeDatosPersona(state, datosPersona) {
        let persona = {};
        let aux, valorRecibido;

        const clavesPersonaRec = Object.keys(datosPersona);
        const clavesPersona = ["dni", "nombre", "apellido", "genero"];

        const clavesUtilesPersona = clavesPersona.filter(x => clavesPersonaRec.includes(x));
        //console.log("Intersecccion Claves Persona", clavesUtilesPersona);

        clavesUtilesPersona.forEach(clave => {
            //TODO: quitarfecha
            if (clave.includes("fecha")) {
                valorRecibido = datosPersona[clave].substr(0, 10);
            } else {
                valorRecibido = datosPersona[clave];
            }
            aux = {
                [clave]: {
                    ...state.paso1.inputs[clave],
                    valor: valorRecibido,
                    valido: true
                    //TODO: habilitado:false
                }
            };
            Object.assign(persona, aux);
        });

        return persona;
    }

    extraeDatosResponsable(state, datos) {
        const datosResponsable = datos.responsable;
        const clavesResponsableRec = Object.keys(datosResponsable);
        //TODO: refactor this.state->state
        const clavesFormulario = Object.keys(this.state.paso1.inputs);

        //Se hace la interseccion de solo las claves que se necesitan                
        const clavesUtilesResponsable = clavesFormulario.filter(x => clavesResponsableRec.includes(x));
        //console.log("Intersecccion Claves Responsable", clavesUtilesResponsable);

        const inputs = { ...state.paso1.inputs };
        let aux, valorRecibido;

        Object.assign(inputs, this.reiniciarFormulario(state));

        Object.assign(inputs, this.extraeDatosPersona(state, datos));

        clavesUtilesResponsable.forEach(clave => {
            if (datosResponsable[clave] === null) {
                valorRecibido = '';
            } else {
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
        const clavesFormulario = Object.keys(this.state.paso0.inputs);

        //Se hace la interseccion de solo las claves que se necesitan        
        const clavesUtiles = clavesFormulario.filter(x => clavesRecibidas.includes(x));
        //console.log("Intersecccion Claves", clavesUtiles);

        const inputs = { ...state.paso0.inputs };
        let aux, valorRecibido, habilitadoAux;

        //Reinicio los datos del formulario        
        Object.assign(inputs, this.reiniciarFormulario(state));

        //Guardo en el estado los datos recibidos necesarios
        clavesUtiles.forEach(clave => {
            //TODO: para la foto
            if (clave.includes("fecha")) {
                valorRecibido = datos[clave].substr(0, 10);
            } else {
                valorRecibido = datos[clave];
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
            Object.assign(inputs, aux);
        });
        return inputs;
    }

    pasoSiguiente() {
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
            console.log("Formulario Inválido")
            this.setState(state => {
                let paso = "paso" + state.pasoActual;
                return {
                    [paso]: {
                        ...state[paso],
                        validar: true
                    }
                }
            })
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
                    return campo.valido;
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
