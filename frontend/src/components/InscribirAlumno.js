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
            alumno: {
                dni: '',
                nombre: '',
                apellido: '',
                genero: '',
                email: '',
                fechaNacimiento: '',
                lugarNacimiento: '',
                legajo: '', //TODO: agregar a formulario para get por dni  
                fechaIngreso: this.fechaDefault(),
                fechaEgreso: '',
                nombreEscuelaAnt: '',
                sacramento: [], //TODO: ver lo del sacramento
                foto: null,
                anioCorrespondiente: '',
                estadoInscripcion: '' //TODO: mostrar cuando se hace el get por dni                
            },
            nombreFoto: 'Subir Foto Alumno',

            //FIXME: ver en model falta de fecha y lugar nac
            responsable: {
                dni: '',
                nombre: '',
                apellido: '',
                genero: '',
                fechaNacimiento: '',
                lugarNacimiento: '',
                legajo: '', //TODO: agregar a formulario
                cuitCuil: '',
                telefono: '',
                email: '',
                calle: '',
                altura: '',
                barrio: '',
                piso: '',
                depto: '',
                tira: '',
                modulo: '',
                localidad: '',
                provincia: '',
                codigoPostal: ''
            },
            cantPasos: 2,
            pasoActual: 0
        };

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);
        this.handleChangeResponsable = this.handleChangeResponsable.bind(this);
        this.handleChangeFoto = this.handleChangeFoto.bind(this);
        this.pasoSiguiente = this.pasoSiguiente.bind(this);
        this.pasoPrevio = this.pasoPrevio.bind(this);
    }

    //Cambio el estado segun el input que se haya modificado.
    handleChangeAlumno(event) {
        console.log("Alumno", event);
        const target = event.target;
        const { name, value } = target;
        const data = target.type === 'checkbox' ? target.checked : value;
        console.log("valor ", data);
        console.log("nombre target", name)

        this.setState(estadoPrevio => ({
            alumno: {
                ...estadoPrevio.alumno,
                [name]: data
            }
        }));
    }

    handleChangeFoto(event) {
        console.log("FOTO ", event);
        const target = event.target;
        const archivo = target.files[0];
        console.log("nombre target", target.name)
        console.log("valor ", archivo);

        if (archivo !== undefined) {

            this.setState(estadoPrevio => ({
                alumno: {
                    ...estadoPrevio.alumno,
                    "foto": URL.createObjectURL(archivo)
                },
                nombreFoto: archivo.name
            }));
        }
    }

    handleChangeResponsable(event) {
        console.log("Responsable", event);
        console.log("Responsable", this.state);
        const target = event.target;
        const { name, value } = target;
        const data = target.type === 'checkbox' ? target.checked : value;
        console.log("valor ", data);
        console.log("nombre target", name)

        this.setState(estadoPrevio => ({
            responsable: {
                ...estadoPrevio.responsable,
                [name]: data
            }
        }));
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

                <FormularioAlumno
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeAlumno}
                    handleChangeFoto={this.handleChangeFoto}
                    alumno={this.state.alumno}
                    nombreFoto={this.state.nombreFoto}
                    searchAlumno={this.searchAlumno}
                    pasoSiguiente={() => this.pasoSiguiente()}
                />

                <FormularioResponsable
                    pasoActual={this.state.pasoActual}
                    handleInputChange={this.handleChangeResponsable}
                    responsable={this.state.responsable}
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
                    alumno: {
                        ...this.state.alumno,
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
                })
            })
            .catch((err) => console.log("Error: ", err));
    }

    pasoSiguiente() {
        this.setState(state => {
            let siguiente = state.pasoActual + 1;
            if (siguiente < state.cantPasos) {
                return { pasoActual: siguiente }
            }
        });
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
