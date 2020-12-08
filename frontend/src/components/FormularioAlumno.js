import Sacramento from "./Sacramento";
import React from 'react';

import * as Icon from 'react-feather';

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
                foto: null,
                anioCorrespondiente: '',
                estadoInscripcion: '' //TODO: mostrar cuando se hace el get por dni                
            },
            nombreFoto: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeFoto = this.handleChangeFoto.bind(this);
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
                        <button type="button" className="btn btn-primary boton" onClick={this.props.cambioPantalla}>
                            Continuar
                            <Icon.ArrowRight width={"1.3rem"} height={"1.3rem"} className="ml-1" />
                        </button>
                    </div>
                </div >

                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        {/*className="was-validated" */}
                        <form>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_basicos">
                                    <h3 className="card-title mb-1 titSeccion" id="datos_basicos">Datos Básicos</h3>
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_dni" htmlFor="dni">DNI</label>
                                                        <div className="col col-md-4">
                                                            <input className="form-control" type="text" id="dni" name="dni"
                                                                placeholder="Ingrese un Dni" alt="IngresoDni" required
                                                                value={this.state.alumno.dni} onChange={this.handleInputChange}
                                                                aria-labelledby="etiq_dni" aria-required="true" />
                                                        </div>
                                                        <div className="col-auto mx-3">
                                                            <button type="button" className="btn btn-primary boton"
                                                                id="dni" aria-labelledby="etiq_dni" onClick={this.searchAlumno}>
                                                                <div className="d-sm-block d-none">Buscar</div>
                                                                <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-md-1" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_nombre" htmlFor="nombre">Nombre</label>
                                                        <div className="col-sm">
                                                            <input type="text" className="form-control" id="nombre" name="nombre"
                                                                value={this.state.alumno.nombre} onChange={this.handleInputChange}
                                                                required aria-labelledby="etiq_nombre" aria-required="true" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_apellido" htmlFor="apellido">Apellido</label>
                                                        <div className="col-sm">
                                                            <input type="text" className="form-control" id="apellido" name="apellido"
                                                                value={this.state.alumno.apellido} onChange={this.handleInputChange}
                                                                required aria-labelledby="etiq_apellido" aria-required="true" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_genero" htmlFor="genero">Género</label>
                                                        <div className="col-sm">
                                                            <select id="genero" name="genero" className="form-control" required
                                                                value={this.state.alumno.genero} onChange={this.handleInputChange}
                                                                aria-labelledby="etiq_genero" aria-required="true">
                                                                <option value="Seleccione">Seleccione</option>
                                                                <option value="Masculino">Masculino</option>
                                                                <option value="Femenino">Femenino</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 ">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 align-self-start requerido" id="etiq_email" htmlFor="email">Email</label>
                                                        <div className="col-md">
                                                            {/*aria-describedby="emailHelp"*/}
                                                            <input type="email" id="email" name="email" className="form-control"
                                                                value={this.state.alumno.email} onChange={this.handleInputChange}
                                                                aria-labelledby="etiq_email" required aria-required="true" />
                                                            {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-row text-center">
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_fnac" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                                        <div className="col-sm">
                                                            <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control"
                                                                value={this.state.alumno.fechaNacimiento} onChange={this.handleInputChange}
                                                                required aria-labelledby="etiq_fnac" aria-required="true" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_lnac" htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
                                                        <div className="col-sm">
                                                            <input type="text" id="lugarNacimiento" name="lugarNacimiento" className="form-control"
                                                                value={this.state.alumno.lugarNacimiento} onChange={this.handleInputChange}
                                                                required aria-labelledby="etiq_lnac" aria-required="true" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 ml-3 d-flex align-items-center">
                                            <div className="form-group row no-gutters mb-2 justify-content-center">
                                                <img src={this.state.alumno.foto} className="img-thumbnail m-2"
                                                    alt="Foto Alumno" />
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="fotoAlumno"
                                                        aria-describedby="etiq_falumno" onChange={this.handleChangeFoto} />
                                                    <label className="custom-file-label" id="etiq_falumno" htmlFor="fotoAlumno">Subir Foto Alumno</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col-9 card-body pt-2 pb-0" role="group" aria-labelledby="datos_escolares">
                                    <h3 className="card-title titSeccion" id="datos_escolares" >Datos Escolares</h3>
                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="fechaIngreso">Fecha de Ingreso</label>
                                                <div className="col-sm">
                                                    <input type="date" id="fechaIngreso" name="fechaIngreso" className="form-control"
                                                        value={this.state.alumno.fechaIngreso} onChange={this.handleInputChange}
                                                        required aria-required="true" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3" id="etiq_fegreso" htmlFor="fechaEgreso">Fecha de Egreso</label>
                                                <div className="col-sm">
                                                    <input type="date" id="fechaEgreso" name="fechaEgreso" className="form-control"
                                                        value={this.state.alumno.fechaEgreso} onChange={this.handleInputChange}
                                                        aria-labelledby="etiq_fegreso" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col px-3 py-1 my-1 mr-3 requerido" id="etiq_nescuela" htmlFor="nombreEscuelaAnt">Nombre Escuela Anterior</label>
                                                <div className="col-sm">
                                                    <input type="text" id="nombreEscuelaAnt" name="nombreEscuelaAnt" className="form-control"
                                                        value={this.state.alumno.nombreEscuelaAnt} onChange={this.handleInputChange}
                                                        required aria-labelledby="etiq_nescuela" aria-required="true" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col px-3 py-1 my-1 mr-3 requerido" id="etiq_acorresp" htmlFor="anioCorrespondiente">Año Correspondiente</label>
                                                <div className="col-sm">
                                                    <input type="number" id="anioCorrespondiente" name="anioCorrespondiente" className="form-control"
                                                        value={this.state.alumno.anioCorrespondiente} onChange={this.handleInputChange}
                                                        required min={"1"} max={"5"} aria-labelledby="etiq_acorresp" aria-required="true" />
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
        const fecha = actual.toISOString().substr(0, 10);
        return fecha;
    }
}

export default FormularioAlumno;