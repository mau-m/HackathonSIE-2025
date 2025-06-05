class Voto {
    constructor(usuario, formularioId, opcionId, fechaVoto) {
        this.usuario = usuario; // Identificador del usuario que vota
        this.formularioId = formularioId; // Identificador del formulario al que pertenece el voto
        this.opcionId = opcionId; // Identificador de la opción seleccionada por el usuario
        this.fechaVoto = fechaVoto; // Fecha y hora en que se realizó el voto
    }
}

module.exports = Voto;