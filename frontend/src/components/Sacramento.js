const { Component } = require("react");

class Sacramento extends Component {
    render() {
        const nombreS = this.props.nombre;
        const subNom = nombreS.substring(0, 3);
        return (
            <div className="row no-gutters px-3 mb-3 card sacramento">
                <div className="col card-body pt-2 pb-0" role="group" aria-labelledby={nombreS}>
                    <div className="form-row">
                        <div className="col-lg">
                            <div className="form-group row no-gutters mb-2 align-items-center">
                                <h4 id={nombreS} className="nombreSacr titSeccion" style={{ fontSize: "1rem" }}>{nombreS}</h4>
                                <input type="checkbox" id={"fue_tomado_" + subNom} name={"fue_tomado_" + subNom} className="checkbox" aria-labelledby={nombreS} />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-lg">
                            <div className="form-group row no-gutters mb-2 align-items-center">
                                <label className="col-auto px-3 py-1 my-1 mr-3 etiqueta" id={"etiq_f" + nombreS} htmlFor={"fecha_" + nombreS}>Fecha de {nombreS}</label>
                                <div className="col-sm">
                                    <input type="date" id={"fecha_" + nombreS} name={"fecha_" + nombreS} className="form-control"
                                        aria-labelledby={"etiq_f" + nombreS} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg">
                            <div className="form-group row no-gutters mb-2 align-items-center">
                                <label className="col-auto px-3 py-1 my-1 mr-3 etiqueta" id={"etiq_d" + subNom} htmlFor={"diocesis_" + subNom}>Diócesis</label>
                                <div className="col-sm">
                                    <input type="text" id={"diocesis_" + subNom} name={"diocesis_" + subNom} className="form-control"
                                        aria-labelledby={"etiq_d" + subNom} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default Sacramento;