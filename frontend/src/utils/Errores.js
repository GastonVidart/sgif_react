class NoExisteResponsable extends Error {
    constructor(message, ...params) {
        super(message, ...params);

        /*        if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, NoExisteResponsable)
                }*/

        this.name = 'No Existe Responsable'
        // Información de depuración personalizada        
        this.date = new Date()
    }
}

class NoExistePersona extends Error {
    constructor(message, ...params) {
        super(message, ...params);

        /*        if (Error.captureStackTrace) {
                    Error.captureStackTrace(this, NoExisteResponsable)
                }*/

        this.name = 'No Existe Persona'
        // Información de depuración personalizada        
        this.date = new Date()
    }
}

module.exports = { NoExisteResponsable, NoExistePersona }