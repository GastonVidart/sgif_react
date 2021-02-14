import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TablePagination from '@material-ui/core/TablePagination';

function createData(profesor, materia, dia, horario, programa) {
  return { profesor, materia, dia, horario, programa };
}

const rows = [
  createData('Quadrini Silvia', 'Matemática', 'Lunes', '8:00', 'prog_Mat2020.pdf'),
  // createData('Rodolfo Walsh', 'Lengua y Literatura', 'Lunes', '11:00', 'prog_Len2020.pdf'),
  // createData('Lagos Fito', 'Biología', 'Martes', '8:00', 'prog_Mat2020.pdf'),
  // createData('Torres Amanda', 'Geografía', 'Miércoles', '10:00', 'prog_Geo2020.pdf'),
  // createData('Storani Sergio', 'Física', 'Jueves', '11:00', 'prog_Fis2020.pdf'),
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

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


export default function StickyHeadTable({ dictado }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if( dictado && dictado.profesor != '' ) {
    rows.push(createData(dictado.profesor, dictado.materia, dictado.dia, dictado.horario, dictado.programa))
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}