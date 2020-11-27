import React, { Component } from "react";

import '../css/formulario.css';

class Principal extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div class="col">
                {/*<!--Contenedor Derecha-->*/}

                {/*< !--Sub - Header Página-- >*/}
                < div class="row m-3 no-gutters justify-content-md-between align-items-center" >
                    <div class="pl-3 rounded-lg contTitulo">
                        <h2 class="m-0 titulo">Inscribir Alumno</h2>
                    </div>

                    {/* <!--BOTONES IFAZ-- > */}
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-primary mr-1 boton">Completar Familia</button>
                        <button type="button" class="btn btn-primary boton" onClick="cambioPagina()">Continuar</button>
                    </div>
                </div >

                {/* < !--Formulario--> */}
                <div class="row m-3 p-3 rounded-lg no-gutters contFormulario test">
                    <div class="col">
                        <form>
                            {/* <!--shadow-sm--> */}
                            <div class="row no-gutters px-3 mb-3 card">
                                <div class="col-8 card-body pt-2 "> {/*<!--test-->*/}
                                    <h3 class="card-title mb-1 titSeccion">Datos Básicos</h3>

                                    <div class="form-row">
                                        <div class="col">
                                            <div class="form-group row no-gutters align-items-center">
                                                <label class="col-auto px-3 py-1 my-0 mr-3" for="dni">DNI</label>
                                                <div class="col-4">
                                                    <input class="form-control" type="text" id="dni" name="dni"
                                                        placeholder="Ingrese un Dni ..." alt="IngresoDni" required />
                                                </div>
                                                <div class="col-auto mx-3">
                                                    <button type="button" class="btn btn-primary btnBuscar boton"
                                                        id="searchAlumno" onClick="searchAlumno()">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="col">
                                            <div class="form-group row no-gutters align-items-center">
                                                <label class="col-auto px-3 py-1 my-0 mr-3" for="nombre">Nombre</label>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="nombre" name="nombre" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group row no-gutters align-items-center">
                                                <label class="col-auto px-3 py-1 my-0 mr-3" for="apellido">Apellido</label>
                                                <div class="col">
                                                    <input type="text" class="form-control" id="apellido" name="apellido" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="col">
                                            <div class="form-group row no-gutters align-items-center">
                                                <label class="col-auto px-3 py-1 my-0 mr-3" for="genero">Genero</label>
                                                {/* <!--completar con lo que viene de prismic--> */}
                                                <div class="col">
                                                    <select name="genero" id="genero" class="form-control">
                                                        <option value="">Seleccione</option>
                                                        <option value="Masculino">Masculino</option>
                                                        <option value="Femenino">Femenino</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="form-group row no-gutters align-items-center">
                                                <label class="col-auto px-3 py-1 my-0 mr-3" for="email">Email</label>
                                                <div class="col">
                                                    <input type="email" id="email" class="form-control"
                                                        aria-describedby="emailHelp" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<!--test-->*/}
                                <div class="col"> 
                                FOTO
                                <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                            <div class="row no-gutters px-3 mb-3 card">
                                <div class="col card-body pt-2">
                                    <h3 class="card-title titSeccion">Datos Escolares</h3>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                                        anyone
                                        else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                </div>
                            </div>
                            <div class="row no-gutters px-3 mb-3 card">
                                <div class="col card-body pt-2">
                                    <h3 class="card-title titSeccion">Sacramentos</h3>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with
                                        anyone
                                        else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Principal;
