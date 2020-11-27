import React, { Component } from "react";

import Menu from './Menu';
import Principal from './Principal';
import Footer from './Footer';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <Menu />
                <Principal/>
                <Footer />
            </React.Fragment>
        )
    }
}

export default App;