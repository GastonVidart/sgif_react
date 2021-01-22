import * as Icon from 'react-feather';

import AlertDialog from './Alerts'

const { Component } = require("react");

class FormularioResponsable extends Component {

    constructor(props) {
        super(props);
        this.idPaso = 1;

        this.state = {
            datos: {
                title: 'Está seguro de que desea finalizar?',
                texto: 'Si finaliza, se guardarán los cambios realizados.'
            }
        }
    }

    render() {
        //Control sobre si se tiene que mostrar o no esta parte del formulario        

        if (this.props.pasoActual !== this.idPaso) {
            return null;
        }

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
                        {/*submit del formulario completo 
                        //TODO: agregar paso siguiente */}
                        <AlertDialog datos={this.state.datos} siguiente={this.props.pasoSiguiente} />
                    </div>
                </div >

                {/* < !--Formulario--> */}
                <div className="row m-3 p-3 rounded-lg no-gutters contFormulario">
                    <div className="col">
                        {/* //TODO: agregar form onSubmit={this.handleSubmit} 
                            TODO: submit por js*/}
                        <form className={this.props.datos.validar ? "was-validated" : ""}>
                            {/* <!--shadow-sm--> */}
                            <div className="row no-gutters px-3 mb-3 card">
                                <div className="col-10 card-body pt-2 pb-0" role="group" aria-labelledby="datos_basicos"> {/*<!--test-->*/}
                                    <h3 className="card-title mb-1 titSeccion" id="datos_basicos">Datos Básicos</h3>

                                    <div className="form-row">
                                        <div className="col">
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="dni">DNI</label>
                                                <div className="col">
                                                    <input className="form-control" type="text" id="dni" name="dni"
                                                        placeholder="Ingrese un Dni" alt="IngresoDni" required aria-required="true"
                                                        value={this.props.datos.responsable.dni.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.dni.msjError}
                                                    </div>
                                                </div>
                                                <div className="col-auto ml-2 mr-1">
                                                    <button type="button" className="btn btn-primary boton"
                                                        id="dni" onClick={this.props.searchResponsable}>
                                                        <div className="d-sm-block d-none">Buscar</div>
                                                        <Icon.Search width={"1.2rem"} height={"1.2rem"} className="ml-md-1" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg">
                                            {/*Implementar con nro+-+dni+-+nro */}
                                            <div className="form-group row no-gutters align-items-center">
                                                <label className="col-auto px-3 py-1 my-0 mr-3 requerido" htmlFor="cuitCuil">CUIT/CUIL</label>
                                                <div className="col-sm">
                                                    <input className="form-control" type="text" id="cuitCuil" name="cuitCuil"
                                                        alt="IngresoCuitCuilt" required aria-required="true"
                                                        value={this.props.datos.responsable.cuitCuil.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.cuitCuil.msjError}
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
                                                        value={this.props.datos.responsable.nombre.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.nombre.msjError}
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
                                                        value={this.props.datos.responsable.apellido.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.apellido.msjError}
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
                                                        value={this.props.datos.responsable.genero.valor} onChange={this.props.handleInputChange}>
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
                                                        //FIXME: no hay fecha nac en model
                                                        value={this.props.datos.responsable.fechaNacimiento.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.fechaNacimiento.msjError}
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
                                                        //FIXME: no hay lugar nac en model
                                                        value={this.props.datos.responsable.lugarNacimiento.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.lugarNacimiento.msjError}
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
                                                        value={this.props.datos.responsable.telefono.valor} onChange={this.props.handleInputChange}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.telefono.msjError}
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
                                                        value={this.props.datos.responsable.email.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.email.msjError}
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
                                                        value={this.props.datos.responsable.calle.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.calle.msjError}
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
                                                        value={this.props.datos.responsable.altura.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.altura.msjError}
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
                                                        value={this.props.datos.responsable.barrio.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.barrio.msjError}
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
                                                        value={this.props.datos.responsable.piso.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.piso.msjError}
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
                                                        value={this.props.datos.responsable.depto.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.depto.msjError}
                                                    </div>
                                                </div>
                                            </div>
                                        </div><div className="col">
                                            <div className="form-group row no-gutters mb-2 align-items-center">
                                                <label className="col-auto px-3 py-1 my-1 mr-3" htmlFor="tira">Tira</label>
                                                <div className="col-sm">
                                                    <input type="text" id="tira" name="tira" className="form-control"
                                                        value={this.props.datos.responsable.tira.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.tira.msjError}
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
                                                        value={this.props.datos.responsable.modulo.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.modulo.msjError}
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
                                                        value={this.props.datos.responsable.localidad.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.localidad.msjError}
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
                                                        value={this.props.datos.responsable.provincia.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.provincia.msjError}
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
                                                        value={this.props.datos.responsable.codigoPostal.valor} onChange={this.props.handleInputChange} />
                                                    <div className="invalid-feedback">
                                                        {this.props.datos.responsable.codigoPostal.msjError}
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