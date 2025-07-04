import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pipeline } from 'stream';
import { UtlisateurService } from '../../Services/utlisateur.service';
import { UserDto } from '../../models/UserDto';
import { NotifactionService, NotificationParrainageDto } from '../../Services/notifaction.service';
import { Console } from 'console';

@Component({
  selector: 'app-user',
  imports: [CommonModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

 
export class UserComponent implements OnInit {

  userId = 'PAR-'  + '*******';
 
parrainCode = '';
userRole:string= "";
userEmail:string= "";
totalFilleuls:string  = '0';
totalGains:number = 0;
filleulsIndirects:string = '';
lastUpdate = new Date();
utilisatuer!:UserDto;
idUtyilisa!:number;
showSuccessMessage: any;
eponseMessage: any;
  notification:  NotificationParrainageDto[]=[];

  ngOnInit() {
      this.userRole = localStorage.getItem('user_role') || 'CLIENT';
      this.userEmail = localStorage.getItem('user_email') || '';
       if(this.parrainCode == null || this.parrainCode == undefined ||this.userRole == "CLIENT") {
        this.parrainCode = "********";
      } 
      this.getUtilisateurByEmail();
     this.getNotificationsByUtilisateur();
    
     
  }


  constructor(private notifactionService: NotifactionService, private utlisateurService:UtlisateurService,private router: Router,private utilisateurService: UtlisateurService) {}



  // Ajoutez ces propriétés
notificationCount = 3; // Mettez le réel nombre de notifications
showNotifications = false;

// Ajoutez cette méthode
toggleNotifications() {
  // this.showNotifications = !this.showNotifications;
  // if (this.showNotifications) {
  //   this.notificationCount = 0; // Réinitialise le compteur quand on clique
  // }

  this.router.navigate(['/notification', this.idUtyilisa]);
}

// Exemple pour simuler de nouvelles notifications
simulateNewNotification() {
  this.notificationCount++;
}



loadingMarchants = false;
// Dans votre composant


filleuls:any = [
  // {
  //   name: 'Amadou Diallo',
  //   phone: '+225 07 12 34 56 78',
  //   date: new Date('2023-05-15'),
  //   status: 'actif',
  //   gain: 1500,
  //   avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  // },
  // ... autres filleuls
];




navigateMarcahntList(type: string) {
  this.loadingMarchants = true;
  setTimeout(() => {
    this.loadingMarchants = false;
    this.router.navigate(['/Marchants', { userId: this.idUtyilisa,type: type }]);
  }, 1000); // Simule un chargement de 1 seconde
  
}


// getUtilisateurByEmail
getUtilisateurByEmail( ) {
  this.utilisateurService.getUtilisateurByEmail(this.userEmail).subscribe({
  next: utilisateur => {
    console.log('Utilisateur récupéré:', utilisateur);
    this.utilisatuer = utilisateur;
    this.idUtyilisa = this.utilisatuer.id || 0;
     this.totalGains = this.utilisatuer.solde || 0;
       this.userId = 'PAR-'+this.utilisatuer.cleParrain || 'PAR-' + '*******';
        this.chargerNombreFilleuls();
         this.parrainCode =this.utilisatuer.cleParrainage.cle;
      this.chargerEtendueReseau();
    // traitement UI ici
  },
  error: err => {
    console.error('Erreur:', err.message);
    // affichage message erreur dans l'UI
  }
});
}




copyCode() {
   // Remplace ceci par ce que tu veux copier

  navigator.clipboard.writeText(this.parrainCode).then(() => {
    console.log('Lien copié avec succès !');
    // Optionnel : afficher un message à l'utilisateur
    alert('Lien copié dans le presse-papiers !');
  }).catch(err => {
    console.error('Erreur lors de la copie :', err);
    alert('Échec de la copie du lien.');
  });
}


copyLink() {
  const textToCopy = 'https://ton-lien-ou-autre-contenu.com'; // Remplace ceci par ce que tu veux copier

  navigator.clipboard.writeText(textToCopy).then(() => {
    console.log('Lien copié avec succès !');
    // Optionnel : afficher un message à l'utilisateur
    alert('Lien copié dans le presse-papiers !');
  }).catch(err => {
    console.error('Erreur lors de la copie :', err);
    alert('Échec de la copie du lien.');
  });
}


shareContent() {
  const shareData = {
    title: 'Découvrez ce marchand',
    text: 'Voici le code du marchand à utiliser : ' + this.parrainCode,
    url:'http://localhost:4200/register' + '?codeparai='+ this.parrainCode  // ou un lien personnalisé si tu veux partager une page spécifique
  };

  if (navigator.share) {
    navigator.share(shareData)
      .then(() => console.log('Partage réussi'))
      .catch(err => console.error('Erreur de partage :', err));
  } else {
    alert("Le partage n'est pas supporté sur ce navigateur.");
  }
}



 chargerNombreFilleuls(): void {
    this.utilisateurService.getNombreFilleuls(this.idUtyilisa).subscribe({
      next: (data) => (this.totalFilleuls = data,console.log('Nombre de filleuls chargés:', this.totalFilleuls)),
      
      error: (err) => console.error(err),
    });
  }

  chargerEtendueReseau(): void {
    this.utilisateurService.getEtendueReseau(this.idUtyilisa).subscribe({
      next: (data) => (
        console.log('Étendue du réseau chargée:', data),
        this.filleulsIndirects = data),
      error: (err) => console.error(err),
    });
  }

   getNotificationsByUtilisateur() {

    const email = localStorage.getItem('user_email');
    if (!email) {
      console.error('Email de l\'utilisateur non trouvé dans le localStorage');
      return;
    }


     this.utlisateurService.getUtilisateurByEmail(email).subscribe({
      next: utlisateur => {
     console.log('Utilisateur récupéré:', utlisateur);
       this.notifactionService.getByIdUtilisateur( utlisateur.id || 0).subscribe({
      next: notifications => {
        console.log('Notifications:', notifications);
        this.notification = notifications || [];
      },
      error: err => {
        console.error('Erreur:', err.message);
      }
    });
      },
      error: err => {
        console.error('Erreur:', err.message);
      }
    });
    
  }

}
