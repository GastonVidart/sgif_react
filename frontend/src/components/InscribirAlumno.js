import React, { Component } from "react";

import '../css/formulario.css';
import FormularioAlumno from "./FormularioAlumno";
import FormularioResponsable from "./FormularioResponsable";

class InscribirAlumno extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formAlumno: true
        };
        //TODO: estado formulario completo
        this.cambiaPantalla = this.cambiaPantalla.bind(this);
    }

    //TODO: metodos para hacer los pasos intermedos de la transacción

    render() {
        if (this.state.formAlumno) {
            return (<FormularioAlumno cambioPantalla={() => this.cambiaPantalla()} />)
        } else {
            return (<FormularioResponsable cambioPantalla={() => this.cambiaPantalla()} />)
        }
    }

    cambiaPantalla() {
        this.setState(state => {
            return { formAlumno: !state.formAlumno }
        });
    }
}

export default InscribirAlumno;
