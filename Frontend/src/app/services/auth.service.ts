import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Importa o define aquí tu configuración Firebase
import { firebaseConfig } from '../firebase.config'; // ajusta la ruta según dónde tengas tu config

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);
  private provider = new GoogleAuthProvider();

  constructor() {}

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const idToken = await result.user.getIdToken();

      // Opcional: llama tu backend con el token si quieres
      const response = await fetch("http://localhost:3000/api/v1/privado", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      const data = await response.json();
      console.log("✅ Backend:", data);

      return result.user; // Devuelve el usuario autenticado
    } catch (error) {
      console.error("❌ Error en login:", error);
      throw error;  // Para que el componente pueda manejar el error
    }
  }
}
