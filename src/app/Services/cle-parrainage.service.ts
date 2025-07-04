import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CleParrainageDto } from '../models/CleParrainageDto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CleParrainageService {

 private readonly API_URL = 'http://localhost:8080/utilisateurs';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Générer une clé de parrainage pour un utilisateur
   */
  genererCleParrainage(utilisateurId: number): Observable<CleParrainageDto> {
    return this.http.post<CleParrainageDto>(`${this.API_URL}/${utilisateurId}`, null);
  }

  /**
   * ✅ Obtenir la clé de parrainage d’un utilisateur
   */
  getCleParrainage(utilisateurId: number): Observable<CleParrainageDto> {
    return this.http.get<CleParrainageDto>(`${this.API_URL}/${utilisateurId}`);
  }

  // Tu peux aussi ajouter ça si la suppression est activée côté backend :
  // deleteCle(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.API_URL}/${id}`);
  // }
}