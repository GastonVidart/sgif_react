const { Component } = require("react");

class FormularioResponsable extends Component {
    render() {
        return (
            /*<!--Contenedor Derecha-->*/
            < div className="col" >

                {/*< !--Sub - Header Página-- >*/}
                < div className="row m-3 no-gutters justify-content-md-between align-items-center" >
                    <div className="pl-3 rounded-lg contTitulo">
                        <h2 className="m-0 titulo">Datos Responsable</h2>
                    </div>

                    {/* <!--BOTONES IFAZ-- > */}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-primary mr-1 boton" onClick={this.props.cambioPantalla}>Atrás</button>
                        {/*submit del formulario completo */}
                        <button type="button" className="btn btn-primary boton">Finalizar Inscripción</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div >

                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        <form>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col-10 card-body pt-2 pb-0" role="group" aria-labelledby="datos_basicos"> {/*<!--test-->*/}
                                    <h3 className="card-title mb-1 titSeccion" id="datos_basicos">Datos Básicos</h3>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="dni">DNI</label>
                                                <div className="col">
                                                    <input className="form-control" type="text" id="dni" name="dni"
                                                        placeholder="Ingrese un Dni" alt="IngresoDni" required />
                                                </div>
                                                <div className="col-auto mx-3">
                                                    <button type="button" className="w-100 btn btn-primary btnBuscar boton"
                                                        id="dni" onClick="searchResponsable()">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="cuil_cuit">CUIL/CUIT</label>
                                                <div className="col">
                                                    <input className="form-control" type="text" id="cuil_cuit" name="cuil_cuit"
                                                        alt="IngresoCuilCuit" required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="nombre">Nombre</label>
                                                <div className="col">
                                                    <input type="text" className="form-control" id="nombre" name="nombre" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="apellido">Apellido</label>
                                                <div className="col">
                                                    <input type="text" className="form-control" id="apellido" name="apellido" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-5">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="genero">Género</label>
                                                <div className="col">
                                                    <select name="genero" id="genero" className="form-control">
                                                        <option value="0">Seleccione</option>
                                                        <option value="1">Masculino</option>
                                                        <option value="2">Femenino</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row text-center">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col px-3 py-1 my-0 mr-3" htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                                                <div className="col">
                                                    <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col px-3 py-1 my-0 mr-3" htmlFor="lugarNac">Lugar de Nacimiento</label>
                                                <div className="col">
                                                    <input type="text" id="lugarNac" name="lugarNac" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row text-center">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="telefono">Teléfono</label>
                                                <div className="col">
                                                    <input type="text" id="telefono" name="telefono" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="email">Email</label>
                                                <div className="col">
                                                    <input type="email" id="email" className="form-control"
                                                        aria-describedby="emailHelp" />
                                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="direccion">
                                    <h3 className="card-title titSeccion" id="direccion">Dirección</h3>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="calle">Calle</label>
                                                <div className="col">
                                                    <input type="text" id="calle" name="calle" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="altura">Altura</label>
                                                <div className="col">
                                                    <input type="text" id="altura" name="altura" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="barrio">Barrio</label>
                                                <div className="col">
                                                    <input type="text" id="barrio" name="barrio" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="piso">Piso</label>
                                                <div className="col">
                                                    <input type="number" id="piso" name="piso" className="form-control" min={0} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="dpto">Dpto</label>
                                                <div className="col">
                                                    <input type="text" id="dpto" name="dpto" className="form-control" min={0} />
                                                </div>
                                            </div>
                                        </div><div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="tira">Tira</label>
                                                <div className="col">
                                                    <input type="text" id="tira" name="tira" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="modulo">Módulo</label>
                                                <div className="col">
                                                    <input type="text" id="modulo" name="modulo" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="localidad">Localidad</label>
                                                <div className="col">
                                                    <input type="text" id="localidad" name="localidad" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="provincia">Provincia</label>
                                                <div className="col">
                                                    <input type="text" id="provincia" name="provincia" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-4">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="codPostal">Codigo Postal</label>
                                                <div className="col">
                                                    <input type="number" id="codPostal" name="codPostal" className="form-control" min={0} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

export default FormularioResponsable;