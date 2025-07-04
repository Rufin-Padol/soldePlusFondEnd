import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthServiceTsService } from '../../../Services/auth.service.ts.service';
import { ValidationDto } from '../../../models/ValidationDto.model';
import { ValidationcodeService } from '../../../Services/validationcode.service';

@Component({
  selector: 'app-activation-compte',
imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './activation-compte.component.html',
  styleUrl: './activation-compte.component.css'
})
export class ActivationCompteComponent   implements OnInit{



isloading:boolean = false;
isSend:boolean = false;
   showPassword = false;
  showConfirmPassword = false;


   private route=  inject(ActivatedRoute);



  
  // ... ton FormGroup etc.




  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if(field === 'password') {
      this.showPassword = !this.showPassword;
    } else if(field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // utilisateur: UserDto = {
  //   nom: '',
  //   email: '',
  //   motDePasse: '',
  //   telephone: '',
  //   solde: 0,
  //   role: 'CLIENT' // par défaut
  // };

  // message = '';
  // code = 0;


  // constructor(private authService: AuthServiceTsService) {}

  // onSubmit(): void {
  //   this.authService.creerUtilisateur(this.utilisateur).subscribe({
  //     next: (res) => {
  //       this.message = res.message ?? 'Création réussie';
  //       this.code = res.code ?? 201;
  //     },
  //     error: (err) => {
  //       this.message = err.error?.message ?? 'Erreur inattendue';
  //       this.code = err.status ?? 500;
  //     }
  //   });
  //}

  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  succesMessage = '';

  constructor(private fb: FormBuilder, private valid: ValidationcodeService, private router: Router,) {}

  ngOnInit() {


    this.registerForm = this.fb.group(
      {
        
        code: [''], // code parrainage, optionnel, pas de validator spécifique
     
      }
       
    );

 

      this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
    this.idUsers = params.get('id');
    console.log('ID utilisateur reçu:', this.idUsers );
    // Ici tu peux utiliser userId pour récupérer les données, valider, etc.
  })


     this.route.queryParams.subscribe(params => {
    const codeValidation = params['codeValidation'];
 
    if (codeValidation) {
      this.onSubmit2(codeValidation);
    }  
  });
  }

  
  
  get code(): AbstractControl | null {
    return this.registerForm.get('code');
  }
 

  
 


 

getCodeError(): string {
  // Si tu veux ajouter des validations sur le code, sinon retourne vide
  if (!this.code) return '';
  // Par exemple, on peut vérifier une longueur minimale si tu veux
  // if (this.code.hasError('minlength')) return 'Code trop court';
  return '';
}


 idUsers: number = 0; // Assurez-vous de définir l'ID de l'utilisateur ici

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.isloading = true; // Démarre le chargement
     

     console.error('donner envoyer:', this.code?.value );
    this.valid.activerCompte(this.idUsers, this.code?.value).subscribe({

        
      next: res => {
        if (res.code === 200 || res.code === 201) {
           // Arrête le chargement
         
                     console.error('reponse envoyer:', res );
                     this.succesMessage = res.message || '';
                           this.errorMessage =   '';
                     this.isloading = false;
                      setTimeout(() => {
                        this.router.navigate(['/login']);
                      }, 2000); // Redirection après 2 secondes
                     
        } else {
          this.errorMessage = res.message || 'Erreur inconnue';
                this.succesMessage = '';
          console.error('Erreur lors de l\'enregistrement:', res.message );
                 console.error('Erreur lors de l\'enregistrement:', this.code?.value );
                 this.isloading = false;
        }
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Erreur serveur';
         this.succesMessage = '';
        this.isloading = false;
         console.error('Erreur lors de l\'enregistrement:', err.error?.message);
      }
    });
  }


   onSubmit2(code:string) {
    this.submitted = true;
    
    this.isloading = true; // Démarre le chargement
     

     console.error('donner envoyer:', code );
    this.valid.activerCompte(this.idUsers, code).subscribe({

        
      next: res => {
        if (res.code === 200 || res.code === 201) {
           // Arrête le chargement
         
                     console.error('reponse envoyer:', res );
                     this.succesMessage = res.message || '';
                           this.errorMessage =   '';
                     this.isloading = false;
                      setTimeout(() => {
                        this.router.navigate(['/login']);
                      }, 2000); // Redirection après 2 secondes
                     
        } else {
          this.errorMessage = res.message || 'Erreur inconnue';
                this.succesMessage = '';
          console.error('Erreur lors de l\'enregistrement:', res.message );
                 console.error('Erreur lors de l\'enregistrement:', this.code?.value );
                 this.isloading = false;
        }
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Erreur serveur';
         this.succesMessage = '';
        this.isloading = false;
         console.error('Erreur lors de l\'enregistrement:', err.error?.message);
      }
    });
  }



  regenereCode() {
    this.isSend= true;
    this.errorMessage = '';
    this.succesMessage = '';
   
     this.valid.renouvelerCode(this.idUsers ).subscribe({


        
      next: res => {
        if (res.code === 200 || res.code === 201) {
           // Arrête le chargement
         
                     console.error('reponse envoyer:', res );
                     this.succesMessage = res.message || '';
                     this.errorMessage = '';
                      this.isSend= false;
 
                       
                     
        } else {
          this.errorMessage = res.message || 'Erreur inconnue';
          console.error('Erreur lors de l\'enregistrement:', res.message );
                 console.error('Erreur lors de l\'enregistrement:', this.code?.value );
                 this.isSend = false;
        }
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Erreur serveur';
              this.succesMessage =  '';
        this.isSend = false;
         console.error('Erreur lors de l\'enregistrement:', err.error?.message);
      }
    });
   
  }

}
