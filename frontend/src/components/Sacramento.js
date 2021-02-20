const { Component } = require("react");

class Sacramento extends Component {    
    render() {
        const nombreS = this.props.nombre;
        const sacramento = this.props.sacramento;
        const subNom = nombreS.substring(0, 3);
        //        console.log(this.props.sacramento)
        return (
            <div className="row no-gutters px-3 mb-3 card sacramento">
                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby={nombreS}>
                    <div className="form-row">
                        <div className="col-lg">
                            <div className="form-group row no-gutters mb-2 align-items-center">
                                <h4 id={nombreS} className="nombreSacr titSeccion" style={{ fontSize: "1rem" }}>{nombreS}</h4>
                                <input type="checkbox" id={"fueTomado_" + subNom} name={"fueTomado_" + subNom} className="checkbox" aria-labelledby={nombreS}
                                    onChange={this.props.handleInputChange} checked={sacramento.fueTomado.valor} disabled={!sacramento.fueTomado.habilitado}
                                />
                                <div className="invalid-feedback">
                                    {sacramento.fueTomado.msjError}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-lg">
                            <div className="form-group row no-gutters mb-2 align-items-center">
                                <label className="col-auto px-3 py-1 my-1 mr-3 etiqueta" id={"etiq_f" + subNom} htmlFor={"fecha_" + subNom}>Fecha de {nombreS}</label>
                                <div className="col-sm">
                                    <input type="date" id={"fecha_" + subNom} name={"fecha_" + subNom} className="form-control"
                                        aria-labelledby={"etiq_f" + subNom} onChange={this.props.handleInputChange}
                                        value={sacramento.fecha.valor} disabled={!(sacramento.fueTomado.habilitado && sacramento.fueTomado.valor)} />
                                    <div className="invalid-feedback">
                                        {sacramento.fecha.msjError}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg">
                            <div className="form-group row no-gutters mb-2 align-items-center">
                                <label className="col-auto px-3 py-1 my-1 mr-3 etiqueta" id={"etiq_d" + subNom} htmlFor={"diocesis_" + subNom}>Diócesis</label>
                                <div className="col-sm">
                                    <input type="text" id={"diocesis_" + subNom} name={"diocesis_" + subNom} className="form-control"
                                        aria-labelledby={"etiq_d" + subNom} onChange={this.props.handleInputChange}
                                        value={sacramento.diocesis.valor} disabled={!(sacramento.fueTomado.habilitado && sacramento.fueTomado.valor)} />
                                    <div className="invalid-feedback">
                                        {sacramento.diocesis.msjError}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default Sacramento;