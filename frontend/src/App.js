import React, { Component } from "react";

import Menu from './components/Menu';
import Header from './components/Header';

import Home from './components/Home';
import InscribirAlumno from './components/InscribirAlumno';
import CompletarFamilia from './components/CompletarFamilia';
import NotasTrimestrales from './components/NotasTrimestrales';
import AltaCurso from './components/AltaCurso';

import Footer from './components/Footer';

import './css/main.css'

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div class="row no-gutters contPpal">
                    <Menu />
                    {/* TODO: react router entre componentes */}

                    {/*<Home />*/}

                    <InscribirAlumno />

                    {/*En construcción*/}
                    {/*<CompletarFamilia />*/}
                    {/*<NotasTrimestrales />*/}
                    {/*<AltaCurso />*/}
                </div>
                {/*<Footer />*/}
            </React.Fragment>
        )
    }
}

export default App;