import React, { useState } from 'react';
import { Toast, ToastHeader } from 'react-bootstrap'

export const Tipo = { Alerta: 'Alerta', Error: 'Error', Exito: 'Exito' };

export default function Notificacion({ id, tipo, mensaje, delNotificacion }) {
    const [show, setShow] = React.useState(true);
    const toggleShow = () => setShow(!show);
    const miliSeg = 5;

    const handleClose = () => {
        toggleShow();        
        delNotificacion(id)
    }

    const handleTipo = () => {
        let estilo;        
        switch (tipo) {
            case Tipo.Alerta:
                estilo = 'notificacion-alerta';
                break;
            case Tipo.Error:
                estilo = 'notificacion-error';
                break;
            case Tipo.Exito:
                estilo = 'notificacion-exito';
                break;
            default:
                estilo = '';
                break;
        }
        return estilo;
    }

    return (
        <div aria-live="assertive" aria-atomic="true" role="alert">
            {/*autohide delay={3000} animation={true default}*/}
            {/*TODO: animacion de entrada */}
            <Toast className="notificacion" show={show} onClose={handleClose} animation={true} autohide delay={1000 * miliSeg}>
                <ToastHeader className={handleTipo()} >
                    <strong class="mr-auto">{tipo}</strong>
                    {/*<small>11 mins ago</small>*/}
                </ToastHeader>
                <Toast.Body>
                    <span>{mensaje}</span>
                </Toast.Body>
            </Toast>
        </div>
    );
}