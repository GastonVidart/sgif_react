import React from "react";

export default function PantallaCarga({ inscrValida }) {

    if (inscrValida) {
        return null;
    }

    return (
        <div id="home" className="col" role="main">
            <div className="row no-gutters m-4 justify-content-center">
                <div className={`spinner-border  text-secondary my-1 `} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="row no-gutters m-4 justify-content-center">
                <h2 className="m-0 titulo">Verificando si puede Inscribir...</h2>
            </div>
        </div>
    )
}