import { Modal } from 'react-bootstrap';
import { useState } from "react";
import { Plus } from 'react-feather';

export default function ModalFormNuevo({ datos, funciones }) {
    const [show, setShow] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [tipo, setTipo] = useState('Padre');

    const handleClose = () => {
        setSpinner(false);
        setShow(false);
    }

    const handleShow = () => {
        //TODO: todos los otros formularios deben ser validos o que no haya ninguno        
        //if (funciones.siguiente()) {
        setSpinner(false);
        setShow(true)
        //}
    };

    const handleAceptar = () => {
        setSpinner(true);
        funciones.nuevo(tipo).then(exito => {
            if (!exito) {
                console.log("Tipo Familiar Inválido")
            }
            handleClose();
        });
    }

    return (
        <>
            <button type="button" className="btn btn-primary mr-1 boton" onClick={handleShow} >
                <Plus width={"1.2rem"} height={"1.2rem"} />
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
                    <form>
                        <div className="form-group">
                            <label id="etiq_tipo_familiar" htmlFor="tipoFamiliar" className="col-form-label px-3 py-1 mb-2">Familiar:</label>
                            <select id="tipoFamiliar" name="tipoFamiliar" className="form-control" required
                                value={tipo} onChange={(event) => setTipo(event.target.value)} placeholder="Seleccionar"
                                aria-labelledby="etiq_tipo_familiar" aria-required="true" aria-expanded="false">
                                <option value="Padre">Padre</option>
                                <option value="Hermano">Hermano</option>
                            </select>
                        </div>
                    </form>
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