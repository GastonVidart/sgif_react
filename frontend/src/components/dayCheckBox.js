'use strict'

import React, { useState } from 'react';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';


export default function DayCheckbox({ horarios, upData }) {

    let dia;

    const handleChange = (event) => {
        upData(horarios.filter( h => h.dia == event.target.value), event.target.value);
    };

    return (
        <div className="form-row" style={{"marginTop" : "10px"}}>
            <div className="col">
                <div className="form-group row no-gutters mb-2 align-items-center">
                    <label className="col-auto px-3 py-1 my-1 mr-3 requerido" id="etiq_anio" htmlFor="dni">Seleccione el día</label>
                </div>
                <div style={{"marginLeft" : "10px"}}>
                    <RadioGroup row aria-label="quiz" name="quiz" value={dia} onChange={handleChange} defaultValue="Lunes">
                        <FormControlLabel value="Lunes" control={<Radio />} label="Lunes" />
                        <FormControlLabel value="Martes" control={<Radio />} label="Martes" />
                        <FormControlLabel value="Miercoles" control={<Radio />} label="Miércoles" />
                        <FormControlLabel value="Jueves" control={<Radio />} label="Jueves" />
                        <FormControlLabel value="Viernes" control={<Radio />} label="Viernes" />
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}