import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormularioService } from '../../../services/formulario.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'consult-poll',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './consult-poll.component.html',
  styleUrls: ['./consult-poll.component.css']
})
export class ConsultPollComponent implements OnInit {
  pollId!: number;
  resultados: any;
  encuestas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formularioService: FormularioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.pollId = +idParam;
        this.cargarResultados(this.pollId);
      } else {
        this.cargarEncuestas();
      }
    });
  }

  cargarEncuestas() {
    this.formularioService.obtenerFormularios().subscribe({
      next: (res: any) => {
        this.encuestas = Array.isArray(res.data) ? res.data : [];
      },
      error: (err) => {
        console.error('Error al cargar encuestas:', err);
        this.encuestas = [];
      }
    });
  }

  cargarResultados(id: number) {
    this.formularioService.obtenerResultadosPorId(id).subscribe({
      next: (res: any) => this.resultados = res.data,
      error: (err) => console.error('Error al obtener resultados:', err)
    });
  }

  login() {
    this.authService.loginWithGoogle()
      .then(user => console.log('Usuario logueado:', user))
      .catch(err => console.error('Error en login:', err));
  }

  verResultados(id: number) {
    this.router.navigate(['/poll-results', id]);
  }
}
