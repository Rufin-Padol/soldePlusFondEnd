import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
 export interface NotificationParrainageDto {
  id?: number;
  senderName?: string;
  senderUsername?: string;
  senderAvatar?: string;
  message?: string;
  date?: string;
  read?: boolean;
  type?: string;
  transaction?: any;
  
transactionId?: number;
  code?: number;
}


@Injectable({
  providedIn: 'root'
})
export class NotifactionService {

  

  private readonly API = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient) {}

  // ==================== CRÉER ====================
  creerNotification(notification: NotificationParrainageDto): Observable<NotificationParrainageDto> {
    return this.http.post<NotificationParrainageDto>(this.API, notification).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== LISTER TOUTES ====================
  getToutesNotifications(): Observable<NotificationParrainageDto[]> {
    return this.http.get<NotificationParrainageDto[]>(this.API).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== LISTER PAR TRANSACTION ====================
  getParTransaction(transactionId: number): Observable<NotificationParrainageDto[]> {
    return this.http.get<NotificationParrainageDto[]>(`${this.API}/transaction/${transactionId}`).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== LISTER PAR PRESTATAIRE ====================
  getParPrestataire(prestataireId: number): Observable<NotificationParrainageDto[]> {
    return this.http.get<NotificationParrainageDto[]>(`${this.API}/prestataire/${prestataireId}`).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== MARQUER COMME LUE ====================
  marquerCommeLue(id: number): Observable<NotificationParrainageDto> {
    return this.http.put<NotificationParrainageDto>(`${this.API}/${id}/lue`, null).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== PAR ID ====================
  getById(id: number): Observable<NotificationParrainageDto> {
    return this.http.get<NotificationParrainageDto>(`${this.API}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

   // ==================== PAR ID ====================
  getByIdUtilisateur(id: number): Observable<NotificationParrainageDto[]> {
    return this.http.get<NotificationParrainageDto[]>(`${this.API}/utilisateur/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== SUPPRIMER ====================
  supprimer(id: number): Observable<NotificationParrainageDto> {
    return this.http.delete<NotificationParrainageDto>(`${this.API}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // ==================== ERREUR ====================
  private handleError(error: any) {
    console.error('Erreur NotificationParrainageService:', error);
    return throwError(() => new Error(error?.message || 'Erreur serveur'));
  }
}
