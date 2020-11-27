import React, { Component } from "react";

import Menu from './components/Menu';
import Principal from './components/Principal';
import Footer from './components/Footer';
import Header from './components/Header';

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
                    {/* TODO: contenedor derecha con formulario y el resto de principales */}
                    <Principal />
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default App;