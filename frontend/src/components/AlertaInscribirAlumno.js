import { Modal } from 'react-bootstrap';
import { useState } from "react";

export default function AlertaInscribirAlumno({ registrar }) {
    const [show, setShow] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [datos, setDatos] = useState({
        title: 'Está seguro de que desea finalizar?',
        texto: 'Si finaliza, se guardarán los cambios realizados.'
    })

    const handleClose = () => {
        setSpinner(false);
        setShow(false);
    }

    const handleShow = () => {
        setSpinner(false);
        setShow(true)
    };

    const handleAceptar = () => {        
        setSpinner(true);        
        registrar().then(exito => {
            if (exito) {
                window.location.href = '/';
                //TODO: notif exito (ya lo haria registrar)
            } else {
                //TODO: notif error (se puede hacer catch del error) y mostrar (ya lo haria registrar)
                handleClose();
            }
        });
    }

    return (
        <>
            <button type="button" className="btn btn-primary mr-1 boton" onClick={handleShow} >
                Finalizar Registro
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{datos.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{datos.texto}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary boton botonSecundario" onClick={handleClose}>Cancelar</button>
                    <button type="button" className="btn btn-primary boton d-flex justify-content-center" style={{ width: "5rem" }} onClick={handleAceptar}
                        disabled={spinner}>
                        <span className={!spinner ? '' : 'd-none'}>Aceptar</span>
                        <div className={`spinner-border spinner-border-sm text-light my-1 ${spinner ? '' : 'd-none'}`} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}