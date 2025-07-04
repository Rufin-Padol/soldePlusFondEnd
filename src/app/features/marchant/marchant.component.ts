import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UtlisateurService } from '../../Services/utlisateur.service';
import { UserDto } from '../../models/UserDto';
import { Role } from '../../models/role.enum';
import { TransationService } from '../../Services/transation.service';
import { TransactionDto } from '../../models/TransactionDto.model';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-marchant',
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './marchant.component.html',
  styleUrl: './marchant.component.css',
})
export class MarchantComponent implements OnInit {
  likegoodinc: number = 2;
  likebadinc: number = 2;
  likegood: boolean = false;
  likebad: boolean = false;
  retraitLoading: boolean = false;
  loadingMarchants: { [id: number]: boolean } = {};
  numeroMarchant: number = 237697847396; // Exemple d'ID de marchand
  utilisateurId!: number;
  typeStrnasation!: string;

    showSuccessMessage: boolean = false;
 eponseMessage!: string;
  userId: number = 0;
  idMarchant: number = 0;
  soldeMarchand: any ;
  utilisateurs: UserDto[] = [];
  utilisateursAdmin: UserDto[] = [];
  utilisateu!: UserDto;
  reponseMessage: string = '';
  CleParrannage: boolean = false;
  dto!: TransactionDto;
  montant: number = 0;
  putMontant: boolean = false;
  methodeRetrait: string = 'orange'; // Valeur par défaut

