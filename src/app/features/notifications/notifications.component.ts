import { CommonModule,Location } from '@angular/common';
 
import { Component, OnInit } from '@angular/core';
import { TransationService } from '../../Services/transation.service';
import { NotifactionService, NotificationParrainageDto } from '../../Services/notifaction.service';
import { ActivatedRoute } from '@angular/router';
 


interface Notification {
  id: number;
  code: number;
  date: string;
  message: string;
  read: boolean;
  senderAvatar: string;
  senderName: string;
  senderUsername: string;
  transactionId: number;
  type: 'friend-request' | 'info' | 'system';
}
@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})



export class NotificationsComponent implements OnInit {
 eponseMessage!: string;
  notification: NotificationParrainageDto[] = [];
  userId!: number;
  loadingValidation: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private transation: TransationService,
    private notifactionService: NotifactionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('userId');
      if (id) {
        this.userId = +id;
        this.getNotificationsByUtilisateur();
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  acceptNotification(transactionId: number) {
    this.loadingValidation = true;
    console.log('Transaction ID:', transactionId);
    if (!transactionId) {
      console.error('Transaction ID is not valid');
      this.loadingValidation = false;
      return;
    }
    this.transation.validerTransaction(transactionId).subscribe({
      next: transat => {
       
        console.log('Transaction validée:', transat);
       
        this.eponseMessage = transat.message || 'Transaction validée avec succès';
        this.showSuccessMessage = true;
         setTimeout(() => {
    this.loadingValidation = false;
       this.getNotificationsByUtilisateur();
        }, 2000);
        
        // Masquer le message après 2 secondes
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);


     
        // Mettre à jour l'état de la notification
        const notif = this.notification.find(n => n.transaction === transactionId);
        if (notif) {
          notif.read = true;
        }
      },
      error: err => {
        console.error('Erreur:', err.message);
          setTimeout(() => {
           this.loadingValidation = false;
        }, 1000);
       
          this.eponseMessage = 'Erreur lors de la validation de la transaction';
           setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
           
      }
    });
  }

  rejectNotification(transactionId: number) {
    this.transation.annulerTransaction(transactionId).subscribe({
      next: (transaction) => {
        console.log('Transaction annulée:', transaction);
        // Mettre à jour l'état de la notification
        const notif = this.notification.find(n => n.transaction === transactionId);
        if (notif) {
          notif.read = true;
        }
      },
      error: (err) => {
        console.error('Erreur:', err);
      }
    });
  }

  markAllAsRead() {
    // Implémentez cette fonction si votre API le permet
    // Sinon, mettez simplement à jour localement
    this.notification.forEach(notif => notif.read = true);
  }

  getNotificationsByUtilisateur() {
    this.notifactionService.getByIdUtilisateur(this.userId).subscribe({
      next: notifications => {
        console.log('Notifications:', notifications);
        this.notification = notifications || [];
      },
      error: err => {
        console.error('Erreur:', err.message);
      }
    });
  }

   goBack(): void {
    this.location.back();
  }

}
