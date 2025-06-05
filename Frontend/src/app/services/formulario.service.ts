import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiUrl = 'http://localhost:3000/api/v1/formulario';

  constructor(private http: HttpClient) { }

  crearFormularioConOpciones(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  obtenerFormularios() {
    return this.http.get(this.apiUrl);
  }

  obtenerFormularioPorId(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  cerrarFormulario(id: number) {
    return this.http.put(`${this.apiUrl}/cerrar/${id}`, {});
  }

  enviarVoto(voto: { formularioId: number, opcionSeleccionada: string, usuario: string }) {
    return this.http.post('http://localhost:3000/api/v1/votos', voto);
    // Ajusta esta ruta si los votos también tienen un prefijo como '/api/v1/votos'
  }
}

