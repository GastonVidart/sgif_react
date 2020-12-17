import React, { Component } from "react";
import * as Icon from 'react-feather';

import '../css/header.css';

class Header extends Component {
    render() {
        //<!-- ver tema altura del header -->
        return (
            <header className="row no-gutters align-items-center p-1 py-1" role="banner">
                {/* <!--ver col-md-3--> */}
                <div className="col-sm col-lg-auto px-md-3 d-flex align-items-center contNombInst">
                    {/* ver tamaño de letra h1 */}
                    <h1 className="nombreInst my-2">Instituto Nuestra Señora de Fátima</h1>
                </div>

                <div className="col-auto ml-auto mr-md-3 my-1 order-md-12">
                    <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                            <div className="row no-gutters">
                                <span id="nombUsr" className="usr">Usuario</span>
                            </div>
                            <div className="row no-gutters">
                                <span className="rol ml-auto">Rol</span>
                            </div>
                        </div>
                        <div className="col-auto ml-1 rounded-circle contFoto d-flex align-items-center justify-content-center"
                            aria-labelledby="nombUsr">
                            <Icon.User className="fotoUsr" />
                        </div>
                        {/* <!--ver centrado foto d-flex align-items-center--> */}
                        <div className="col-auto ml-4 rounded-lg contOpcs">
                            <Icon.Settings width={"70%"} height={"70%"} />
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mx-md-3 rounded-pill order-md-1 contInfoUtil">
                    {/* style="animation-duration:10s;" */}
                    <p id="content" className="infoUtil texto" >Inicie Sesión para ver eventos
                próximos</p>
                </div>

                {/* calendar */}

            </header>
        )
    }
}

export default Header