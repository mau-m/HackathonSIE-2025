import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormularioService } from '../../../services/formulario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vote-poll',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vote-poll.component.html',
  styleUrls: ['./vote-poll.component.css']
})
export class VotePollComponent implements OnInit {
  creador: string = '';
  descripcion: string = '';
  opciones: string[] = [];
  opcionSeleccionada: string = '';

  constructor(
    private authService: AuthService,
    private formularioService: FormularioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formularioService.obtenerFormularioPorId(+id).subscribe({
        next: (encuesta: any) => {
          this.creador = encuesta.nombre;
          this.descripcion = encuesta.descripcion;
          this.opciones = Array.isArray(encuesta.opciones)
            ? encuesta.opciones.map((op: any) => typeof op === 'string' ? op : op.valor)
            : [];
        },
        error: (error) => {
          console.error('Error al cargar encuesta:', error);
          alert('No se pudo cargar la encuesta');
        }
      });
    }
  }

  login(): void {
    this.authService.loginWithGoogle()
      .then(user => {
        console.log('Usuario logueado:', user);
      })
      .catch(err => {
        console.error('Error en login:', err);
      });
  }

  votar(): void {
    if (!this.opcionSeleccionada) {
      alert('Por favor selecciona una opción antes de votar.');
      return;
    }

    alert(`Has votado por: ${this.opcionSeleccionada}`);
    //Lammar al back
  }
}

