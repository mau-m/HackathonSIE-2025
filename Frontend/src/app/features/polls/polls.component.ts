import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from '../../firebase.config';  // Asegúrate de que exista este archivo
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent {
constructor(private authService: AuthService,private router: Router ) {}

  login() {
    this.authService.loginWithGoogle()
      .then(user => {
        console.log('Usuario logueado:', user);
        // Aquí puedes manejar lo que quieres hacer con el usuario
      })
      .catch(err => {
        console.error('Error en login:', err);
      });
  }

  irAVotar() {
  this.router.navigate(['/vote-poll']);
}
}
