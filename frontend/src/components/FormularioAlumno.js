import Sacramento from "./Sacramento";
import React, { Component } from 'react';

class FormularioAlumno extends React.Component {
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
                legajo: '', //TODO: mostrar cuando se hace el get por dni  
                fechaIngreso: this.fechaDefault(),
                fechaEgreso: '',
                nombreEscuelaAnt: '',
                sacramento: [], //TODO: ver lo del sacramento
                foto: '',
                anioCorrespondiente: '',
                estadoInscripcion: '' //TODO: mostrar cuando se hace el get por dni                
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    /*componentDidMount(){ sino hacerlo antes de este punto, que valide el navbar
        hacer validar fecha inscripción
        si no puede dar error, sino seguir
    }*/

    handleInputChange(event) {
        console.log(event);
        const target = event.target;        
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("valor ", target.value);
        console.log("nombre target", target.name)

        this.setState(estadoPrevio => ({
            alumno: {
                ...estadoPrevio.alumno,
                [name]: value
            }
        }));
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
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col-8 card-body pt-2 pb-0" role="group" aria-labelledby="datos_basicos"> {/*<!--test-->*/}
                                    <h3 className="card-title mb-1 titSeccion" id="datos_basicos">Datos Básicos</h3>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="dni">DNI</label>
                                                <div className="col-4">
                                                    <input className="form-control" type="text" id="dni" name="dni"
                                                        placeholder="Ingrese un Dni" alt="IngresoDni" required
                                                        value={this.state.alumno.dni} onChange={this.handleInputChange} />
                                                </div>
                                                <div className="col-auto mx-3">
                                                    <button type="button" className="btn btn-primary btnBuscar boton"
                                                        id="dni" aria-labelledby="dni" onClick={this.searchAlumno}>Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="nombre">Nombre</label>
                                                <div className="col">
                                                    <input type="text" className="form-control" id="nombre" name="nombre"
                                                        value={this.state.alumno.nombre} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="apellido">Apellido</label>
                                                <div className="col">
                                                    <input type="text" className="form-control" id="apellido" name="apellido"
                                                        value={this.state.alumno.apellido} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="genero">Género</label>
                                                <div className="col">
                                                    <select id="genero" name="genero" className="form-control"
                                                        value={this.state.alumno.genero} onChange={this.handleInputChange}>
                                                        <option value="Seleccione">Seleccione</option>
                                                        <option value="Masculino">Masculino</option>
                                                        <option value="Femenino">Femenino</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="email">Email</label>
                                                <div className="col">
                                                    <input type="email" id="email" className="form-control" aria-describedby="emailHelp"
                                                        value={this.state.alumno.email} onChange={this.handleInputChange} />
                                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row text-center">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col px-3 py-1 my-0 mr-3" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                                <div className="col">
                                                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control"
                                                        value={this.state.alumno.fechaNacimiento} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col px-3 py-1 my-0 mr-3" htmlFor="lugarNac">Lugar de Nacimiento</label>
                                                <div className="col">
                                                    <input type="text" id="lugarNac" name="lugarNac" className="form-control"
                                                        value={this.state.alumno.lugarNacimiento} onChange={this.handleInputChange} />
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
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    {/*<input type="submit" name="submit" value="Submit" className="btn btn-primary"/>*/}
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col-8 card-body pt-2 pb-0" role="group" aria-labelledby="datos_escolares">
                                    <h3 className="card-title titSeccion" id="datos_escolares" >Datos Escolares</h3>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="fechaIngreso">Fecha de Ingreso</label>
                                                <div className="col">
                                                    <input type="date" id="fechaIngreso" name="fechaIngreso" className="form-control"
                                                        value={this.state.alumno.fechaIngreso} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="fEgreso">Fecha de Egreso</label>
                                                <div className="col">
                                                    <input type="date" id="fEgreso" name="fEgreso" className="form-control"
                                                        value={this.state.alumno.fechaEgreso} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3" htmlFor="nombreEscuela">Nombre Escuela Anterior</label>
                                                <div className="col">
                                                    <input type="text" id="nombreEscuela" name="nombreEscuela" className="form-control"
                                                        value={this.state.alumno.nombreEscuelaAnt} onChange={this.handleInputChange} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="sacramentos">
                                    <h3 className="card-title titSeccion" id="sacramentos">Sacramentos</h3>
                                    {/* TODO: ver para que actualice dentro del arreglo sacramento
                                    * value={this.state.alumno.fechaIngreso} onChange={this.handleInputChange} */}
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

    searchAlumno = async () => {
        //usar el state o refs
        const dniAlumno = document.getElementById('dni').value;
        console.log("dni", dniAlumno);
        fetch('http://localhost:5000/insc-alumno/alumno/' + dniAlumno)
            .then(response => response.json())
            .then(data => {
                console.log("data:", data)
                const datos = data.response.alumnoDB

                //TODO: controlar inscripción / reinscripción

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

    fechaDefault() {
        const actual = new Date();
        const fecha = actual.toISOString().substr(0, 10); //TODO: revisar fecha puede dar error dia adelantado        
        return fecha;
    }

    /*getFormattedDate(fecha) {
        var month = fecha.getMonth() + 1;
        const dayAux = fecha.getDate();
        var day = dayAux < 10 ? ("0" + dayAux) : dayAux;
        var year = fecha.getFullYear();
        return year + "-" + month + "-" + day;
    }*/
}

export default FormularioAlumno;