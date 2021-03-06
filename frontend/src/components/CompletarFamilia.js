import React from "react";
import shortid from "shortid";
import * as Icon from 'react-feather';
import AlertaCompletarFamilia from "./AlertaCompletarFamilia";
import { Col, Nav, Row, Tab, TabContainer } from "react-bootstrap";
import ModalFormNuevo from "./ModalFormNuevo";
import { NoExistePersona, BadRequest } from "../utils/Errores";
import { Tipo } from "./Notificacion";

const urlBase = 'http://localhost:5000/completar-familia';

class CompletarFamilia extends React.Component {

    constructor(props) {
        super(props);

        //Extrae de los props los datos necesarios para hacer reinscripcion
        const { alumno, esReinscripcion } = this.props;

        this.state = {
            alertaRegistro: {
                title: 'Desea finalizar el registro?',
                texto: 'Si finaliza el registro se guardarán los cambios realizados hasta el momento.'
            },
            modalFormNuevo: {
                title: 'Nuevo Familiar',
                texto: 'Si finaliza el registro se guardarán los cambios realizados hasta el momento.',
                tipos: ['Padre', 'Hermano']
            },            
            datosAlumno: {
                dni: {
                    valor: esReinscripcion ? alumno.dni : '',
                    valido: false,
                    msjError: "Ingrese un DNI",
                    habilitado: !esReinscripcion
                },
                tipoDni: {
                    valor: esReinscripcion ? alumno.tipoDni : 'DNI',
                    msjError: "Seleccione un Tipo de DNI",
                    habilitado: !esReinscripcion
                },
                nombre: {
                    valor: '',
                },
                apellido: {
                    valor: '',
                },
                legajo: {
                    valor: '',
                },
                foto: {
                    valor: null,
                    nombreFoto: 'Subir Foto Alumno'
                },
            },
            oidAlumno: esReinscripcion ? alumno.oidAlumno : '',
            spinnerAlumno: false,
            cantPasos: 0,
            pasoActual: 0,
            proxIdForm: 0,
            formularios: [],
            tabs: [],
            formulariosRef: [],
            validar: false,
            tabsHabilitadas: false
        }
        //this.formulariosBase = [];

        this.handleChangeAlumno = this.handleChangeAlumno.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.registrar = this.registrar.bind(this);
        this.addFormulario = this.addFormulario.bind(this);
    }

    //TODO: cuando se cree por boton, hay que poner los props que van a inicializar al formulario, solo se mandarian valores
    addFormulario = async tipo => {
        console.log(`Cargando Formulario ${tipo}...`);
        const exito = await import(`./Formularios/Formulario${tipo}.js`)
            .then(Component => {
                this.setState(state => {
                    const idFormulario = state.proxIdForm;
                    {/*style={{width:"50px"}} */ }
                    return {
                        formularios: state.formularios.concat(
                            <Tab.Pane key={shortid.generate()} eventKey={idFormulario}>
                                <Component.default urlBase={urlBase}
                                    ref={(formulario) => { state.formulariosRef.push(formulario) }}
                                    addNotificacion={this.props.addNotificacion} id={idFormulario} />
                            </Tab.Pane>),
                        tabs: state.tabs.concat(
                            <Nav.Item key={shortid.generate()}>
                                <Nav.Link eventKey={idFormulario} className="d-flex align-items-center">
                                    <span>{tipo}</span>
                                    <button type="button" className="btn btn-link ml-1 p-0" onClick={() => this.delTab(idFormulario)}>
                                        <Icon.X role="img" alt="Cerrar Pestaña" width={"1.2rem"} height={"1.2rem"} />
                                    </button>
                                </Nav.Link>
                            </Nav.Item>,
                        ),
                        cantPasos: state.cantPasos + 1,
                        proxIdForm: state.proxIdForm + 1
                    }
                })
                return true;
            })
            .catch(error => {
                console.log(`Formulario${tipo} Inválido.`)
                return false;
            })
        return exito;
    }

