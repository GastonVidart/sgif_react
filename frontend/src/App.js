import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';

import Menu from './components/Menu';
import Header from './components/Header';

import Home from './components/Home';
import InscribirAlumno from './components/InscribirAlumno';
import CompletarFamilia from './components/CompletarFamilia';
import NotasTrimestrales from './components/NotasTrimestrales';
import AltaCurso from './components/AltaCurso';
import './css/main.css'

const Route = require('react-router-dom').Route;

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="row no-gutters contPpal">
                    <BrowserRouter>
                        <Menu />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/inscribir-alumno" component={InscribirAlumno} />
                        <Route exact path="/completar-familia" component={CompletarFamilia} />
                        <Route exact path="/notas-trimestrales" component={NotasTrimestrales} />
                        <Route exact path="/alta-curso" component={AltaCurso} />
                    </BrowserRouter>                    
                </div>
            </React.Fragment>
        )
    }
}

export default App;