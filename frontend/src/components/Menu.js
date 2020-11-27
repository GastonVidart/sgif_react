import React, { Component } from "react";

import '../css/navbar.css';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            < nav class="col-md-3 nav2 shadow" >
                <ul>
                    {/* <!--generar con react asi solo ponemos los links, el resto se puede factorear--> */}
                    <li class="row no-gutters align-items-center ml-2">
                        <div class="cont_item_nav">
                            <img src="../images/item1.png" alt="" class="item_nav" />
                        </div>
                        <span class="texto_nav">Inscribir Alumno</span>
                    </li>
                    <li class="row no-gutters align-items-center ml-2">
                        <div class="cont_item_nav">
                            <img src="../images/item1.png" alt="" class="item_nav" />
                        </div>
                        <span class="texto_nav">Completar Familia</span>
                    </li>
                    <li class="row no-gutters align-items-center ml-2">
                        <div class="cont_item_nav">
                            <img src="../images/item1.png" alt="" class="item_nav" />
                        </div>
                        <span class="texto_nav">Registrar Notas Trimestrales</span>
                    </li>
                    <li class="row no-gutters align-items-center ml-2">
                        <div class="cont_item_nav">
                            <img src="../images/item1.png" alt="" class="item_nav" />
                        </div>
                        <span class="texto_nav">Alta Curso</span>
                    </li>
                </ul>
            </nav >
        )
    }
}

export default Menu;
