import React, { Component } from "react";


class Principal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="contDerecha">
                <div class="contAux">
                    <div class="contTitulo">
                        <span class="titulo">Inscribir Alumno</span>
                    </div>

                    <div class="botones">
                        <button class="boton">Completar Familia</button>
                        <button class="boton" onClick="swapPage()">Continuar</button>
                    </div>
                </div>

                <div class="contFormulario">
                    <div class="fila">
                        <label for="dni">DNI</label>
                        <input type="text" id="dni" name="dni" placeholder="completar con prismic"/>
                        <button class="boton" id="searchAlumno" onClick="searchAlumno()">Buscar</button>
                    </div>
                    <div class="fila">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre"/>

                        <label for="apellido" class="enLinea">Apellido</label>
                        <input type="text" id="apellido" name="apellido"/>
                    </div>
                    <div class="fila">
                        <label for="sexo">Sexo</label>
                        <select name="sexo" id="sexo" class="input">
                            <option value="">Seleccione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <div class="fila">
                        <label for="fNacimiento">Fecha de Nacimiento</label>
                        <input type="date" id="fNacimiento" name="fNacimiento" class="fecha"/>

                        <label for="lugarNac" class="enLinea">Lugar de Nacimiento</label>
                        <input type="text" id="lugarNac" name="lugarNac"/>
                    </div>
                    <div class="fila">
                        <label for="fIngreso">Fecha de Ingreso</label>
                        <input type="date" id="fIngreso" name="fIngreso" class="fecha"/>
                    </div>
                    <div class="fila">
                        <label for="nombreEscuela" class="nombreEscuela">
                            Nombre Escuela Anterior
                        </label>
                        <input type="text" id="nombreEscuela" name="nombreEscuela"/>
                    </div>
                    <div class="fila">
                        <label for="fEgreso">Fecha de Egreso</label>
                        <input type="date" id="fEgreso" name="fEgreso" class="fecha"/>
                    </div>
                    <div class="fila">
                        <label for="anioCorrespondiente">Año a Inscribir</label>
                        {/* <input type="number" id="anioCorrespondiente" name="anioCorrespondiente" min=1 max=5 > */}
                    </div>

                    <div class="fila contenedor">
                        <span class="titSeccion">Sacramentos</span>
                        <div class="sacramento">
                            <div class="fila" style={{ marginTop : 5 }}>
                                <span class="nombreSacr">Bautismo</span>
                                <input type="checkbox" id="fueTomadoB" name="fueTomadoB" class="checkbox"/>
                            </div>
                            <div class="fila" style={{ marginBottom: 5 }}>
                                <input type="date" id="fBautismo" name="fBautismo" class="fecha"/>
                                <label for="diocesisB" style={{ marginLeft: 30, width: 100 }}>Diócesis</label>
                                <input type="text" id="diocesisB" name="diocesisB"/>
                            </div>
                        </div>
                        <div class="sacramento">
                            <div class="fila" style={{ marginTop: 5 }}>
                                <span class="nombreSacr">Comunión</span>
                                <input type="checkbox" id="fueTomadoCom" name="fueTomadoCom" class="checkbox"/>
                            </div>
                            <div class="fila" style={{ marginBottom: 5}}>
                                <input type="date" id="fCom" name="fCom" class="fecha"/>
                                <label for="diocesisCom" style={{ marginLeft : 30, width: 100 }}>Diócesis</label>
                                <input type="text" id="diocesisCom" name="diocesisCom"/>
                            </div>
                        </div>
                        <div class="sacramento">
                            <div class="fila" style={{ marginTop: 5 }}>
                                <span class="nombreSacr">Confirmación</span>
                                <input type="checkbox" id="fueTomadoConf" name="fueTomadoConf" class="checkbox"/>
                            </div>
                            <div class="fila" style={{ marginBottom: 5 }}>
                                <input type="date" id="fConf" name="fConf" class="fecha"/>
                                <label for="diocesisConf" style={{ marginLeft: 30, width: 100 }}>Diócesis</label>
                                <input type="text" id="diocesisConf" name="diocesisConf"/>
                            </div>
                        </div>
                    </div>

                    <div class="contFoto2">
                        <div id="fotoAlumno" class="fotoAlumno"></div>
                        <input type="file" name="imagen" class="test" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Principal;
