import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
import * as Icon from 'react-feather';

import '../css/navbar.css';

class Menu extends React.Component {
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {
        return (
            < nav className="col-md-auto shadow" role="navigation" >
                <ul>

                    <li className="row no-gutters align-items-center justify-content-start pr-4"
                        onClick={() => {
                            window.location.replace("/");
                        }}>
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="col-auto texto_nav" href="/">Inicio</a>
                    </li>

                    {/* que a englobe todo, ver estilos */}
                    <li className="row no-gutters align-items-center justify-content-start pr-4"
                        onClick={() => {
                            window.location.replace("/inscribir-alumno");
                        }}>
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="col-auto texto_nav" href="/inscribir-alumno">Inscribir Alumno</a>
                    </li>
                    <li className="row no-gutters align-items-center justify-content-start pr-4"
                        onClick={() => {
                            window.location.replace("/completar-familia");
                        }}>
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="col-auto texto_nav" href="/completar-familia">Completar Familia</a>
                    </li>
                    <li className="row no-gutters align-items-center justify-content-start pr-4"
                        onClick={() => {
                            window.location.replace("/notas-trimestrales");
                        }}>
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="texto_nav" href="/notas-trimestrales">Registrar Notas Trimestrales</a>
                    </li>
                    <li className="row no-gutters align-items-center justify-content-start pr-4"
                        onClick={() => {
                            window.location.replace("/alta-curso");
                        }}>
                        <div className="col-auto ml-2 cont_item_nav">
                            <Icon.Circle className="item_nav" />
                        </div>
                        <a className="texto_nav" href="/alta-curso">Alta Curso</a>
                    </li>
                </ul>

                {/*TODO:consultar si va o no, pq en ejemplo estaba, pero no es necesario*/}
                <ul className="collapse">
                    <li className={this.getNavLinkClass("/")}>
                        <NavLink to="/" >Inicio</NavLink></li>
                    <li className={this.getNavLinkClass("/inscribir-alumno")}>
                        <NavLink to="/" >Inscribir Alumno</NavLink></li>
                    <li className={this.getNavLinkClass("/completar-familia")}>
                        <NavLink to="/" >Inscribir Alumno</NavLink></li>
                    <li className={this.getNavLinkClass("/notas-trimestrales")}>
                        <NavLink to="/" >Inscribir Alumno</NavLink></li>
                    <li className={this.getNavLinkClass("/alta-curso")}>
                        <NavLink to="/" >Inscribir Alumno</NavLink></li>
                </ul>

            </nav >
        )
    }
}

Menu = withRouter(Menu);
export default Menu;
