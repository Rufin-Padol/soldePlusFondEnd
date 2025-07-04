import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../models/UserDto';
import { Role, StatusTransation } from '../models/enums.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtlisateurService {
  constructor(private http: HttpClient) {}

  private readonly ENPOINT = 'http://localhost:8080/utilisateurs';

  private readonly GET_UTLISATEURS_URL = '/getAll';
  private readonly GET_UTLISATEURS_DELETE_URL = '/delete';
  private readonly GET_UTLISATEUR_BY_ID_URL = '/getbyId';
  private readonly GET_UTLISATEUR_UPDATE_URL = '/update';
  private readonly GET_UTLISATEUR_CHANGE_STATUS_URL = '/status';
  private readonly GET_UTLISATEUR_BY_ROLE_URL = '/par-role';
  private readonly apiUrl = 'http://localhost:8080/utilisateurswithAvis';

  // ✅ TOUS LES UTILISATEURS
  getAllUtilisateurs(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${this.ENPOINT}${this.GET_UTLISATEURS_URL}`
    );
  }

  // ✅ UN UTILISATEUR PAR ID
  getUtilisateurById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(
      `${this.ENPOINT}/${this.GET_UTLISATEUR_BY_ID_URL}/${id}`
    );
  }

  // ✅ MISE À JOUR D’UN UTILISATEUR
  updateUtilisateur(id: number, utilisateur: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(
      `${this.ENPOINT}${this.GET_UTLISATEUR_UPDATE_URL}/${id}`,
      utilisateur
    );
  }

  // ✅ SUPPRESSION D’UN UTILISATEUR
  deleteUtilisateur(id: number): Observable<UserDto> {
    return this.http.delete<UserDto>(
      `${this.ENPOINT}${this.GET_UTLISATEURS_DELETE_URL}/${id}`
    );
  }

  /**
   * ✅ Change le statut d’un utilisateur
   */
  changerStatut(id: number, statut: StatusTransation): Observable<UserDto> {
    const params = new HttpParams().set('statut', statut);
    return this.http.patch<UserDto>(
      `${this.ENPOINT}/${id}${this.GET_UTLISATEUR_CHANGE_STATUS_URL}`,
      null,
      { params }
    );
  }

  /**
   * ✅ Récupère les utilisateurs par rôle (ADMIN, CLIENT, etc.)
   */
  getParRole(role: Role): Observable<UserDto[]> {
    const params = new HttpParams().set('role', role);
    return this.http.get<UserDto[]>(
      `${this.ENPOINT}${this.GET_UTLISATEUR_BY_ROLE_URL}`,
      { params }
    );
  }


  /**
   * Récupère un utilisateur par son email.
   * @param email Email de l'utilisateur à récupérer
   * @returns Observable<UtilisateurDto>
   */
  getUtilisateurByEmail(email: string): Observable<UserDto> {
    const url = `${this.ENPOINT}/by-email/${encodeURIComponent(email)}`;
    return this.http.get<UserDto>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let errMsg = 'Erreur inconnue';
        if (error.status === 404) {
          errMsg = `Utilisateur avec l'email "${email}" non trouvé.`;
        } else if (error.error?.message) {
          errMsg = error.error.message;
        }
        // Tu peux logger l'erreur ou la transformer ici
        return throwError(() => new Error(errMsg));
      })
    );
  }



  // ✅ Récupérer un utilisateur avec son avis
  getUtilisateurAvecAvis(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/${id}/avis`);
  }


   // ✅ Nombre de filleuls directs
  getNombreFilleuls(id: number): Observable<string> {
    return this.http.get(`${this.ENPOINT}/filleuls/${id}`, {
      responseType: 'text',
    });
  }

  // ✅ Étendue du réseau (filleuls + leurs filleuls)
  getEtendueReseau(id: number): Observable<string> {
    return this.http.get(`${this.ENPOINT}/reseau/${id}`, {
      responseType: 'text',
    });
  }


    // ✅ UtilisateursAvecAvisParRole
  getUtilisateursAvecAvisParRole(role: string): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.ENPOINT}/role/${role}/avis`);
  }
}
