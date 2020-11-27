import React, { Component } from "react";


class Menu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="Menu">
                <header>
                    <div class="contNombInst">
                        <span class="nombreInst">Instituto Nuestra Señora de Fátima</span>
                    </div>

                    <div class="contInfoUtil marquee">
                        <p id="content" class="infoUtil texto">Inicie Sesión para ver eventos próximos</p>
                    </div>

                    <button id="authorize_button" >Authorize</button>
                    <button id="signout_button">Sign Out</button>

                    <div class="contUsr">
                        <span class="usr">Usuario</span>
                        <span class="rol">Rol</span>
                        <div class="contFoto">
                            <img src ={ require('./images/ic_menu.png')} class="fotoUsr" alt="foto_usuario" />
                        </div>
                    </div>

                    <div class="contOpcs">
                        <img src={ require('./images/ic_menu.png')} alt="menu" class="menu"/>
                    </div>
                </header>

                <div class="contPpal">
                    <nav>
                        <ul>
                            <li>
                                <div class="cont_item_nav">
                                    <img src={ require('./images/item1.png')} alt="" class="item_nav"/>
                                </div>
                                <span class="texto_nav">Inscribir Alumno</span>
                            </li>
                            <li>
                                <div class="cont_item_nav">
                                    <img src={ require('./images/item1.png')} alt="" class="item_nav"/>
                                </div>
                                <span class="texto_nav">Completar Familia</span>
                            </li>
                            <li>
                                <div class="cont_item_nav">
                                    <img src={ require('./images/item1.png')} alt="" class="item_nav"/>
                                </div>
                                <span class="texto_nav">Registrar Notas Trimestrales</span>
                            </li>
                            <li>
                                <div class="cont_item_nav">
                                    <img src={ require('./images/item1.png')} alt="" class="item_nav"/>
                                </div>
                                <span class="texto_nav">Alta Curso</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Menu;
