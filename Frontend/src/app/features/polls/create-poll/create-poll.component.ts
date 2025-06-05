import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-poll.component.html',
  styleUrl: './create-poll.component.css'
})
export class CreatePollComponent {
  descripcion: string = '';
  options: { valor: string }[] = [{ valor: '' }, { valor: '' }];

  constructor(private authService: AuthService) {}

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
    this.options.push({ valor: '' });
  }

  crearEncuesta(): void {
    const opcionesValidas = this.options
      .map(op => op.valor.trim())
      .filter(valor => valor !== '');

    if (!this.descripcion.trim() || opcionesValidas.length < 2) {
      alert('Por favor, agrega una descripción y al menos dos opciones.');
      return;
    }

    const encuesta = {
      descripcion: this.descripcion,
      opciones: opcionesValidas
    };

    console.log('Encuesta a guardar:', encuesta);
  }
}
