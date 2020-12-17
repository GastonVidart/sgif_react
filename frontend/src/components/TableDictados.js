import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: 15,
    marginBottom: 15,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Quadrini Silvia', 'Matemática', 'Lunes', '8:00', 'prog_Mat2020'),
  createData('Rodolfo Walsh', 'Lengua y Literatura', 'Lunes', '11:00', 'prog_Len2020'),
  createData('Lagos Fito', 'Biología', 'Martes', '8:00', 'prog_Mat2020'),
  createData('Torres Amanda', 'Geografía', 'Miércoles', '10:00', 'prog_Geo2020'),
  createData('Storani Sergio', 'Física', 'Jueves', '11:00', 'prog_Fis2020'),
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Profesor (Apellido, Nombre, Legajo)</TableCell>
            <TableCell align="right">Materia</TableCell>
            <TableCell align="right">Día(s)</TableCell>
            <TableCell align="right">Horario(s)</TableCell>
            <TableCell align="right">Programa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}