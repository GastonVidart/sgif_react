import React, { Component } from "react";

import '../css/header.css';

class Header extends Component {
    render() {
        //<!-- ver tema altura del header -->
        return (            
            <header class="row no-gutters align-items-center shadow-sm ">
                {/* <!--ver col-md-3--> */}
                <div class="col-md-auto px-md-3 h-100 d-flex align-items-center contNombInst">
                    {/* ver tamaño de letra h1 */}
                    <h1 class="nombreInst my-auto">Instituto Nuestra Señora de Fátima</h1>
                </div>

                <div class="col-md-4 mx-md-3 rounded-pill contInfoUtil">
                    {/* style="animation-duration:10s;" */}
                    <p id="content" class="infoUtil texto" >Inicie Sesión para ver eventos
                próximos</p>
                </div>

                {/* calendar */}

                <div class="col-auto ml-auto mr-md-3">
                    <div class="row no-gutters align-items-center contUsr">
                        <div class="col-auto">
                            <div class="row no-gutters">
                                <span class="usr">Usuario</span>
                            </div>
                            <div class="row no-gutters">
                                <span class="rol ml-auto">Rol</span>
                            </div>
                        </div>
                        <div class="col-auto ml-1 rounded-circle contFoto">
                            <img class="fotoUsr" alt="foto_usuario" />
                        </div>
                        {/* <!--ver centrado foto d-flex align-items-center--> */}
                        <div class="col-auto ml-4 rounded-lg contOpcs">
                            <img src="../images/ic_menu.png" class="menu" alt="menu" />
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header