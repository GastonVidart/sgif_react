import React from "react";
import * as Icon from 'react-feather';
import Alerta from "./Alerta";
import FormularioPadre from "./FormularioPadre";
import FormularioHermano from "./FormularioHermano";
import { Col, Nav, Row, Tab, TabContainer } from "react-bootstrap";

class CompletarFamilia extends React.Component {

    constructor() {
        super();
        this.state = {
            alertaRegistro: {
                title: 'Desea finalizar el registro?',
                texto: 'Si finaliza el registro se guardarán los cambios realizados hasta el momento.'
            },
            datosAlumno: {
                dni: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese un DNI",
                    habilitado: true
                },
                tipoDni: {
                    valor: 'DNI',
                    valido: true,
                    msjError: "Seleccione un Tipo de DNI",
                    habilitado: true
                },
                nombre: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese el nombre",
                    habilitado: true
                },
                apellido: {
                    valor: '',
                    valido: false,
                    msjError: "Ingrese el apellido",
                    habilitado: true
                },
                legajo: {
                    valor: '',
                    valido: true,
                    msjError: "Implementar",
                    habilitado: true
                },
                foto: {
                    valor: null,
                    valido: true,
                    msjError: "Foto Incorrecta",
                    habilitado: true,
                    nombreFoto: 'Subir Foto Alumno'
                },
            },
            //TODO: ver si aca y en el otro se extrae a un esquema a parte para mejor gestion
            paso0: {
                inputs: {
                    dni: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un DNI",
                        habilitado: true
                    },
                    tipoDni: {
                        valor: 'DNI',
                        valido: true,
                        msjError: "Seleccione un Tipo de DNI",
                        habilitado: true
                    },
                    nombre: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el nombre",
                        habilitado: false
                    },
                    apellido: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el apellido",
                        habilitado: false
                    },
                    genero: {
                        valor: '',
                        valido: false,
                        msjError: "Seleccione un género",
                        habilitado: false
                    },
                    email: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un email",
                        habilitado: false
                    },
                    fechaNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese la Fecha de Nacimiento",
                        habilitado: false
                    },
                    nacionalidad: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese la Nacionalidad",
                        habilitado: false
                    },
                    telefono: {
                        valor: '',
                        valido: true,
                        msjError: "Ingrese un Número de Tel.",
                        habilitado: false
                    },
                    ocupacion: {
                        valor: '',
                        valido: true,
                        msjError: "Fecha la Ocupación",
                        habilitado: false
                    },
                    lugarTrabajo: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el Lugar de Trabajo",
                        habilitado: false
                    },
                    telefonoLaboral: {
                        valor: '',
                        valido: true,
                        msjError: "Ingrese un Tel. Laboral",
                        habilitado: false
                    },
                    emailLaboral: {
                        valor: '',
                        valido: true,
                        msjError: "Ingrese un email",
                        habilitado: false
                    },
                    partidaNacimiento: {
                        valor: '',
                        valido: true,
                        msjError: "Partida de Nacimiento Inválida",
                        habilitado: true,
                        nombre: 'Subir Partida de Nacimiento'
                    },
                    //TODO: ver si va valido y msj de error*/
                    bautismo: {
                        valor: false,
                        habilitado: false
                    },
                    comunion: {
                        valor: false,
                        habilitado: false
                    },
                    confirmacion: {
                        valor: false,
                        habilitado: false
                    },
                    egresoPrimario: {
                        valor: false,
                        habilitado: false
                    },
                    egresoSecundario: {
                        valor: false,
                        habilitado: false
                    },
                    //TODO: ver si lo pongo en el form (componente) o en la barra de navegación o que se extraiga de ahi
                    relacionParentesco: {
                        valor: '',
                        habilitado: false,
                        valido: true,
                        msjError: "Parentezco inválido",
                    }
                },
            },
            paso1: {
                inputs: {
                    dni: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese un DNI",
                        habilitado: true
                    },
                    tipoDni: {
                        valor: 'DNI',
                        valido: true,
                        msjError: "Seleccione un Tipo de DNI",
                        habilitado: true
                    },
                    nombre: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el nombre",
                        habilitado: false
                    },
                    apellido: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese el apellido",
                        habilitado: false
                    },
                    genero: {
                        valor: '',
                        valido: false,
                        msjError: "Seleccione un género",
                        habilitado: false
                    },
                    fechaNacimiento: {
                        valor: '',
                        valido: false,
                        msjError: "Ingrese la Fecha de Nacimiento",
                        habilitado: false
                    },
                    escuelaActual: {
                        valor: '',
                        valido: true,
                        msjError: "Nombre de la Escuela Inválido",
                        habilitado: false
                    },
                    grado: {
                        valor: '',
                        valido: true,
                        msjError: "Grado Inválido",
                        habilitado: false
                    },
                    //TODO: ver que pasa aca
                    //hermanos: [{ type: Schema.Types.ObjectId, ref: 'Persona' }]
                }
            },
            spinnerAlumno: false,
            cantPasos: 1, //TODO: se incrementa cuando clickea el +, por defecto siempre esta el del padre
            pasoActual: 0,
        }

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);
        this.handleChangePersona = this.handleChangePersona.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChangeAlumno(event) {
        let valido, valorAux, nombreFoto, input;
        let inputAux = {};
        const target = event.target;
        const { id, value, type } = target;

        console.log("Alumno id target", id);

        valido = this.validarCampo(target);

        //Cambio de estado diferente
        if (id === "foto") {
            const archivo = target.files[0];
            if (archivo !== undefined) {
                valorAux = URL.createObjectURL(archivo);
                nombreFoto = archivo.name;
                inputAux = {
                    nombreFoto
                }
            } else {
                return;
            }
        } else {
            valorAux = type === 'checkbox' ? target.checked : value;
        }

        this.setState(state => {
            input = {
                ...state.datosAlumno[id],
                valor: valorAux,
                valido
            }
            Object.assign(input, inputAux);
            return {
                datosAlumno: {
                    ...state.datosAlumno,
                    [id]: input
                }
            }
        });
        return;
    }

    validarCampo(target) {
        const { id } = target;
        let validoAux = true;
        let validoHTML = target.checkValidity();

        if (validoHTML) {
            //Validación específica por campo
            //En cada case se debería cambiar el valor de validoAux, para condiciones adicionales
            switch (id) {
                /*case "dni":
                    //console.log("dni");
                    break;*/
                default:
                    //console.log("default");
                    break;
            }
        }
        return validoAux && validoHTML;
    }

    handleChangePersona(event) {
        let valido, valorAux, campo
        let inputAux = {};
        const target = event.target;
        const { id, value, type } = target;
        const paso = "paso" + this.state.pasoActual;

        console.log(paso, " id input: ", id);

        valido = this.validarCampo(target);

        /*partidaNacimiento: {
            valor: '',
            valido: true,
            msjError: "Partida de Nacimiento Inválida",
            habilitado: true,
            nombre: 'Subir Partida de Nacimiento'
        }*/

        //Cambio Partida Nac
        if (id === "partidaNacimiento") {
            const archivo = target.files[0];
            if (archivo != undefined) {
                valorAux = URL.createObjectURL(archivo);
                inputAux = {
                    nombre: archivo.name
                }
            } else {
                return;
            }
        } else {
            valorAux = type === "checkbox" ? target.checked : value;
        }
        this.setState(state => {
            campo = {
                ...state[paso].inputs[id],
                valor: valorAux,
                valido,
            }
            Object.assign(campo, inputAux);
            return {
                [paso]: {
                    ...state[paso],
                    inputs: {
                        ...state[paso].inputs,
                        [id]: campo
                    }
                }
            }
        })
    }

    handleSelect(idTab) {
        console.log("IdTab", idTab)
        this.setState({
            pasoActual: idTab
        })
    }

    render() {

        const { alertaRegistro, datosAlumno, spinnerAlumno } = this.state;

        return (
            <div className="col" role="main">
                {/*< !--Sub - Header Página-- >*/}
                < div className="row m-3 no-gutters justify-content-sm-between align-items-center" >
                    <div className="pl-3 rounded-lg contTitulo">
                        <h2 className="m-0 titulo">Completar Familia</h2>
                    </div>

                    {/* <!--BOTONES IFAZ-- > */}
                    <div className="d-flex justify-content-between ml-2 mt-2">
                        {/*TODO: refactor alerta */}
                        <Alerta datos={alertaRegistro} />
                    </div>
                </div >
                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        {/*<form className={formulario.validar ? "was-validated" : ""} noValidate> */}
                        <form noValidate>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_alumno">
                                    <h3 className="card-title my-2 titSeccion" id="datos_alumno ">Datos Alumno</h3>
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <div className="form-row">
                                                <div className="col-xl-8">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_dni" htmlFor="dni">DNI</label>
                                                        {/*className= "... ml-3 ..." */}
                                                        <div className="col-auto ml-md-3 mr-3 order-md-12">
                                                            <button type="button" className="btn btn-primary boton"
                                                                id="dni" aria-labelledby="etiq_dni" onClick={this.props.searchAlumno}>
                                                                <div className={!spinnerAlumno ? '' : 'd-none'}>
                                                                    Buscar
                                                                    <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-1" />
                                                                </div>
                                                                <div className={`spinner-border spinner-border-sm text-light my-1 ${spinnerAlumno ? '' : 'd-none'}`} role="status">
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                {/*<div className="d-sm-block d-none">Buscar</div>
                                                                <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-md-1" />*/}
                                                            </button>

                                                            {/*<Notificacion />*/}
                                                        </div>
                                                        <div className="col-xs col-md">
                                                            <div className="input-group">
                                                                <input className="form-control" type="text" id="dni" name="dni"
                                                                    placeholder="Ingrese un Dni" alt="IngresoDni" required
                                                                    value={datosAlumno.dni.valor} onChange={this.handleChangeAlumno}
                                                                    aria-labelledby="etiq_dni" aria-required="true"
                                                                />
                                                                <div className="invalid-feedback">
                                                                    {datosAlumno.dni.msjError}
                                                                </div>
                                                                <div className="input-group-append">
                                                                    <label className="d-none" id="etiq_tipo_dni" htmlFor="tipoDni">Tipo DNI</label>
                                                                    <select id="tipoDni" name="tipoDni" className="form-control" required
                                                                        value={datosAlumno.tipoDni.valor} onChange={this.handleChangeAlumno}
                                                                        aria-labelledby="etiq_tipo_dni" aria-required="true" aria-expanded="false">
                                                                        <option value="DNI">DNI</option>
                                                                        <option value="LC">LC</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <div className="col-auto  mr-3 input-group">
                                                            <div className="input-group-prepend">
                                                                <span id="etiq_legajo" className="input-group-text">Legajo</span>
                                                            </div>
                                                            <input type="number" className="form-control" id="legajo" name="legajo"
                                                                value={datosAlumno.legajo.valor}
                                                                aria-labelledby="etiq_legajo" disabled />
                                                        </div>
                                                    </div>
                                                </div >
                                            </div>

                                            <div className="form-row">
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3" id="etiq_nombre" htmlFor="nombre">Nombre</label>
                                                        <div className="col-sm">
                                                            <input type="text" className="form-control" id="nombre" name="nombre"
                                                                value={datosAlumno.nombre.valor} onChange={this.handleChangeAlumno}
                                                                aria-labelledby="etiq_nombre" disabled />
                                                            <div className="invalid-feedback">
                                                                {datosAlumno.nombre.msjError}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3" id="etiq_apellido" htmlFor="apellido">Apellido</label>
                                                        <div className="col-sm">
                                                            <input type="text" className="form-control" id="apellido" name="apellido"
                                                                value={datosAlumno.apellido.valor} onChange={this.handleChangeAlumno}
                                                                aria-labelledby="etiq_apellido" disabled />
                                                            <div className="invalid-feedback">
                                                                {datosAlumno.apellido.msjError}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 ml-3 d-flex align-items-center">
                                            {/*TODO: alinear foto al centro*/}
                                            <div className="form-group row no-gutters mb-2 align-items-middle justify-content-center">
                                                <img src={datosAlumno.foto.valor} className="img-thumbnail m-2"
                                                    alt="Foto Alumno" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*TODO: ver aria-labelledby, ver titulo de la seccion*/}
                                    <Row className="no-gutters mt-3">
                                        <Col>
                                            <TabContainer id="left-tabs-example" defaultActiveKey="0" onSelect={this.handleSelect}>
                                                <Row className="no-gutters">
                                                    {/*TODO: arreglar pading 0.9 */}
                                                    <Col>
                                                        <Nav variant="tabs">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="0">Padre</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="1">Hermano</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </Col>
                                                </Row>
                                                <div className="row no-gutters mb-3 card shadow-sm border-top-0">
                                                    <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_familiar">
                                                        <Row className="row no-gutters px-3">
                                                            <Col>
                                                                <Tab.Content>
                                                                    <Tab.Pane eventKey="0">
                                                                        <FormularioPadre
                                                                            formulario={this.state.paso0}
                                                                            handleInputChange={this.handleChangePersona} />
                                                                    </Tab.Pane>
                                                                    <Tab.Pane eventKey="1">
                                                                        <FormularioHermano
                                                                            formulario={this.state.paso1}
                                                                            handleInputChange={this.handleChangePersona} />
                                                                    </Tab.Pane>
                                                                </Tab.Content>
                                                            </Col>
                                                        </Row>
                                                    </div></div>
                                            </TabContainer>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompletarFamilia;