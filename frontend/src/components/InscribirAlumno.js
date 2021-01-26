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

        this.state = {
            paso0: {
                inputs: {
                    dni: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un DNI"
                    },
                    nombre: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el nombre"
                    },
                    apellido: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el apellido"
                    },
                    genero: {
                        valor: '',
                        valido: false,
                        msjError: "Seleccione un género"
                    },
                    //TODO: validar valor correctamente
                    email: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un email"
                    },//TODO: email no esta en esquema
                    fechaNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese la Fecha de Nacimiento"
                    },
                    lugarNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el Lugar de Nacimiento"
                    },
                    legajo: {
                        valor: '',
                        valido: true,
                        msjError: "Implementar"
                    }, //TODO: agregar a formulario para get por dni,
                    //TODO legajo ver la validez por defecto
                    fechaIngreso: {
                        valor: this.fechaDefault(),
                        valido: true,
                        msjError: "Fecha de Ingreso Inválida"
                    },
                    fechaEgreso: {
                        valor: '',
                        valido: true,
                        msjError: "Fecha de Ingreso Inválida"
                    },
                    nombreEscuelaAnt: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el Nombre de la Escuela"
                    },
                    //sacramento: [], //TODO: ver lo del sacramento
                    foto: {
                        valor: null,
                        valido: true,
                        msjError: "Foto Incorrecta"
                    },
                    anioCorrespondiente: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Año de Inscripción"
                    },
                    estadoInscripcion: {
                        valor: '',
                        valido: true,
                        msjError: "Estado Inscripción Inválido"
                    } //TODO: mostrar cuando se hace el get por dni
                    //TODO estadoInscr ver la validez por defecto
                },
                oidAlumno: '',
                oidPersona: '',
                existeAlumno: false,
                alumnoCompleto: true, //Define si se esta creando un alumno por completo, o solo el rol
                nombreFoto: 'Subir Foto Alumno',
                validar: false,
                requeridos: ["dni", "nombre", "apellido", "genero", "email", "fechaNacimiento", "lugarNacimiento", "nombreEscuelaAnt", "anioCorrespondiente"]

            },

            //FIXME: ver en model falta de fecha y lugar nac
            paso1: {
                inputs: {
                    dni: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un DNI"
                    },
                    nombre: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el nombre"
                    },
                    apellido: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el apellido"
                    },
                    genero: {
                        valor: '',
                        valido: false,
                        msjError: "Seleccione un género"
                    },
                    fechaNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese la Fecha de Nacimiento"
                    },
                    lugarNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el Lugar de Nacimiento"
                    },
                    legajo: {
                        valor: '',
                        valido: true,
                        msjError: "Implementar"
                    }, //TODO: agregar a formulario
                    //TODO legajo ver la validez por defecto
                    cuitCuil: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un CUIL/CUIT"
                    },
                    telefono: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Teléfono"
                    },
                    email: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Email"
                    },
                    calle: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Calle"
                    },
                    altura: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Altura"
                    },
                    barrio: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Barrio"
                    },
                    piso: {
                        valor: '',
                        valido: true,
                        msjError: "Piso Inválido"
                    },
                    depto: {
                        valor: '',
                        valido: true,
                        msjError: "Dpto Inválido"
                    },
                    tira: {
                        valor: '',
                        valido: true,
                        msjError: "Tira Inválida"
                    },
                    modulo: {
                        valor: '',
                        valido: true,
                        msjError: "Módulo Iválido"
                    },
                    localidad: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Localidad"
                    },
                    provincia: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese una Provincia"
                    },
                    codigoPostal: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un Código Postal"
                    }
                },
                oidPersona: '',
                oidResponsable: '',
                responsableCompleto: true,
                existeResponsable: false,
                validar: false,
                requeridos: ["dni", "cuitCuil", "nombre", "apellido", "genero", "email", "telefono",
                    "fechaNacimiento", "lugarNacimiento", "calle", "altura", "barrio", "localidad", "provincia", "codigoPostal"]
            },
            cantPasos: 2,
            pasoActual: 0,
            //TODO: cuando ponga el modal lo tiene que hacer y el cancelar pone en false
            finalizaRegistro: false
        };

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);
        this.handleChangeResponsable = this.handleChangeResponsable.bind(this);
        this.pasoSiguiente = this.pasoSiguiente.bind(this);
        this.pasoPrevio = this.pasoPrevio.bind(this);
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

    handleSubmit = (event) => {
        event.preventDefault();
        const { alumno, responsable } = this.state;
        alert(`Datos Ingresados \n
            Alumno: ${alumno} \n 
            Responsable: ${responsable}`)
        console.error("Implementar")
    }

    componentDidUpdate(propsPrevias, estadoPrevio) {

        if ((estadoPrevio.finalizaRegistro === false) && (this.state.finalizaRegistro === true)) {
            console.log("Finaliza Registro");

            const existeAlumno = estadoPrevio.paso0.existeAlumno;
            const alumnoCompleto = estadoPrevio.paso0.alumnoCompleto;
            const existeResponsable = estadoPrevio.paso1.existeResponsable;
            const responsableCompleto = estadoPrevio.paso1.responsableCompleto;
            let idResponsable;

            if (!existeAlumno) {
                //TODO: si existe ver que se hace con el responsable, si solo se muestra y listo
                if (!existeResponsable) {
                    //TODO: poner spiner mientras termina la transaccion
                    if (responsableCompleto) {
                        console.log("Crea Responsable Completo")
                        //idResponsable = this.crearResponsableCompleto(estadoPrevio);
                        idResponsable = this.crearResponsable(estadoPrevio, true)
                    } else if (!responsableCompleto) {
                        console.log("Crea Rol Responsable")
                        //idResponsable = this.crearResponsableRol(estadoPrevio);
                        idResponsable = this.crearResponsable(estadoPrevio, false)
                    }
                } else if (existeResponsable) {
                    console.log("El responsable existe")
                    idResponsable = Promise.resolve(estadoPrevio.paso1.oidResponsable)
                }

                if (alumnoCompleto) {
                    console.log("Crea Alumno Completo")
                    idResponsable.then(idResp => {
                        //TODO: alumno completo
                        console.log("Id Responsable: ", idResp);
                        this.crearAlumno(estadoPrevio, alumnoCompleto, idResp)
                            .catch(err => { console.log("error: ", err) })
                    })
                        .catch(err => {
                            console.log("ERROR: ", err)
                        })

                } else if (!alumnoCompleto) {
                    console.log("Crea Rol Alumno")
                    idResponsable.then(idResp => {
                        //TODO: alumno rol
                        console.log("Id Responsable: ", idResp)
                        this.crearAlumno(estadoPrevio, alumnoCompleto, idResp)
                            .catch(err => { console.log("error: ", err) })
                    })
                        .catch(err => {
                            console.log("ERROR: ", err)
                        })
                }
            } else {
                console.log("El alumno existe, se reinscribe")
            }
        }
    }

    async crearAlumno(estadoPrevio, esCompleto, oidResponsable) {
        const urlBase = 'http://localhost:5000/insc-alumno';
        const urlCompleto = '/alumno';
        const urlRol = '/alumno/persona/';
        let url;
        let metodo = 'PUT';

        //TODO: tipo dni, sacramentos, no esta modelado aca y otros
        var datos = {
            oidResponsable,
            alumno: {
                tipoDni: 'DNI',
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
            //TODO: tipo dni,
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

        await fetch(url, {
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
    }

    //TODO: enviar los datos que faltan en esquema tmb
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
                calle: estadoPrevio.paso1.inputs.calle.valor,
                altura: estadoPrevio.paso1.inputs.altura.valor,
                barrio: estadoPrevio.paso1.inputs.barrio.valor,
                localidad: estadoPrevio.paso1.inputs.localidad.valor,
                codigoPostal: estadoPrevio.paso1.inputs.codigoPostal.valor,
                provincia: estadoPrevio.paso1.inputs.provincia.valor
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
        return (
            <React.Fragment>
                {/*TODO: validar fecha inscripcion*/}
                <FormularioAlumno
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeAlumno}
                    formulario={this.state.paso0}
                    searchAlumno={this.searchAlumno}
                    pasoSiguiente={() => this.pasoSiguiente()}
                />

                <FormularioResponsable
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeResponsable}
                    formulario={this.state.paso1}
                    searchResponsable={this.searchResponsable}
                    pasoSiguiente={() => this.pasoSiguiente()}
                    pasoPrevio={() => this.pasoPrevio()}
                />

            </React.Fragment>
        )
    }

    searchResponsable = async () => {
        const dniResp = this.state.paso1.inputs.dni.valor;
        console.log("dniResp", dniResp);
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
                            console.log(response)
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
        fetch('http://localhost:5000/insc-alumno/alumno/' + dniAlumno)
            .then(response => {
                //TODO: cuando no tiene conexión loading https://getbootstrap.com/docs/4.5/components/spinners/
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

                //TODO: poner ref a los botones?
                //TODO: avisar que se pierden los datos que no se guardaron
                //TODO: tiene que borrar siempre, extraer a otra funcion

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
                                    existeAlumno: true,
                                    oidAlumno: datos._id
                                }
                            };
                        })
                        console.log("oid Alumno", this.state.paso0.oidAlumno)
                        //TODO: buscar responsable y mostrarlo - puse que no, ver
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
                                            alumnoCompleto: false,
                                            existeAlumno: false
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
                                                alumnoCompleto: true,
                                                existeAlumno: false
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
                    //TODO: mostrar message con flotante
                    console.log("Operacion inválida, message ", message);
                }
                //TODO: controlar multiples clicks? bloquear boton con disable

            })
            //TODO: flotante error
            .catch((err) => console.error("Error: ", err));
    }

    reiniciarFormulario(state) {
        const pasoActual = "paso" + state.pasoActual;
        const clavesFormulario = Object.keys(state[pasoActual].inputs);
        let aux, validoAux;
        let vacio = {};
        clavesFormulario.shift();

        clavesFormulario.forEach(clave => {
            validoAux = true;
            //Datos en required, al vaciarlos tienen que estar en false
            //TODO: ver msj de error, pq ahora lo mantiene
            //TODO: no se tiene que borrar dni
            const requeridos = this.state[pasoActual].requeridos;
            if (requeridos.includes(clave)) {
                validoAux = false;
            }
            aux = {
                [clave]: {
                    ...state[pasoActual].inputs[clave],
                    valor: '',
                    valido: validoAux,
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
                }
            };
            Object.assign(persona, aux);
        });

        return persona;
    }

    extraeDatosResponsable(state, datos) {
        const datosResponsable = datos.responsable;
        const clavesResponsableRec = Object.keys(datosResponsable);
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
                    valido: true
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
        let aux, valorRecibido;

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
            aux = {
                [clave]: {
                    ...state.paso0.inputs[clave],
                    valor: valorRecibido,
                    valido: true
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
                    //TODO: no cambiar aca, cambiar en modal aceptar
                    return { finalizaRegistro: true }
                }
            });
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
