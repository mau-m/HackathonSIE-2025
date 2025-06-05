import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Voto {
  usuario: string;
  formularioId: number;
  opcionId: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private baseUrl = 'http://developer.jquiroz.net:3003/api/v1/formulario';  // Asegúrate que apunte al recurso correcto
  private votoUrl = 'http://developer.jquiroz.net:3003/api/v1/voto';       // Ejemplo, cambia si es diferente

  constructor(private http: HttpClient) { }

  crearFormularioConOpciones(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  obtenerFormularios() {
    return this.http.get(this.baseUrl);
  }

  obtenerFormularioPorId(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  cerrarFormulario(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // enviarVoto(voto: { formularioId: number, opcionId: number, usuario: string }) {
  //   return this.http.post(this.votoUrl, voto);
  // }
  enviarVoto(voto: Voto) {
    return this.http.post(this.votoUrl, voto);
  }

  obtenerResultadosPorId(id: number) {
    return this.http.get(`${this.votoUrl}/${id}`);
  }



}

