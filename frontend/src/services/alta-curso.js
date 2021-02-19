'use strict'

async function tAltaCurso(call, params) {
    try {
        let response = await  fetch(call, params)
        let curso = await response.json()
        return curso
    } catch (e) {
        console.log("error ", e)
    }
}


export default tAltaCurso