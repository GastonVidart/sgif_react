import React, { Component } from "react";
import { withRouter } from "react-router";

import Menu from './components/Menu';
import Header from './components/Header';

import Home from './components/Home';
import InscribirAlumno from './components/InscribirAlumno';
import CompletarFamilia from './components/CompletarFamilia';
import NotasTrimestrales from './components/NotasTrimestrales';
import AltaCurso from './components/AltaCurso';
import Notificacion from './components/Notificacion'

import Footer from './components/Footer';

import './css/main.css'

const Route = require('react-router-dom').Route;

class App extends Component {

    //TODO: para implementar la cancelacion en el componentDidUnmount ejecutar los fetch que eliminen los datos registrados
    //TODO: si ocurre un error en completar familia no se caputra pq no es atomica. arreglar en base

    constructor(props) {
        super(props);
        this.state = {
            alumnoReinscribir: {},
            esReinscripcion: false,
            notificaciones: new Set()
        }

        this.cambioCompletarFam = this.cambioCompletarFam.bind(this);
        this.cambioInscribir = this.cambioInscribir.bind(this);
        this.addNotificacion = this.addNotificacion.bind(this);
        this.delNotificacion = this.delNotificacion.bind(this);
    }

    cambioCompletarFam(alumno) {
        console.log("Guardando estado Inscripción: ", alumno)
        this.setState({
            alumnoReinscribir: alumno,
            esReinscripcion: true
        })
        console.log("Redirección a Completar Familia");
        this.props.history.push("/completar-familia");
    }

    cambioInscribir() {
        console.log("Redirección a Inscribir Alumno");
        this.props.history.push("/inscribir-alumno");
    }

    addNotificacion(tipo, mensaje) {
        //console.log(`Cargando Notificación...`);
        //TODO: cuando se llega a 5 notif se tiene que remover
        this.setState(state => {
            const idNotificacion = state.notificaciones.size;
            /*if (idNotificacion >= 5) {
                this.delNotificacion(0);
            }*/
            /*const notificacionesAux = state.notificaciones.add(
                <Notificacion key={idNotificacion} delNotificacion={this.delNotificacion} />);*/
            return {
                notificaciones: new Set(
                    state.notificaciones.add(
                        <Notificacion key={idNotificacion} id={idNotificacion} delNotificacion={this.delNotificacion} tipo={tipo} mensaje={mensaje} />
                    )
                )
            }
        })
    }

    delNotificacion(index) {
        //console.log(`Eliminando Notificación ${index}...`);
        this.setState(state => {
            [...state.notificaciones].splice(index, 1);
            return {
                notificaciones: new Set(state.notificaciones)
            }
        })
    }

    render() {
        const { alumnoReinscribir, esReinscripcion, notificaciones } = this.state;
        return (
            <React.Fragment>
                <Header />
                <div className="row no-gutters contPpal">
                    <Menu />
                    <Route exact path="/" component={Home} />
                    {/*component={InscribirAlumno} */}
                    <Route exact path="/inscribir-alumno"
                        render={(props) =>
                            <InscribirAlumno {...props}
                                alumno={alumnoReinscribir}
                                esReinscripcion={esReinscripcion}
                                completarFam={this.cambioCompletarFam}
                                addNotificacion={this.addNotificacion}
                            />} />
                    <Route exact path="/completar-familia"
                        render={(props) =>
                            <CompletarFamilia {...props}
                                alumno={alumnoReinscribir}
                                esReinscripcion={esReinscripcion}
                                inscripcion={this.cambioInscribir}
                                addNotificacion={this.addNotificacion}
                            />} />
                    <Route exact path="/notas-trimestrales" component={NotasTrimestrales} />
                    <Route exact path="/alta-curso" component={AltaCurso} />
                </div>
                {/*puede ser aria-atomic para que lea todo atomicamente */}
                <div aria-live="polite" aria-atomic="true" className="cont-notificacion" >
                    {notificaciones}
                </div>
                {/*<Footer />*/}
            </React.Fragment>
        )
    }
}

export default withRouter(App);