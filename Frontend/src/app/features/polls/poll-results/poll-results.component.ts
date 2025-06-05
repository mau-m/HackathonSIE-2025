import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Necesario para ngModel
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-poll-results',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './poll-results.component.html',
  styleUrl: './poll-results.component.css'
})
export class PollResultsComponent {
  constructor(private authService: AuthService) { }

  login() {
    this.authService.loginWithGoogle()
      .then(user => {
        console.log('Usuario logueado:', user);
      })
      .catch(err => {
        console.error('Error en login:', err);
      });
  }

  creador = 'Representante del Consejo Divisional';
  descripcion = '¿Estás a favor o en contra del paro en la Universidad Autónoma Metropolitana Unidad Iztapalapa?';
  opciones = ['A favor', 'En contra', 'Anular voto'];
  opcionSeleccionada = '';

  votar() {
    if (!this.opcionSeleccionada) {
      alert('Por favor selecciona una opción antes de votar.');
      return;
    }

    alert(`Has votado por: ${this.opcionSeleccionada}`);
  }
}

