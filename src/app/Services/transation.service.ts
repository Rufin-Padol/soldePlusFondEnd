import { Injectable } from '@angular/core';
import { UserDto } from '../models/UserDto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Role, StatusTransation } from '../models/enums.model';
import { TransactionDto } from '../models/TransactionDto.model';

@Injectable({
  providedIn: 'root',
})
export class TransationService {
  constructor(private http: HttpClient) {}

  private readonly ENPOINT = 'http://localhost:8080/utilisateurs';
  private readonly ENPOINTRANSATION = 'http://localhost:8080/transactions';

  private readonly CREDITER_URL = '/crediter';
  private readonly DEBITER_URL = '/debiter';
  private readonly PARRAINNAGE_URL = '/parrainage';
  private readonly GET_UTLISATEUR_BY_ROLE_URL = '/par-role';

  /**
   * ✅ Crédite le compte d’un utilisateur
   */
  crediter(id: number, montant: number): Observable<UserDto> {
    const params = new HttpParams().set('montant', montant);
    return this.http.post<UserDto>(
      `${this.ENPOINT}/compte/${id}/${this.CREDITER_URL}`,
      null,
      { params }
    );
  }

  /**
   * ✅ Débite le compte d’un utilisateur
   */
  debiter(id: number, montant: number): Observable<UserDto> {
    const params = new HttpParams().set('montant', montant);
    return this.http.post<UserDto>(
      `${this.ENPOINT}/compte/${id}/${this.DEBITER_URL}`,
      null,
      { params }
    );
  }

  /**
   * ✅ Génére une clé de parrainage
   */
  genererCleParrainage(id: number): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.ENPOINT}/cle/${id}/${this.PARRAINNAGE_URL}`,
      {}
    );
  }

  /**
   * ✅ Créer une transaction
   */
  creerTransaction(dto: TransactionDto): Observable<TransactionDto> {
    return this.http.post<TransactionDto>(`${this.ENPOINTRANSATION}/creer`, dto);
  }

  /**
   * ✅ Obtenir toutes les transactions
   */
  getAllTransactions(): Observable<TransactionDto[]> {
    return this.http.get<TransactionDto[]>(`${this.ENPOINTRANSATION}/getAll`);
  }

  /**
   * ✅ Obtenir une transaction par ID
   */
  getTransactionById(id: number): Observable<TransactionDto> {
    return this.http.get<TransactionDto>(`${this.ENPOINTRANSATION}/getById/${id}`);
  }

  /**
   * ✅ Valider une transaction
   */
  validerTransaction(id: number): Observable<TransactionDto> {
    return this.http.put<TransactionDto>(
      `${this.ENPOINTRANSATION}/${id}/valider`,
      null
    );
  }

  /**
   * ✅ Annuler une transaction
   */
  annulerTransaction(id: number): Observable<TransactionDto> {
    return this.http.put<TransactionDto>(
      `${this.ENPOINTRANSATION}/${id}/annuler`,
      null
    );
  }

  /**
   * ✅ Supprimer une transaction
   */
  deleteTransaction(id: number): Observable<TransactionDto> {
    return this.http.delete<TransactionDto>(`${this.ENPOINTRANSATION}/delete/${id}`);
  }
}
