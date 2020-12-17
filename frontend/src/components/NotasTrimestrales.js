import React from "react";
import { AlertTriangle } from 'react-feather'

class NotasTrimestrales extends React.Component {
    render() {
        return (
            <div className="col" role="main">
                <div className="row no-gutters m-4 justify-content-center">
                    <AlertTriangle width={"8rem"} height={"8rem"} />
                </div>
                <div className="row no-gutters m-4 justify-content-center">
                    <h2 className="m-0 titulo">Página En construcción</h2>
                </div>
            </div>
        )
    }
}

export default NotasTrimestrales;