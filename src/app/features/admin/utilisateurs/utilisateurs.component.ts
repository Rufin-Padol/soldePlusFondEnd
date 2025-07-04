import { Component, NgModule, OnInit } from '@angular/core';
import { UserDto } from '../../../models/UserDto';
import { CommonModule } from '@angular/common';
import { UtlisateurService } from '../../../Services/utlisateur.service';

@Component({
  selector: 'app-utilisateurs',
  imports: [CommonModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit {
  roles = ['ADMIN', 'MARCHAND', 'CLIENT', 'SUPER_ADMIN'];
  statuses = ['ACTIF', 'INACTIF', 'SUSPENDU'];
  utilisateurs: UserDto[] = [];
  users: UserDto[] = [
    {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
      {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean@example.com',
      telephone: '+225 07 12 34 56 78',
      cleParrain: 'ABC123',
      solde: 15000,
      role: 'ADMIN',
      status: 'ACTIF',
      dateDerniereConnexion: '2023-10-01T12:00:00Z',
      photoProfil: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    // ... autres utilisateurs de test
  ];

  constructor( private utilisateurService: UtlisateurService,) {}
  ngOnInit(): void {
     this.getUtilisateurByRole();
  }

 
  updateUserRole(user: UserDto) {
    console.log('Mise à jour du rôle pour', user.nom, '->', user.role);
    // Ici, vous ajouteriez l'appel API pour mettre à jour le rôle
  }

  toggleUserStatus(user: UserDto) {
    user.status = user.status === 'ACTIF' ? 'INACTIF' : 'ACTIF';
    console.log('Changement de statut pour', user.nom, '->', user.status);
    // Ici, vous ajouteriez l'appel API pour mettre à jour le statut
  }

  deleteUser(user: UserDto) {
    if(confirm(`Êtes-vous sûr de vouloir supprimer ${user.nom} ?`)) {
      console.log('Suppression de', user.nom);
      // Ici, vous ajouteriez l'appel API pour supprimer l'utilisateur
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }

  viewDetails(user: UserDto) {
    console.log('Voir détails de', user.nom);
    // Navigation vers la page de détails
  }




    getUtilisateurByRole() {
      this.utilisateurService
        .getAllUtilisateurs()
        .subscribe({
          next: (utilisateur) => {
            console.log('Utilisateur récupéré:', utilisateur);
  
            this.utilisateurs = utilisateur;
  
            // traitement UI ici
          },
          error: (err) => {
            console.error('Erreur:', err.message);
            // affichage message erreur dans l'UI
          },
        });
    }
}
