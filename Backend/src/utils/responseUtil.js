function buildResponse(codigo, mensaje, data = null) {
  return {
    codigo,
    mensaje,
    data,
  };
}

function buildSuccessResponse(codigo, mensaje, data) {
    switch (codigo) {
        case 200:
            return buildResponse(200, mensaje || 'Éxito', data);
        case 201:
            return buildResponse(201, mensaje || 'Creado', data);
        case 204:
            return buildResponse(204, mensaje || 'Sin contenido');
        default:
            return buildResponse(codigo, mensaje || 'Éxito', data);
    }
}

function buildErrorResponse(codigo, mensaje) {
    switch (codigo) {
        case 400:
            return buildResponse(400, mensaje || 'Solicitud incorrecta');
        case 401:
            return buildResponse(401, mensaje || 'No autorizado');
        case 403:
            return buildResponse(403, mensaje || 'Prohibido');
        case 404:
            return buildResponse(404, mensaje || 'No encontrado');
        case 500:
            return buildResponse(500, mensaje || 'Error interno del servidor');
        default:
            return buildResponse(codigo, mensaje || 'Error desconocido');
    }
}

module.exports = {
    buildSuccessResponse,
    buildErrorResponse
};