import Sacramento from "./Sacramento";

const { Component } = require("react");

class FormularioAlumno extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /*<!--Contenedor Derecha-->*/
            <div className="col">
                
                {/*< !--Sub - Header Página-- >*/}
                < div className="row m-3 no-gutters justify-content-md-between align-items-center" >
                    <div className="pl-3 rounded-lg contTitulo">
                        <h2 className="m-0 titulo">Inscribir Alumno</h2>
                    </div>

                    {/* <!--BOTONES IFAZ-- > */}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-primary mr-1 boton">Completar Familia</button>
                        <button type="button" className="btn btn-primary boton" onClick={this.props.cambioPantalla}>Continuar</button>
                    </div>
                </div >

                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        {/*className="was-validated" */}
                        <form>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col-8 card-body pt-2 pb-0"> {/*<!--test-->*/}
                                    <h3 className="card-title mb-1 titSeccion">Datos Básicos</h3>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="dni">DNI</label>
                                                <div className="col-4">
                                                    <input className="form-control" type="text" id="dni" name="dni"
                                                        placeholder="Ingrese un Dni ..." alt="IngresoDni" required />
                                                </div>
                                                <div className="col-auto mx-3">
                                                    <button type="button" className="btn btn-primary btnBuscar boton"
                                                        id="searchAlumno" onClick="searchAlumno()">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="nombre">Nombre</label>
                                                <div className="col">
                                                    <input type="text" className="form-control" id="nombre" name="nombre" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="apellido">Apellido</label>
                                                <div className="col">
                                                    <input type="text" className="form-control" id="apellido" name="apellido" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="genero">Género</label>
                                                <div className="col">
                                                    <select name="genero" id="genero" className="form-control">
                                                        <option value="">Seleccione</option>
                                                        <option value="Masculino">Masculino</option>
                                                        <option value="Femenino">Femenino</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="email">Email</label>
                                                <div className="col">
                                                    <input type="email" id="email" className="form-control"
                                                        aria-describedby="emailHelp" />
                                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row text-center">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col px-3 py-1 my-0 mr-3" for="fNacimiento">Fecha de Nacimiento</label>
                                                <div className="col">
                                                    <input type="date" id="fNacimiento" name="fNacimiento" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col px-3 py-1 my-0 mr-3" for="lugarNac">Lugar de Nacimiento</label>
                                                <div className="col">
                                                    <input type="text" id="lugarNac" name="lugarNac" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<!--test-->*/}
                                <div className="col">
                                    FOTO
                                <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col-8 card-body pt-2 pb-0">
                                    <h3 className="card-title titSeccion">Datos Escolares</h3>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="fIngreso">Fecha de Ingreso</label>
                                                <div className="col">
                                                    <input type="date" id="fIngreso" name="fIngreso" className="form-control" defaultValue={fechaDefault()} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="fEgreso">Fecha de Egreso</label>
                                                <div className="col">
                                                    <input type="date" id="fEgreso" name="fEgreso" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" for="nombreEscuela">Nombre Escuela Anterior</label>
                                                <div className="col">
                                                    <input type="text" id="nombreEscuela" name="nombreEscuela" className="form-control" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col card-body pt-2 pb-0">
                                    <h3 className="card-title titSeccion">Sacramentos</h3>
                                    <Sacramento nombre={"Bautismo"} />
                                    <Sacramento nombre={"Comunión"} />
                                    <Sacramento nombre={"Confirmación"} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }

}

const estiloDiocesis = {
    marginLeft: "30px",
    width: "100px"
}

function fechaDefault() {
    const actual = new Date();
    const fecha = actual.toISOString().substr(0, 10);
    return fecha;
}

export default FormularioAlumno;