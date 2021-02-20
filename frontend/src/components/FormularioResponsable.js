import * as Icon from 'react-feather';
import AlertaInscribirAlumno from './AlertaInscribirAlumno';

const { Component } = require("react");

class FormularioResponsable extends Component {

    constructor(props) {
        super(props);
        this.idPaso = 1;
    }

    render() {
        //Control sobre si se tiene que mostrar o no esta parte del formulario        

        if (this.props.pasoActual !== this.idPaso || !this.props.inscrValida) {
            return null;
        }

        const formulario = this.props.formulario;
        const campo = formulario.inputs;

        return (
            /*<!--Contenedor Derecha-->*/
            < div className="col" role="main">

                {/*< !--Sub - Header Página-- >*/}
                < div className="row m-3 no-gutters justify-content-md-between align-items-center" >
                    <div className="pl-3 rounded-lg contTitulo">
                        <h2 className="m-0 titulo">Datos Responsable</h2>
                    </div>

                    {/* <!--BOTONES IFAZ-- > */}
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-primary mr-1 boton" onClick={this.props.pasoPrevio}>
                            <Icon.ArrowLeft width={"1.3rem"} height={"1.3rem"} />
                        </button>
                        <AlertaInscribirAlumno registrar={this.props.registrar} addNotificacion={this.props.addNotificacion} />
                    </div>
                </div >

                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        <form className={formulario.validar ? "was-validated" : ""}>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col-10 card-body pt-2 pb-0" role="group" aria-labelledby="datos_basicos">
                                    <h3 className="card-title mb-1 titSeccion" id="datos_basicos">Datos Básicos</h3>

                                    <div className="form-row">
                                        <div className="col-lg-8">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="dni">DNI</label>
                                                <div className="col-auto ml-md-3 mr-3 order-md-12">
                                                    <button type="button" className="btn btn-primary boton"
                                                        id="dni" onClick={this.props.searchResponsable} disabled={formulario.spinner}>
                                                        <div className={!formulario.spinner ? '' : 'd-none'}>
                                                            Buscar
                                                            <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-md-1" />
                                                        </div>
                                                        <div className={`spinner-border spinner-border-sm text-light my-1 ${formulario.spinner ? '' : 'd-none'}`} role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </button>
                                                </div>
                                                <div className="col-xs col-md">
                                                    <input className="form-control" type="text" id="dni" name="dni"
                                                        placeholder="Ingrese un Dni" alt="IngresoDni" required aria-required="true"
                                                        value={campo.dni.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {campo.dni.msjError}
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
                                                        value={campo.legajo.valor}
                                                        aria-labelledby="etiq_legajo" disabled />
                                                </div>
                                            </div>
                                        </div >
                                    </div>
                                    <div className="form-row">
                                        <div className="col-lg-6">
                                            {/*Implementar con nro+-+dni+-+nro */}
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="cuitCuil">CUIT/CUIL</label>
                                                <div className="col-sm">
                                                    <input className="form-control" type="text" id="cuitCuil" name="cuitCuil"
                                                        alt="IngresoCuitCuilt" required aria-required="true"
                                                        value={campo.cuitCuil.valor} onChange={this.props.handleInputChange}
                                                        disabled={!campo.cuitCuil.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.cuitCuil.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="nombre">Nombre</label>
                                                <div className="col-sm">
                                                    <input type="text" className="form-control" id="nombre" name="nombre"
                                                        required aria-required="true"
                                                        value={campo.nombre.valor} onChange={this.props.handleInputChange}
                                                        disabled={!campo.nombre.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.nombre.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="apellido">Apellido</label>
                                                <div className="col-sm">
                                                    <input type="text" className="form-control" id="apellido" name="apellido"
                                                        required aria-required="true"
                                                        value={campo.apellido.valor} onChange={this.props.handleInputChange}
                                                        disabled={!campo.apellido.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.apellido.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="genero">Género</label>
                                                <div className="col-sm">
                                                    <select name="genero" id="genero" className="form-control" required aria-required="true"
                                                        value={campo.genero.valor} onChange={this.props.handleInputChange} disabled={!campo.genero.habilitado}>
                                                        <option value="Seleccione">Seleccione</option>
                                                        <option value="Masculino">Masculino</option>
                                                        <option value="Femenino">Femenino</option>
                                                    </select>
                                                    {/*TODO: agregar invalid feedback */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row text-center">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                                <div className="col-sm">
                                                    <input type="date" id="fechaNacimiento" name="fechaNacimiento"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.fechaNacimiento.valor} onChange={this.props.handleInputChange}
                                                        disabled={!campo.fechaNacimiento.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.fechaNacimiento.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
                                                <div className="col-sm">
                                                    <input type="text" id="lugarNacimiento" name="lugarNacimiento"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.lugarNacimiento.valor} onChange={this.props.handleInputChange}
                                                        disabled={!campo.lugarNacimiento.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.lugarNacimiento.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row text-center">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="telefono">Teléfono</label>
                                                <div className="col-sm">
                                                    <input type="text" id="telefono" name="telefono"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.telefono.valor} onChange={this.props.handleInputChange} disabled={!campo.telefono.habilitado}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {campo.telefono.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 align-self-start requerido" htmlFor="email">Email</label>
                                                <div className="col-sm">
                                                    {/* aria-describedby="emailHelp" */}
                                                    <input type="email" id="email"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.email.valor} onChange={this.props.handleInputChange} disabled={!campo.email.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.email.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby="direccion">
                                    <h3 className="card-title titSeccion" id="direccion">Dirección</h3>
                                    {/* sacar </div> <div className="form-row"> */}
                                    {/* row-cols-lg-3 row-cols-md-2 row-cols-1  */}
                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="calle">Calle</label>
                                                <div className="col-sm">
                                                    <input type="text" id="calle" name="calle"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.calle.valor} onChange={this.props.handleInputChange} disabled={!campo.calle.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.calle.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="altura">Altura</label>
                                                <div className="col-sm">
                                                    <input type="text" id="altura" name="altura"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.altura.valor} onChange={this.props.handleInputChange} disabled={!campo.altura.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.altura.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="barrio">Barrio</label>
                                                <div className="col-sm">
                                                    <input type="text" id="barrio" name="barrio"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.barrio.valor} onChange={this.props.handleInputChange} disabled={!campo.barrio.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.barrio.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3" htmlFor="piso">Piso</label>
                                                <div className="col-sm">
                                                    <input type="number" id="piso" name="piso"
                                                        className="form-control" min={0}
                                                        value={campo.piso.valor} onChange={this.props.handleInputChange} disabled={!campo.piso.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.piso.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3" htmlFor="depto">Dpto</label>
                                                <div className="col-sm">
                                                    <input type="text" id="depto" name="depto"
                                                        className="form-control" min={0}
                                                        value={campo.depto.valor} onChange={this.props.handleInputChange} disabled={!campo.depto.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.depto.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div><div className="col">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3" htmlFor="tira">Tira</label>
                                                <div className="col-sm">
                                                    <input type="text" id="tira" name="tira" className="form-control"
                                                        value={campo.tira.valor} onChange={this.props.handleInputChange} disabled={!campo.tira.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.tira.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3" htmlFor="modulo">Módulo</label>
                                                <div className="col-sm">
                                                    <input type="text" id="modulo" name="modulo" className="form-control"
                                                        value={campo.modulo.valor} onChange={this.props.handleInputChange} disabled={!campo.modulo.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.modulo.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="localidad">Localidad</label>
                                                <div className="col-sm">
                                                    <input type="text" id="localidad" name="localidad"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.localidad.valor} onChange={this.props.handleInputChange} disabled={!campo.localidad.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.localidad.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="provincia">Provincia</label>
                                                <div className="col-sm">
                                                    <input type="text" id="provincia" name="provincia"
                                                        className="form-control" required aria-required="true"
                                                        value={campo.provincia.valor} onChange={this.props.handleInputChange} disabled={!campo.provincia.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.provincia.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-lg-4">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3 requerido" htmlFor="codigoPostal">Codigo Postal</label>
                                                <div className="col-sm">
                                                    <input type="number" id="codigoPostal" name="codigoPostal"
                                                        className="form-control" min={0} required aria-required="true"
                                                        value={campo.codigoPostal.valor} onChange={this.props.handleInputChange} disabled={!campo.codigoPostal.habilitado} />
                                                    <div className="invalid-feedback">
                                                        {campo.codigoPostal.msjError}
                                                    </div>
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