import { Injectable } from '@angular/core';
import { User } from '../models/key.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '../models/UserDto';
import { Observable, tap } from 'rxjs';
import {
  AuthentificationResponseDTO,
  LoginRequest,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceTsService {
  private readonly ENPOINT = 'http://localhost:8080/utilisateurs';

  private readonly  REGISTER_URL = '/creation';
  private readonly  LOGIN_URL = '/connexion';
  private readonly  LOGOUT_URL = '/deconexion';
  private  readonly REFRESHTOKEN_URL ='/refreshToken';

  constructor(private http: HttpClient) {}

  // ✅ Méthode pro pour enregistrer un utilisateur
  creerUtilisateur(utilisateur: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.ENPOINT}${this.REGISTER_URL}`,
      utilisateur
    );
  }

  // ✅ Connexion et stockage sécurisé des tokens
  login(credentials: LoginRequest): Observable<AuthentificationResponseDTO> {
    return this.http
      .post<AuthentificationResponseDTO>(
        `${this.ENPOINT}${this.LOGIN_URL}`,
        credentials
      )
      .pipe(
        tap((response: AuthentificationResponseDTO) => {
           console.log('Storing tokens in localStorage:', response);
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('refresh_token', response.refreshToken);
          // Si besoin, stocker aussi d'autres infos (ex: id, nom, email, role)
          localStorage.setItem('user_nom', response.nom);
          localStorage.setItem('user_email', response.email);
          localStorage.setItem('user_role', response.role);
        })
      );
  }

  getToken(): string | null {
    console.log('token trouver');
    // Vérifie si le token est présent dans localStorage
    if (!localStorage.getItem('access_token')) {  
      console.warn('Aucun token trouvé dans localStorage');
      return null;
    }
    return localStorage.getItem('access_token');
  }

  logout(): void {
     console.log('token netoyer');
    localStorage.clear();
  }

  isLoggedIn(): boolean {
     console.log('token trouver connection');
    return !!this.getToken();
  }


  // ✅ Vérifie si le token est expiré
isTokenExpired(): boolean {
  const token = this.getToken();
  
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(new Date().getTime() / 1000); // en secondes
    return payload.exp < now;
  } catch (e) {
     console.log('token e');
    // Si le token est invalide ou mal formé, on considère qu'il est expiré
    return true;
  }
}


// ✅ Retourne true si l'utilisateur est connecté et que le token est valide
isSessionActive(): boolean {
  return this.isLoggedIn() && !this.isTokenExpired();
}

  // ✅ Déconnexion côté backend + nettoyage localStorage
  deconnexion(): Observable<string> {
    const token = this.getToken();
    if (!token) {
      // Pas de token en local, juste nettoyer localStorage et retourner observable vide
      this.logout();
      return new Observable((observer) => {
        observer.next('Déconnecté localement (pas de token trouvé)');
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .post<string>(`${this.ENPOINT}/${this.LOGOUT_URL}`, {}, { headers })
      .pipe(tap(() => this.logout()));
  }

  refreshToken(refreshToken: string): Observable<AuthentificationResponseDTO> {
  return this.http.post<AuthentificationResponseDTO>(
    `${this.ENPOINT}${this.REFRESHTOKEN_URL}`,
    { refreshToken }
  );
}


// ✅ Changer manuellement le mot de passe
changerMotDePasse(
  id: number,
  ancienMotDePasse: string,
  nouveauMotDePasse: string
): Observable<UserDto> {
  const url = `${this.ENPOINT}/${id}/changer-mot-de-passe`;
  const params = {
    ancienMotDePasse: ancienMotDePasse,
    nouveauMotDePasse: nouveauMotDePasse,
  };

  return this.http.patch<UserDto>(url, null, { params });
}

// ✅ Réinitialiser mot de passe via email
reinitialiserMotDePasse(email: string): Observable<UserDto> {
  const url = `${this.ENPOINT}/reinitialiser-mot-de-passe`;
  const params = { email: email };

  return this.http.post<UserDto>(url, null, { params });
}


}
