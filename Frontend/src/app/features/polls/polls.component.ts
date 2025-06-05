import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormularioService } from '../../services/formulario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-polls',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  encuestas: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.cargarEncuestas();
  }

  login() {
    this.authService.loginWithGoogle()
      .then(user => console.log('Usuario logueado:', user))
      .catch(err => console.error('Error en login:', err));
  }

 cargarEncuestas() {
  this.formularioService.obtenerFormularios().subscribe({
    next: (res: any) => {
      // Si res.data existe y es array, úsalo, sino asigna array vacío
      this.encuestas = Array.isArray(res.data) ? res.data : [];
    },
    error: (err) => {
      console.error('Error al cargar encuestas:', err);
      this.encuestas = [];  // En caso de error también aseguras que sea array vacío
    }
  });
}



  irAVotar(id: number) {
    this.router.navigate(['/vote-poll', id]);
  }
}

