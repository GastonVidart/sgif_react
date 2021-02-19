'use strict'

import React from 'react';
import renderer from 'react-test-renderer';
import DenseTable from "./Table"



it('renders table', () => {

    const columns = [
        { id: 'profesor', label: 'Profesor', minWidth: 170 },
        { id: 'materia', label: 'Materia', minWidth: 100 },
        {
          id: 'dia',
          label: 'Dia',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'horario',
          label: 'Horario',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'programa',
          label: 'Programa',
          minWidth: 170,
          align: 'right',
          format: (value) => value.toFixed(2),
        },
    ];

    const dictado = [{profesor: 'Nieztche', materia: 'Modelado de Datos', horario: '8:00', programa: "2021"}]

    const tree = renderer
                 .create(<DenseTable columns={columns} rows={dictado} />)
                 .toJSON();
    
    expect(tree).toMatchSnapshot();
});  


  