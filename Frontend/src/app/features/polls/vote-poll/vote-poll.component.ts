import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-vote-poll',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.css']  // ✅ Arreglado aquí
})
export class VotePollComponent {
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


