import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Espera 3 segundos y luego redirige a 'home'
    setTimeout(() => {
      this.router.navigate(['/polls']);
    }, 5000);
  }

}
