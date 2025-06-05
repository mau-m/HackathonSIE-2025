CREATE DATABASE IF NOT EXISTS hack_db;

CREATE TABLE IF NOT EXISTS formularios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    pregunta VARCHAR(255) NOT NULL,
    fecha_creacion DATE NOT NULL,
    estado BOOLEAN NOT NULL,
    fecha_cierre DATE,
    usuario VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS opciones (
    id SERIAL PRIMARY KEY,
    formulario_id INT NOT NULL,
    opcion VARCHAR(255) NOT NULL,
    FOREIGN KEY (formulario_id) REFERENCES formularios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS votos (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(16) NOT NULL,
    formulario_id INT NOT NULL,
    opcion_id INT NOT NULL,
    fecha_voto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (formulario_id) REFERENCES formularios(id) ON DELETE CASCADE,
    FOREIGN KEY (opcion_id) REFERENCES opciones(id) ON DELETE CASCADE
);