    delTab(idForm) {
        //console.log("indexTab", idForm)
        this.setState(state => {
            const tabs = [...state.tabs];
            const formularios = [...state.formularios];
            const formulariosRef = [...state.formulariosRef];
            let index = -1;
            let i = 0;

            while (i < formulariosRef.length && index === -1) {
                const form = formulariosRef[i];
                //console.log("idForm", form.getId())
                if (form.getId() === idForm) {
                    index = i;
                }
                i++;
            }

            let aux = {};
            if (index !== -1) {
                tabs.splice(index, 1);
                formularios.splice(index, 1);
                formulariosRef.splice(index, 1);
                const proxPaso = formulariosRef.length > 0 ? formulariosRef[index > 0 ? index - 1 : 0].getId() : 0;
                console.log("proxpaso", proxPaso)
                aux = {
                    //FIXME: no actualiza el paso actual, porque????
                    //TODO: si la var esta en el active key no actualiza bien                    
                    pasoActual: proxPaso,
                    tabs,
                    formularios,
                    formulariosRef
                }
            }
            return aux;
        })
    }

    async componentDidMount() {
        const { esReinscripcion } = this.props;
        //Se cargan los datos del alumno que se esta reinscribiendo        
        if (esReinscripcion) {
            this.searchReinscripto();
        }
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

    handleSelect(idTab) {
        console.log("IdTab", idTab)
        this.setState({
            pasoActual: idTab
        })
    }

    registrar() {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        let registro;
        let creaciones = [];
        if (this.state.oidAlumno === '') {
            mensajeNotif = "Debe Buscar un Alumno Existente.";
            addNotificacion(Tipo.Error, mensajeNotif);
            console.error("Error:", mensajeNotif);
            this.setState({ validar: true })
            return Promise.resolve(false);
        }

        if (this.formulariosValidos()) {
            console.log("Formularios Válidos")
            const formularios = this.state.formulariosRef;
            creaciones = formularios.map(form => {
                return form.registrarPersona(this.state.oidAlumno);
            })
        } else {
            if (this.state.formulariosRef.length > 0) {
                mensajeNotif = "Hay un Formulario Inválido. Revise Nuevamente!";
            } else {
                mensajeNotif = "Debe registrar al menos un familiar";
            }
            //FIXME: problemas cuando el alumno si tiene familiares
            addNotificacion(Tipo.Error, mensajeNotif);
            console.error("Error:", mensajeNotif);
            this.setState({ validar: true })
            registro = Promise.resolve(false);
        }
        if (creaciones.length > 0) {
            registro = Promise.all(creaciones).then(registraron => {
                console.log("Registros Realizados", registraron)
                const huboRegistro = registraron.every(idRegistro => {
                    console.log("idRegistro", idRegistro)
                    return idRegistro !== false
                })
                if (huboRegistro) {
                    mensajeNotif = "Registro Familiares Exitoso.";
                    addNotificacion(Tipo.Exito, mensajeNotif);
                    console.log("Notificación:", mensajeNotif);
                    this.setState({ validar: true })
                    return true;
                } else {
                    //FIXME: poner una var que diga si registro o no en cada componente, de ahi se revisan todos y se vuele a intentar en los que no anduvo                    
                    return false;
                }
            })
        }
        return registro;
    }

    searchAlumno = async () => {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        const dniAlumno = this.state.datosAlumno.dni.valor;
        console.log("Search Alumno dni:", dniAlumno);
        if (dniAlumno === '') {
            mensajeNotif = "Dni Alumno Vacío.";
            addNotificacion(Tipo.Alerta, mensajeNotif);
            console.log("Notificación:", mensajeNotif);
            return;
        }

        this.toggleSpinner();

        fetch(urlBase + '/alumno/dni/' + dniAlumno)
            .then(response => {
                return response.json().then(data => {
                    //console.log("Completar Familia - Status Search Alumno", response.status)
                    if (response.status === 404) {
                        throw new NoExistePersona(data.message)
                    } else if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message)
                    }
                    return data;
                })
            })
            .then(data => {
                //console.log("Alumno Encontrado ", data);
                const datos = data.alumno;
                //TODO: extraer familiares y agregar sus componentes correspondientes
                this.setState(state => {
                    let nuevoEstado = {};
                    Object.assign(nuevoEstado, this.reiniciarTransaccion());
                    Object.assign(nuevoEstado, {
                        datosAlumno: this.extraeDatosAlumno(state, datos),
                        oidAlumno: data.alumno._id,
                        tabsHabilitadas: true,
                    })
                    return nuevoEstado
                })
                this.toggleSpinner();
                mensajeNotif = "Alumno encontrado con el DNI ingresado.";
                addNotificacion(Tipo.Exito, mensajeNotif);
                console.log("Notificación:", mensajeNotif, "oid Alumno", data.alumno._id);
                if (datos.padres.length !== 0) {
                    mensajeNotif = `El alumno posee ${datos.padres.length} Padres y ${datos.hermanos.length} Hermanos`;
                } else {
                    mensajeNotif = `El alumno no posee Padres y posee ${datos.hermanos.length} Hermanos`;
                }
                addNotificacion(Tipo.Alerta, mensajeNotif);
                console.log("Notificación:", mensajeNotif, "oid Alumno", data.alumno._id);
            })
            .catch(err => {
                if (err instanceof NoExistePersona) {
                    mensajeNotif = err.message;
                } else {
                    mensajeNotif = "Error Search Alumno: " + err.message;
                }
                this.setState(state => {
                    let nuevoEstado = {};
                    Object.assign(nuevoEstado, this.reiniciarTransaccion());
                    Object.assign(nuevoEstado, {
                        datosAlumno: this.reiniciarFormulario(state),
                        oidAlumno: ''
                    });
                    return nuevoEstado
                })
                if (this.state.spinnerAlumno) {
                    this.toggleSpinner();
                }
                addNotificacion(Tipo.Error, mensajeNotif);
                console.error("Error: ", err);
            })
    }

    toggleSpinner() {
        this.setState(state => {
            return {
                spinnerAlumno: !state.spinnerAlumno
            }
        })
    }

    searchReinscripto = async () => {
        const { addNotificacion } = this.props;
        let mensajeNotif;
        const oidAlumno = this.state.oidAlumno;
        console.log("Search Alumno oid:", oidAlumno);
        if (oidAlumno === '' || oidAlumno === undefined) {
            mensajeNotif = "OID Alumno Vacío";
            addNotificacion(Tipo.Alerta, mensajeNotif);
            console.log("Notificación:", mensajeNotif);
            return;
        }

        this.toggleSpinner();

        fetch(urlBase + '/alumno/oid/' + oidAlumno)
            .then(response => {
                return response.json().then(data => {
                    console.log("Completar Familia - Status Search Alumno OID", response.status)
                    if (response.status === 404) {
                        throw new NoExistePersona(data.message)
                    } else if (response.status === 400) {
                        throw new BadRequest(data.message);
                    } else if (response.status === 500) {
                        throw new Error(data.message)
                    }
                    return data;
                })
            })
            .then(data => {
                //console.log("Alumno a Reinscribir Encontrado ", data);
                const datos = data.alumno;
                //TODO: extraer familiares y agregar sus componentes correspondientes, no estaba en transac                
                this.setState(state => {
                    let nuevoEstado = {};
                    Object.assign(nuevoEstado, this.reiniciarTransaccion());
                    Object.assign(nuevoEstado, {
                        oidAlumno: data.alumno._id,
                        tabsHabilitadas: true,
                        datosAlumno: this.extraeDatosAlumno(state, datos)
                    })
                    return nuevoEstado
                })
                this.toggleSpinner();
                if (datos.padres.length !== 0) {
                    mensajeNotif = `El alumno posee ${datos.padres.length} Padres y ${datos.hermanos.length} Hermanos`;
                } else {
                    mensajeNotif = `El alumno no posee Padres y posee ${datos.hermanos.length} Hermanos`;
                }
                addNotificacion(Tipo.Alerta, mensajeNotif);
                console.log("Notificación:", mensajeNotif, "oid Alumno", data.alumno._id);
            })
            .catch(err => {
                if (err instanceof NoExistePersona) {
                    mensajeNotif = err.message
                } else {
                    mensajeNotif = "Error Search Alumno: " + err.message;
                }
                this.setState(state => {
                    let nuevoEstado = {};
                    Object.assign(nuevoEstado, this.reiniciarTransaccion());
                    Object.assign(nuevoEstado, { datosAlumno: this.reiniciarFormulario(state), });
                    return nuevoEstado
                })
                if (this.state.spinnerAlumno) {
                    this.toggleSpinner();
                }

                addNotificacion(Tipo.Error, mensajeNotif);
                console.error("Error: ", err);
                //Vuelve a la transaccion anterior
                this.props.inscripcion();
            })
    }

    render() {
        const { alertaRegistro, modalFormNuevo, datosAlumno, spinnerAlumno,
            formularios, tabs, validar, tabsHabilitadas, pasoActual } = this.state;
        const { inscripcion, esReinscripcion } = this.props;

        let componentes, navLinks;
        if (formularios.length === 0) {
            componentes = <div className="mb-2">Agregue un nuevo Familiar</div>;
            navLinks = <div className="mx-2">No existen Familiares</div>;
        } else {
            componentes = formularios;
            navLinks = tabs;
        }
        //console.log(componentes)
        //console.log("pasoActual", pasoActual)        

        return (
            <div className="col" role="main">
                {/*< !--Sub - Header Página-- >*/}
                < div className="row m-3 no-gutters justify-content-sm-between align-items-center" >
                    <div className="pl-3 rounded-lg contTitulo">
                        <h2 className="m-0 titulo">Completar Familia</h2>
                    </div>

                    {/* <!--BOTONES IFAZ-- > */}
                    <div className="d-flex justify-content-between ml-2 mt-2">
                        <button type="button" className={`btn btn-secondary boton botonSecundario mr-1 ${!esReinscripcion ? '' : 'd-none'}`}
                            onClick={() => { window.location.href = '/'; }}>
                            Cancelar
                        </button>
                        <button type="button" className={`btn btn-primary boton botonSecundario  mr-1 ${esReinscripcion ? '' : 'd-none'}`} onClick={inscripcion}>
                            <Icon.ArrowLeft width={"1.3rem"} height={"1.3rem"} />
                        </button>
                        <AlertaCompletarFamilia
                            datos={alertaRegistro}
                            reinscripcion={esReinscripcion}
                            funciones={{
                                registrar: this.registrar,
                                inscribir: inscripcion
                            }}
                        />
                    </div>
                </div >
                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        <form className={validar ? "was-validated" : ""} noValidate>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card shadow">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_alumno">
                                    <h3 className="card-title my-2 titSeccion" id="datos_alumno">Datos Alumno</h3>
                                    <div className="row no-gutters">
                                        <div className="col">
                                            <div className="form-row">
                                                <div className="col-xl-8">
                                                    <div className="form-group row no-gutters mb-2 align-items-center">
                                                        <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_dni" htmlFor="dni">DNI</label>
                                                        {/*className= "... ml-3 ..." */}
                                                        <div className="col-auto ml-md-3 mr-3 order-md-12">
                                                            <button type="button" className="btn btn-primary boton"
                                                                id="dni" aria-labelledby="etiq_dni" onClick={this.searchAlumno}>
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
                                                                    aria-labelledby="etiq_dni" aria-required="true" disabled={!datosAlumno.dni.habilitado}
                                                                />
                                                                <div className="invalid-feedback">
                                                                    {datosAlumno.dni.msjError}
                                                                </div>
                                                                <div className="input-group-append">
                                                                    <label className="d-none" id="etiq_tipo_dni" htmlFor="tipoDni">Tipo DNI</label>
                                                                    <select id="tipoDni" name="tipoDni" className="form-control" required
                                                                        value={datosAlumno.tipoDni.valor} onChange={this.handleChangeAlumno}
                                                                        aria-labelledby="etiq_tipo_dni" aria-required="true" aria-expanded="false"
                                                                        disabled={!datosAlumno.dni.habilitado}>
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
                                            <div className="form-group row no-gutters mb-2 w-100 justify-content-center">
                                                <img src={datosAlumno.foto.valor} className="img-thumbnail m-2"
                                                    alt="Foto Alumno" />
                                            </div>
                                        </div>
                                    </div>
                                    {/*TODO: ver aria-labelledby, ver titulo de la seccion*/}
                                    <Row className="no-gutters mt-3">
                                        <Col>
                                            <TabContainer id="left-tabs-example" activeKey={pasoActual} onSelect={this.handleSelect}>
                                                <Row className="no-gutters">
                                                    <Col>
                                                        <Nav variant="tabs">
                                                            {navLinks}
                                                            <ModalFormNuevo
                                                                datos={modalFormNuevo}
                                                                funciones={{ nuevo: this.addFormulario }}
                                                                deshabilitado={!tabsHabilitadas} />
                                                        </Nav>
                                                    </Col>
                                                </Row>
                                                <div className="row no-gutters mb-3 card shadow-sm border-top-0">
                                                    <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="datos_familiar">
                                                        <Row className="row no-gutters px-3">
                                                            <Col>
                                                                <Tab.Content>
                                                                    {componentes}
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

    extraeDatosAlumno(state, datos) {
        const clavesRecibidas = Object.keys(datos);
        const clavesFormulario = Object.keys(state.datosAlumno);
        let aux = {}, datosRecibidos = { ...state.datosAlumno }, valorRecibido;

        const clavesUtiles = clavesFormulario.filter(x => clavesRecibidas.includes(x));

        //Reinicio los datos del formulario        
        Object.assign(datosRecibidos, this.reiniciarFormulario(state));

        //Extraigo datos
        clavesUtiles.forEach(clave => {
            //TODO: extraer de esquema o generar nombre foto 
            if (datos[clave] !== null) {
                valorRecibido = clave === "tipoDni" ? datos[clave].toUpperCase() : datos[clave];                
                aux = {
                    [clave]: {
                        ...state.datosAlumno[clave],
                        valor: valorRecibido,
                    }
                };
                Object.assign(datosRecibidos, aux);
            }
        })
        return datosRecibidos;
    }

    reiniciarFormulario(state) {
        const clavesFormulario = Object.keys(state.datosAlumno);
        let valorAux, aux;
        let vacio = { ...state.datosAlumno };
        //ReinicioFormulario
        clavesFormulario.shift(); //Remuevo a dni para que no lo reinicie
        clavesFormulario.forEach(clave => {
            valorAux = clave === 'foto' ? null : clave === "tipoDni" ? 'DNI' : '';
            aux = {
                [clave]: {
                    ...state.datosAlumno[clave],
                    valor: valorAux,
                }
            }
            Object.assign(vacio, aux);
        })
        return vacio;
    }

    reiniciarTransaccion() {
        return {
            cantPasos: 0,
            pasoActual: 0,
            formularios: [],
            tabs: [],
            formulariosRef: [],
            tabsHabilitadas: false,
            validar: false
        }
    }

    formulariosValidos() {
        const formularios = this.state.formulariosRef;
        let validos = false;
        let id = 0;
        if (formularios.length > 0) {
            validos = formularios.every(form => {
                console.log("Form id:", id, "esValido?", form.esValido())
                id += 1;
                return form.esValido();
            })
        }
        //console.log("Todos los Formularios son válidos?", validos)
        return validos;
    }
}

export default CompletarFamilia;