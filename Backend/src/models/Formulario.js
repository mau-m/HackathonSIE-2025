class Formulario {
    constructor(nombre, descripcion, pregunta, fechaCreacion, estado, fechaCierre) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.pregunta = pregunta;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.fechaCierre = fechaCierre;
    }
}

module.exports = Formulario;