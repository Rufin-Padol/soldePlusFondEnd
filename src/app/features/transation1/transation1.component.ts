import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { UtlisateurService } from '../../Services/utlisateur.service';
import { UserDto } from '../../models/UserDto';

@Component({
  selector: 'app-transation1',
  imports: [CommonModule],
  templateUrl: './transation1.component.html',
  styleUrl: './transation1.component.css'
})
export class Transation1Component implements OnInit {


 idMarchant!: number;
  utilisateurId!: number;
  reponseMessage: string = '';
  typeTransation: string = localStorage.getItem('typeTransation') || '';
  utilisateur!: UserDto ;
montant: string = localStorage.getItem('montant') || '';

  constructor(private route: ActivatedRoute, private router:Router,private utilisateurService :UtlisateurService) {}

  ngOnInit() {
this.montant = localStorage.getItem('montant') || '';
this.typeTransation = localStorage.getItem('typeTransaction') || '';
      this.route.queryParamMap.subscribe(params => {
    this.idMarchant = +params.get('idMarchant')!;
    this.utilisateurId = +params.get('userId')!;
    console.log('idMarchant (queryParam):', this.idMarchant, 'utilisateurId (queryParam):', this.utilisateurId);
this.getUtilisateurById();
    
  });

  
  }
currentStatus: number = 0;
contactMerchant() {
  if (!this.utilisateur?.telephone) {
    console.warn('Numéro de téléphone manquant');
    return;
  }

  const numeroWhatsApp = this.utilisateur.telephone.toString().replace(/\s+/g, '');
  const lienWhatsApp = `https://wa.me/${numeroWhatsApp}`;
  
  window.open(lienWhatsApp, '_blank');
}
cancelTransaction() {
    this.router.navigate(['/clients']);
}
steps = [
  {
    title: 'Paiement initié',
    description: 'Vous avez démarré la transaction',
    note: 'En attente de votre paiement'
  },
  {
    title: 'Paiement effectué',
    description: 'En attente de validation par le marchand'
  },
  {
    title: 'Validation en cours',
    description: 'Le marchand vérifie votre paiement'
  },
  {
    title: 'Clé attribuée',
    description: 'Votre clé sera disponible dans votre espace'
  }
];



// Dans votre composant
currentStep = 1;
progress = 25;
transactionId = Math.floor(Math.random() * 1000000);
dateNow = new Date();

getStatusText(step: number): string {
  const statuses = [
    'Initialisation',
    'Paiement en attente',
    'Validation marchand',
    'Terminé'
  ];
  return statuses[step - 1] || '';
}







// Simuler la progression (exemple)
simulateProgress() {
  const interval = setInterval(() => {
    if (this.currentStep < 4) {
      this.currentStep++;
      this.progress = this.currentStep * 25;
      
      // Simulation de délais variables
      const delay = [1000, 3000, 2000][this.currentStep - 2] || 0;
      setTimeout(() => {
        if (this.currentStep < 4) {
          this.currentStep++;
          this.progress = this.currentStep * 25;
        }
      }, delay);
    } else {
      clearInterval(interval);
    }
  }, 5000);
}





getUtilisateurById( ) {
  this.utilisateurService.getUtilisateurAvecAvis(this.idMarchant).subscribe({
  next: utilisateur => {
    console.log('Utilisateur récupéré:', utilisateur);
    
        this.utilisateur = utilisateur;
 

    // traitement UI ici
  },
  error: err => {
    console.error('Erreur:', err.message);
    // affichage message erreur dans l'UI
  }
});
}



}
