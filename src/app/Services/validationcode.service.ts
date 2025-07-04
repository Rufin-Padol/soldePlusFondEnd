import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationDto } from '../models/ValidationDto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationcodeService {

   private readonly ENDPOINT = 'http://localhost:8080/validation';

  constructor(private http: HttpClient) {}

  /**
   * ✅ Envoie un code de validation pour l’utilisateur
   */
  envoyerCode(id: number): Observable<ValidationDto> {
    return this.http.post<ValidationDto>(`${this.ENDPOINT}/envoyer/${id}`, null);
  }

  /**
   * ✅ Active un compte avec le code
   */
  activerCompte(id: number, code: string): Observable<ValidationDto> {
    const params = new HttpParams().set('code', code);
    return this.http.post<ValidationDto>(`${this.ENDPOINT}/activer/${id}`, null, { params });
  }

  /**
   * ✅ Renouvelle un code de validation
   */
  renouvelerCode(id: number): Observable<ValidationDto> {
    return this.http.post<ValidationDto>(`${this.ENDPOINT}/renouveler/${id}`, null);
  }
}
