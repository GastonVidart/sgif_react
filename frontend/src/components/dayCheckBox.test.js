'use strict';

import React from 'react';
import { fireEvent, render} from '@testing-library/react';
import DayCheckbox from './dayCheckBox';

it('Checkbox changes the status after click', () => {

    const bloques = [
        {dia: "Lunes", bloqueHorario : {horaInicio: "9:00", horaFin: "10:00"}},
        {dia: "Martes", bloqueHorario : {horaInicio: "10:00", horaFin: "11:00"}}
    ]

    const { getByLabelText, getByTestId } = render(
      <DayCheckbox horarios={bloques} upData={(bloque, dia) => expect(dia).toEqual('Martes')} />,
    );

    const labelRadio = getByLabelText('Martes');

    expect(labelRadio.checked).toEqual(false);
    
    fireEvent.click(labelRadio);

    expect(labelRadio.checked).not.toBeNull();
    expect(labelRadio.checked).toEqual(true);

  });