import React from "react";

import Logo from "../images/logoINSF2.png";

class Home extends React.Component {
    render() {
        return (
            <div id="home" className="col">
                <div className="row no-gutters m-4 justify-content-center">
                    <img id="Foto Escuela" src={Logo} alt="Foto Escuela" style={{width:"25%", height:"25%"}} />
                </div>
                <div className="row no-gutters m-4 justify-content-center">
                    <h2 className="m-0 titulo">Bienvenido al Sistema de Gestión del Instituo Nuestra Señora de Fátima</h2>
                </div>
            </div>
        )
    }
}

export default Home;
