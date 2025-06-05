import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // <-- Importa HttpClientModule aquí
import { AuthService } from '../../../services/auth.service';
import { FormularioService } from '../../../services/formulario.service';

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // <-- agrégalo aquí
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent {
  descripcion: string = '';
  nombre: string = '';
  pregunta: string = '';
  opciones: { valor: string }[] = [{ valor: '' }, { valor: '' }];

  constructor(
    private authService: AuthService,
    private formularioService: FormularioService
  ) { }

  login(): void {
    this.authService.loginWithGoogle()
      .then(user => {
        console.log('Usuario logueado:', user);
      })
      .catch(err => {
        console.error('Error en login:', err);
      });
  }

  agregarOpcion(): void {
    this.opciones.push({ valor: '' });
  }

  crearEncuesta(): void {
    const opcionesValidas = this.opciones
      .map(op => ({ opcion: op.valor.trim() }))
      .filter(opcionObj => opcionObj.opcion !== '');

    if (!this.descripcion.trim() || opcionesValidas.length < 2) {
      alert('Por favor, agrega una descripción y al menos dos opciones.');
      return;
    }

    const encuesta = {
      formulario: {
        nombre: this.nombre,
        pregunta: this.pregunta,
        descripcion: this.descripcion
      },
      opciones: opcionesValidas
    };

    this.formularioService.crearFormularioConOpciones(encuesta)
      .subscribe({
        next: res => {
          console.log('Encuesta creada', res);
          alert('Encuesta creada correctamente');
          this.nombre = '';
          this.pregunta = '';
          this.descripcion = '';
          this.opciones = [{ valor: '' }, { valor: '' }];
        },
        error: err => {
          console.error('Error al crear encuesta', err);
          alert('Error al crear la encuesta');
        }
      });
  }

}

