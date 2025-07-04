import { Component, NgModule } from '@angular/core';
import { TransactionDto } from '../../../models/TransactionDto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransationService } from '../../../Services/transation.service';

@Component({
  selector: 'app-transation',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './transation.component.html',
  styleUrl: './transation.component.css'
})
export class TransationComponent {
  transactions: TransactionDto[] = [];
  filteredTransactions: TransactionDto[] = [];
  
  transactionTypes = ['VALIDER', 'VENTE_CLE', 'ACHAT_CLE'];
  transactionStatuses = ['VALIDER', 'EN_ATTENTE', 'ANNULEE'];
  
  selectedType: string = '';
  selectedStatus: string = '';
  
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private transationService: TransationService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transationService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.applyFilters(); // Applique les filtres dès le chargement
      },
      error: (err) => {
        console.error('Erreur:', err.message);
        // Gérer l'erreur UI ici
      }
    });
  }

  // Met à jour les statistiques à chaque changement
  get totalAmount(): number {
    return this.filteredTransactions
      .filter(t => t.statut === 'VALIDE')
      .reduce((sum, t) => sum + (t.montant || 0), 0);

       
  }
  
  get successCount(): number {
    return this.filteredTransactions.filter(t => t.statut === 'VALIDE').length;

  }
  
  get failedCount(): number {
    return this.filteredTransactions.filter(t => t.statut === 'ANNULE').length;
  }

  get paginatedTransactions(): TransactionDto[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredTransactions.slice(start, end);
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter(t => {
      const typeMatch = !this.selectedType || t.type === this.selectedType;
      const statusMatch = !this.selectedStatus || t.statut === this.selectedStatus;
      return typeMatch && statusMatch;
    });
    this.currentPage = 1; // Reset à la première page après filtrage
  }

  validateTransaction(transaction: TransactionDto): void {
    // if(confirm(`Valider la transaction #${transaction.id} ?`)) {
    //   this.transationService.validerTransaction(transaction.id, 'VALIDER').subscribe({
    //     next: () => {
    //       transaction.statut = 'VALIDER';
    //       this.applyFilters(); // Recalculer les stats
    //     },
    //     error: (err) => console.error('Erreur:', err)
    //   });
    // }
  }

  rejectTransaction(transaction: TransactionDto): void {
    // if(confirm(`Rejeter la transaction #${transaction.id} ?`)) {
    //   this.transationService.annulerTransaction(transaction.id,   ).subscribe({
    //     next: () => {
    //       transaction.statut = 'ANNULEE';
    //       this.applyFilters(); // Recalculer les stats
    //     },
    //     error: (err) => console.error('Erreur:', err)
    //   });
    // }
  }

  viewDetails(transaction: TransactionDto): void {
    console.log('Voir détails:', transaction);
    // Implémentez la navigation vers les détails
  }

  exportReceipt(transaction: TransactionDto): void {
    // this.transationService.exportReceipt(transaction.id).subscribe({
    //   next: (blob) => {
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `reçu_transaction_${transaction.id}.pdf`;
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //   },
    //   error: (err) => console.error('Erreur:', err)
    // });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
  }
}
 

 
