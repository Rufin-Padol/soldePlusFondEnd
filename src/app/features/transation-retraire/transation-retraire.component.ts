import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-transation-retraire',
  imports: [CommonModule],
  templateUrl: './transation-retraire.component.html',
  styleUrl: './transation-retraire.component.css'
})
export class TransationRetraireComponent {

  constructor(private router: Router) {}
currentStatus: number = 0;
contactMerchant() {
throw new Error('Method not implemented.');
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
}
