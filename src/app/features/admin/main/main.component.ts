import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {



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
}
