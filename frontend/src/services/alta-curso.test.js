import { ExpansionPanelActions } from "@material-ui/core"


import tAltaCurso from './alta-curso';


test('GET PRECEPTOR OK', () => {
    return tAltaCurso( `http://localhost:5000/alta-curso/preceptor?anio=2`, { method: "GET" } ).then( response => {
        let preceptor = response.response.preceptor[0]

        expect(response.ok).toBeTruthy()
        expect(preceptor.hasOwnProperty('nombre')).toBeTruthy()
        expect(preceptor.hasOwnProperty('apellido')).toBeTruthy()
        expect(preceptor.hasOwnProperty('dni')).toBeTruthy()
        expect(preceptor.hasOwnProperty('hermano')).toBeTruthy()
        expect(preceptor.hasOwnProperty('preceptor')).toBeTruthy()
        expect(preceptor.hasOwnProperty('profesor')).toBeTruthy()
    })
})

test('GET PRECEPTOR FAIL', () => {
    return tAltaCurso( `http://localhost:5000/alta-curso/preceptor?anio=6`, { method: "GET" } ).then( response => {
        expect(response.ok).toBe(false);
        expect(response.message).toBe('Error: año incorrecto, debe ser de 1 a 5');
    })
})