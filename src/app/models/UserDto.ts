export interface UserDto {
  id?: number;
  nom: string;
  email: string;
  telephone?: string;
  motDePasse?: string;
  cleParrain?: string;
   avis?: {
    id: number;
   likePositif?: number;
   likeNegatif?: number;
    dateCreation: string;
  };
  solde?: number;
  status?: string;
   role: 'ADMIN' | 'CLIENT' | 'MARCHANT' | 'PARRAIN'; // adapte selon ton enum
  cleParrainage?: any;
  dateDerniereConnexion?: string;
  message?: string;
  code?: number;

  photoProfil?: string; // URL de la photo de profil
}    