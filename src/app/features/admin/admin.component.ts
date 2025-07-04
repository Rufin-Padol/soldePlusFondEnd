import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UtlisateurService } from '../../Services/utlisateur.service';
import { UserDto } from '../../models/UserDto';

@Component({
  selector: 'app-admin',
  imports: [CommonModule ,RouterLink,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  sidebarOpen = true;
  lastUpdate = new Date();

  utilisatuer!:UserDto;
  idUtyilisa!:number;
  userRole!: string;
  userEmail!: string;
 
  constructor(private router: Router, private utilisateurService : UtlisateurService) {}
  ngOnInit(): void {
      this.userRole = localStorage.getItem('user_role') || 'CLIENT';
      this.userEmail = localStorage.getItem('user_email') || '';
       
      this.getUtilisateurByEmail();
  }


  menuItems = [
    { title: 'Tableau de bord', icon: 'fas fa-tachometer-alt', link: '/admin', active: true },
    { title: 'Utilisateurs', icon: 'fas fa-users', link: '/admin/utilisateurs', badge: '12' },
    { title: 'Marchands', icon: 'fas fa-store', link: '/admin/marchands' },
    { title: 'Transactions', icon: 'fas fa-exchange-alt', link: '/admin/transactions' },
    // { title: 'Clés', icon: 'fas fa-key', link: '/admin/keys' },
    // { title: 'Réclamations', icon: 'fas fa-exclamation-circle', link: '/admin/complaints', badge: '5' },
    // { title: 'Paramètres', icon: 'fas fa-cog', link: '/admin/settings' },
    // { title: 'Rapports', icon: 'fas fa-chart-bar', link: '/admin/reports' }
  ];

  transactions = [
    {
      id: 'TRX' + Math.floor(Math.random() * 10000),
      userName: 'Amadou Diallo',
      userPhone: '+225 07 12 34 56 78',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      amount: 5000,
      status: 'completed',
      date: new Date()
    },
    // ... autres transactions
  ];

  pendingRequests = [
    {
      type: 'Achat de clés',
      userName: 'Michel Kouassi',
      amount: 18000,
      date: new Date()
    },
    // ... autres demandes
  ];

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  toggleNotifications() {
  // this.showNotifications = !this.showNotifications;
  // if (this.showNotifications) {
  //   this.notificationCount = 0; // Réinitialise le compteur quand on clique
  // }
console.log('Navigating to notifications for user ID:', this.idUtyilisa);
  this.router.navigate(['/notification', this.idUtyilisa]);
}



// getUtilisateurByEmail
getUtilisateurByEmail( ) {
  this.utilisateurService.getUtilisateurByEmail(this.userEmail).subscribe({
  next: utilisateur => {
    console.log('Utilisateur récupéré:', utilisateur);
    this.utilisatuer = utilisateur;
    this.idUtyilisa = this.utilisatuer.id || 0;
     
      
         
   
    // traitement UI ici
  },
  error: err => {
    console.error('Erreur:', err.message);
    // affichage message erreur dans l'UI
  }
});
}
}
