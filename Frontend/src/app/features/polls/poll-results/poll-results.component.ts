import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import necesario para *ngIf, *ngFor, etc.
import { FormularioService } from '../../../services/formulario.service';
import { AuthService } from '../../../services/auth.service';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-poll-results',
  standalone: true,            // <-- marca como standalone
  imports: [CommonModule],      // <-- importa CommonModule para directivas estructurales
  templateUrl: './poll-results.component.html',
  styleUrls: ['./poll-results.component.css']
})
export class PollResultsComponent implements OnInit, AfterViewInit {
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;

  encuestaId!: number;
  encuestaTitulo: string = '';
  resultados: any[] = [];
  totalVotos: number = 0;
  chart: any;

  // Lista simulada de encuestas para el selector
  encuestas = [
    { id: 1, titulo: 'Encuesta 1' },
    { id: 2, titulo: 'Encuesta 2' },
    { id: 3, titulo: 'Encuesta 3' }
  ];

  constructor(
    private formularioService: FormularioService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.encuestaId = 1;
    this.cargarResultados(this.encuestaId);
  }

  login() {
    this.authService.loginWithGoogle()
      .then(user => console.log('Usuario logueado:', user))
      .catch(err => console.error('Error en login:', err));
  }

  ngAfterViewInit() {
    // No es necesario aquí por el momento
  }

 

  cargarResultados(id: number) {
    this.formularioService.obtenerResultadosPorId(id).subscribe({
      next: (res: any) => {
        if (res.codigo === 200 && res.data) {
          const opciones = res.data;
          const total = opciones.reduce((acc: number, curr: any) => acc + +curr.total_votos, 0);
          this.totalVotos = total;
          this.encuestaTitulo = `Resultados encuesta #${id}`;

          this.resultados = opciones.map((op: any) => ({
            texto: op.nombre,
            votos: +op.total_votos,
            porcentaje: total ? ((+op.total_votos / total) * 100).toFixed(1) : '0'
          }));

          this.cdr.detectChanges();

          this.crearGrafico(opciones);
        } else {
          console.error('Respuesta inesperada:', res);
        }
      },
      error: err => console.error('Error cargando resultados', err)
    });
  }

  onEncuestaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    // ahora usas value para cargar resultados
    this.cargarResultados(+value);
  }


  crearGrafico(opciones: any[]) {
    if (!this.pieChartRef) {
      console.error('Canvas no está disponible');
      return;
    }

    const canvas = this.pieChartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = opciones.map(op => op.nombre);
    const data = opciones.map(op => +op.total_votos);

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          label: 'Votos',
          data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Resultados de la encuesta' }
        }
      }
    });
  }
}

