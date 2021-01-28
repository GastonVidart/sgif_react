import { Modal } from 'react-bootstrap';
import { useState } from "react";

export default function Alerta({ datos, funciones, registro }) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        funciones.finalizaRegistro('cancelar')
        setShow(false);
    }
    const handleShow = () => {
        console.log(funciones.siguiente())
        if (funciones.siguiente()) {
            setShow(true)
        }
    };

    const handleAceptar = () => {
        funciones.finalizaRegistro('aceptar');
        //FIXME: ¡¡¡¡arreglar!!!! no funciona
        let aux = setInterval(funciones.registro(), 250 * 1);
        //clearInterval(aux);


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
                    <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleAceptar}>Save changes</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}