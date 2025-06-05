import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, User, onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

import { firebaseConfig } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private provider = new GoogleAuthProvider();

  // BehaviorSubject para mantener el usuario actual y emitir cambios
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    // Escuchar cambios de estado de autenticación (login/logout)
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  async loginWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const idToken = await result.user.getIdToken();

      // Opcional: llamar backend con el token
      const response = await fetch("http://localhost:3000/api/v1/privado", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      const data = await response.json();
      console.log("✅ Backend:", data);

      // Actualizamos el currentUser
      this.currentUserSubject.next(result.user);

      return result.user;
    } catch (error) {
      console.error("❌ Error en login:", error);
      throw error;
    }
  }
}
