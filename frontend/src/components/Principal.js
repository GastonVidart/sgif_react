import React, { Component } from "react";

import '../css/formulario.css';
import FormularioAlumno from "./FormularioAlumno";
import FormularioResponsable from "./FormularioResponsable";

class Principal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formAlumno: false
        };
        this.cambiaPantalla = this.cambiaPantalla.bind(this);
    }

    render() {
        if (this.state.formAlumno) {
            return (<FormularioAlumno cambioPantalla={() => this.cambiaPantalla()} />)
        } else {
            return (<FormularioResponsable cambioPantalla={() => this.cambiaPantalla()} />)
        }
    }

    cambiaPantalla() {
        this.setState({ formAlumno: !this.state.formAlumno });
    }
}

export default Principal;
