
import { StatusTransation, TransactionType } from './enums.model';

 

export interface TransactionDto {
  id?: number;
  type?: TransactionType;
  montant: number ;

  emetteurId?: number;
  recepteurId?: number;
  recepteurEmail?: string;
  emetteurEmail?: string;

  statut?: StatusTransation;
  dateTransaction?: string; // ISO string (ex: '2024-08-21T14:00:00')

  // Pour les réponses
  message?: string;
  code?: number;
}