import React, { Component } from "react";
import * as Icon from 'react-feather';

import '../css/navbar.css';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            /* TODO: ver si ponemos otros componentes o una url o react router*/
            < nav className="col-md-auto shadow" role="navigation" >
                <ul>
                    {/* <!--generar con react asi solo ponemos los links, el resto se puede factorear--> */}
                    <li className="row no-gutters align-items-center justify-content-start pr-4">
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="col-auto texto_nav" href="#">Inscribir Alumno</a>
                    </li>
                    <li className="row no-gutters align-items-center justify-content-start pr-4">
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="col-auto texto_nav" href="#">Completar Familia</a>
                    </li>
                    <li className="row no-gutters align-items-center justify-content-start pr-4">
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="texto_nav" href="#">Registrar Notas Trimestrales</a>
                    </li>
                    <li className="row no-gutters align-items-center justify-content-start pr-4">
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="texto_nav" href="#">Alta Curso</a>
                    </li>
                </ul>
            </nav >
        )
    }
}

export default Menu;
