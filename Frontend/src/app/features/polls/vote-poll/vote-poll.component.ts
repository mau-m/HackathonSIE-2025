import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormularioService } from '../../../services/formulario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from 'firebase/auth';

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
  opciones: { id: number, opcion: string }[] = [];
  opcionSeleccionadaId: number | null = null;
  usuarioEmail: string = 'anonimo';

  constructor(
    private authService: AuthService,
    private formularioService: FormularioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formularioService.obtenerFormularioPorId(+id).subscribe({
        next: (response: any) => {
          console.log('Datos recibidos del backend:', response);

          if (response?.data?.formulario && response?.data?.opciones) {
            this.creador = response.data.formulario.nombre || 'Desconocido';
            this.descripcion = response.data.formulario.pregunta || '';
            this.opciones = response.data.opciones;

            console.log('✅ Opciones cargadas:', this.opciones);
          } else {
            console.warn('⚠️ Datos incompletos:', response);
            alert('No se pudo cargar correctamente la encuesta.');
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar encuesta:', error);
          alert('Error al obtener la encuesta del servidor');
        }
      });

    }

    // Suscribirse al usuario autenticado
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.usuarioEmail = user?.email || 'anonimo';
    });
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
    if (this.opcionSeleccionadaId === null) {
      alert('Por favor selecciona una opción antes de votar.');
      return;
    }

    const voto = {
      usuario: this.usuarioEmail,
      formularioId: Number(this.route.snapshot.paramMap.get('id')),
      opcionId: this.opcionSeleccionadaId
    };

    this.formularioService.enviarVoto(voto).subscribe({
      next: () => alert('Voto registrado correctamente'),
      error: (error) => {
        console.error('Error al enviar voto:', error);
        alert('Error al registrar voto');
      }
    });
  }
}


