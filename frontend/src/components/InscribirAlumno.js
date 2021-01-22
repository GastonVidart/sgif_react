import React, { Component } from "react";

import '../css/formulario.css';
import FormularioAlumno from "./FormularioAlumno";
import FormularioResponsable from "./FormularioResponsable";

class InscribirAlumno extends React.Component {
    //Componente principal para formulario con multiples partes
    //Contiene el estado y funciones que se comparten entre las partes del mismo

    constructor(props) {
        super(props);

        this.state = {
            paso0: {
                alumno: {
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
                nombreFoto: 'Subir Foto Alumno',
                validar: false
            },

            //FIXME: ver en model falta de fecha y lugar nac
            paso1: {
                responsable: {
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
                validar: false
            },
            cantPasos: 2,
            pasoActual: 0,
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
                        alumno: {
                            ...estadoPrevio.paso0.alumno,
                            "foto": {
                                ...estadoPrevio.paso0.alumno.foto,
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
                    alumno: {
                        ...estadoPrevio.paso0.alumno,
                        [id]: {
                            ...estadoPrevio.paso0.alumno[id],
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
                responsable: {
                    ...estadoPrevio.paso1.responsable,
                    [id]: {
                        ...estadoPrevio.paso1.responsable[id],
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

    //TODO: metodos para hacer los pasos intermedos de la transacción

    render() {
        return (
            <React.Fragment>
                {/*TODO: validar fecha inscripcion*/}
                <FormularioAlumno
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeAlumno}
                    datos={this.state.paso0}
                    searchAlumno={this.searchAlumno}
                    pasoSiguiente={() => this.pasoSiguiente()}
                />

                <FormularioResponsable
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeResponsable}
                    datos={this.state.paso1}
                    searchResponsable={this.searchResponsable}
                    pasoSiguiente={() => this.pasoSiguiente()}
                    pasoPrevio={() => this.pasoPrevio()}
                />

            </React.Fragment>
        )
    }

    searchResponsable = async () => {
        const dniResp = this.state.responsable.dni;
        console.log("dniResp", dniResp);
        console.error("Implementar searchResponsable");
    }

    searchAlumno = async () => {
        //const dniAlumno = document.getElementById('dni').value;
        const dniAlumno = this.state.alumno.dni;
        console.log("dniAlum", dniAlumno);
        fetch('http://localhost:5000/insc-alumno/alumno/' + dniAlumno)
            .then(response => response.json())
            .then(data => {
                console.log("data:", data)
                const datos = data.response.alumnoDB

                //TODO: controlar inscripción / reinscripción
                //TODO: controlar multiples clicks?

                this.setState({
                    paso0: {
                        ...this.state.paso0,
                        alumno: {
                            ...this.state.paso0.alumno,
                            nombre: datos.nombre,
                            apellido: datos.apellido,
                            genero: datos.genero,
                            fechaIngreso: datos.fechaIngreso.substr(0, 10),
                            fechaNacimiento: datos.fechaNacimiento.substr(0, 10),
                            lugarNacimiento: datos.lugarNacimiento,
                            anioCorrespondiente: datos.anioCorrespondiente,
                            legajo: datos.legajo,
                            fechaEgreso: datos.fechaEgreso,
                            nombreEscuelaAnt: datos.nombreEscuelaAnt,
                            foto: datos.foto,
                            estadoInscripcion: datos.estadoInscripcion
                            //TODO: ver como recuperar sacramentos
                        }
                    }
                })
            })
            .catch((err) => console.log("Error: ", err));
    }

    pasoSiguiente() {
        if (this.formularioValido()) {
            console.log("Formulario Válido")
            this.setState(state => {
                let siguiente = state.pasoActual + 1;
                if (siguiente < state.cantPasos) {
                    return { pasoActual: siguiente }
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

    formularioValido() {
        let idPaso = this.state.pasoActual;
        let paso = "paso" + idPaso;
        let datosPasoActual = this.state[paso];
        let formValido = false;
        switch (idPaso) {
            case 0:
                let datosAlumno = Object.values(datosPasoActual.alumno);
                //console.log("Alumno ", datosAlumno);
                formValido = datosAlumno.every(campo => {
                    return campo.valido;
                })
                break;
            case 1:
                let datosResponsable = Object.values(datosPasoActual.responsable);
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

    pasoPrevio() {
        this.setState(state => {
            let anterior = state.pasoActual - 1;
            if (anterior >= 0) {
                return { pasoActual: anterior }
            }
        });
    }

    fechaDefault() {
        const actual = new Date();
        const fecha = actual.toISOString().substr(0, 10);
        return fecha;
    }
}

export default InscribirAlumno;