  @ViewChild('dialogMontant') dialogMontant!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  showErrorMessage: boolean =false;
  messageErreur: string = 'solde insuffisant';

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private utilisateurService: UtlisateurService,
    private route: ActivatedRoute,
    private transationService: TransationService
  ) {}
  ngOnInit(): void {
    this.getUtilisateurById();
    this.getUtilisateurByRole();
    this.getUtilisateurByRoleAdmin();
   
    
    console.log(this.utilisateurs);
    console.log(this.utilisateursAdmin);

    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      const type = params.get('type');
      if (userId && type) {
        this.utilisateurId = +userId;
        this.typeStrnasation = type;

        console.log(
          'Utilisateur ID récupéré (matrix param) :',
          this.utilisateurId
        );
      } else {
        console.log('Pas de userId dans les matrix params');
      }
    });
  }

  incremanetlikegood() {
    if (this.likegood) {
      this.likegood = false;
      this.likegoodinc--;
    } else {
      this.likegood = true;
      this.likegoodinc++;
    }
  }

  incremanetlikebad() {
    if (this.likebad) {
      this.likebad = false;
      this.likebadinc--;
    } else {
      this.likebad = true;
      this.likebadinc++;
    }
  }

  navigateMarcahntList(marchandId: any, solde: any) {
    
    if(solde <= 3999){
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;  
      this.messageErreur = 'solde marchant insuffisant';
      }
      , 2000);
      return;
    }
    this.loadingMarchants[marchandId] = true;

    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      const type = params.get('type');
      if (userId && type) {
        this.utilisateurId = +userId;
        this.typeStrnasation = type;
        console.log(
          'Utilisateur ID récupéré (matrix param) :',
          this.utilisateurId
        );
      } else {
        console.log('Pas de userId dans les matrix params');
      }
    });

    setTimeout(() => {
      this.loadingMarchants[marchandId] = false;
      this.idMarchant = marchandId;

      this.creerTransaction(solde);
    }, 1000);
  }

  getUtilisateurByRole() {
    this.utilisateurService
      .getUtilisateursAvecAvisParRole(Role.MARCHANT)
      .subscribe({
        next: (utilisateur) => {
          console.log('Utilisateur récupéré:', utilisateur);

          this.utilisateurs = this.shuffleArray(utilisateur);

          // traitement UI ici
        },
        error: (err) => {
          console.error('Erreur:', err.message);
          // affichage message erreur dans l'UI
        },
      });
  }


 getUtilisateurByRoleAdmin() {
    this.utilisateurService
      .getUtilisateursAvecAvisParRole(Role.ADMIN)
      .subscribe({
        next: (utilisateur) => {
          console.log('Utilisateur récupéré:', utilisateur);

          this.utilisateursAdmin = this.shuffleArray(utilisateur);

          // traitement UI ici
        },
        error: (err) => {
          console.error('Erreur:', err.message);
         
            'Une erreur est survenue lors de la récupération des marchands. Veuillez réessayer plus tard.';
          // affichage message erreur dans l'UI
        },
      });
  }

  getUtilisateurById() {
    const id = localStorage.getItem('user_email');
    if (!id) {
      console.error('ID marchand non trouvé dans le localStorage');
      return;
    }

    this.utilisateurService.getUtilisateurByEmail(id).subscribe({
      next: (utilisateu) => {
        console.log('Utilisateur récupéré:', utilisateu);
        if (utilisateu.cleParrainage) {
          console.error(
            ' marchand non trouvé dans le localStorage',
            utilisateu.cleParrainage
          );
          this.CleParrannage = true;
        }
        this.utilisateu = utilisateu;
        // traitement UI ici
      },
      error: (err) => {
        console.error('Erreur:', err.message);
        // affichage message erreur dans l'UI
      },
    });
  }

  creerTransaction(soldeMarchant: any ) {
    if (!this.idMarchant || !this.utilisateurId) {
      console.error('idMarchant ou utilisateurId manquant');
      return;
    }

    if (this.typeStrnasation === 'activation') {
      this.dto = {
        type: 'ACHAT_CLE',
        montant: 5000,

        emetteurId: this.utilisateurId,
        recepteurId: this.idMarchant,

        // ajoute ici les autres champs nécessaires à ta transaction
      };
    } else if (this.typeStrnasation === 'retrait') {
      if (!this.montant || this.montant <= 0) {
        console.error('Montant invalide');
        this.reponseMessage = 'Le montant doit être supérieur à 0';
        return;
      }

      if (this.utilisateu?.solde && this.utilisateu?.solde < this.montant) {
        console.error('Le montant doit être inferiere ou égal à ton solde');
        this.reponseMessage;
        return;
      }
      this.dto = {
        type: 'RETRAIT',
        montant: this.montant,

        emetteurId: this.utilisateurId,
        recepteurId: this.idMarchant,

        // ajoute ici les autres champs nécessaires à ta transaction
      };
    } else if (this.typeStrnasation === 'recharge') {
      if (!this.montant || this.montant <= 0) {
        console.error('Montant invalide');
        this.reponseMessage = 'Le montant doit être supérieur à 0';
        return;
      }

      if (soldeMarchant && soldeMarchant > this.montant) {
        console.error('Le montant doit être supérieur ou égal à 5500');
        this.reponseMessage;
        return;
      }
      this.dto = {
        type: 'VENTE_CLE',
        montant: this.montant,

        emetteurId: this.utilisateurId,
        recepteurId: this.idMarchant,

        // ajoute ici les autres champs nécessaires à ta transaction
      };
    }

    this.transationService.creerTransaction(this.dto).subscribe({
      next: (response) => {
        console.log('Transaction créée avec succès:', response);
        this.reponseMessage =
          'Patientez, votre transaction est en cours de traitement...';
        // tu peux mettre à jour ton UI, démarrer ta progression, etc
        localStorage.setItem(
          'typeTransaction',  
         this.typeStrnasation  
        );

          localStorage.setItem(
          'montant',  
         this.montant.toString()  
        );
        this.router.navigate(['/transactions'], {
          queryParams: {
            idMarchant: this.idMarchant,
            userId: this.utilisateurId,
           
          },

        });
      },
    error: (err) => {
  this.showErrorMessage = true;
  this.messageErreur = err.error.message || 'Erreur de récupération des marchands';
  console.error('Erreur :', this.messageErreur);

  // Optionnel : cacher après 4 secondes
  setTimeout(() => {
    this.showErrorMessage = false;
  }, 4000);
}

    });
  }

  Montannt(marchandId: any,solde: any) {
    this.idMarchant = marchandId;
    this.soldeMarchand = solde;
    this.dialogRef = this.dialog.open(this.dialogMontant, {
      width: '400px',
    });

    // Gérer la fermeture du dialog
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Traitement si nécessaire après fermeture
      }
    });
  }

  validerMontant(solde:any) {
    this.retraitLoading = true;
    if(this.typeStrnasation === 'retrait') {
  if (!this.montant || this.montant <= 0) {
      this.reponseMessage = 'Veuillez entrer un montant valide';
      this.retraitLoading = false;
      return;
    }

    if (this.utilisateu?.solde && this.utilisateu.solde < this.montant) {
      this.retraitLoading = false;
      this.reponseMessage = 'Solde insuffisant';
      return;
    }

    this.dialogRef.close(this.montant); // Passer le montant comme résultat

    setTimeout(() => {
      this.retraitLoading = false;
      this.creerTransaction(solde);
    }, 2000);
    }

    if(this.typeStrnasation === 'recharge') {
      if (!this.montant || this.montant <= 0) {
        this.reponseMessage = 'Veuillez entrer un montant valide';
        this.retraitLoading = false;
        return;
      }

      if (solde && solde > this.montant) {
        this.retraitLoading = false;
        this.reponseMessage = 'Solde Marchant insuffisant';
        return;
      }

      this.dialogRef.close(this.montant); // Passer le montant comme résultat

      setTimeout(() => {
        this.retraitLoading = false;
        this.creerTransaction(solde);
      }, 2000);
    }
  
  }

  shuffleArray(array: any[]) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
