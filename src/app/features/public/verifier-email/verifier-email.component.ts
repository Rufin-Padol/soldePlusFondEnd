import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceTsService } from '../../../Services/auth.service.ts.service';
import { LoginRequest } from '../../../models/auth.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verifier-email',
   imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './verifier-email.component.html',
  styleUrl: './verifier-email.component.css'
})
export class VerifierEmailComponent {
isloading:boolean = false;
   showPassword = false;
  showConfirmPassword = false;

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

  constructor(private fb: FormBuilder, private auth: AuthServiceTsService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        
        email: ['', [Validators.required, Validators.email]],
         
        // password: ['', [Validators.required, Validators.minLength(6)]],
        
      }
      
    );
  }

   
  get email(): AbstractControl | null {
    return this.registerForm.get('email');

    
  }
    
  // get password(): AbstractControl | null {
  //   return this.registerForm.get('password');
  // }
 

  

  getEmailError(): string {
  if (!this.email) return '';
  if (this.email.hasError('required')) return 'L\'email est requis';
  if (this.email.hasError('email')) return 'Format d\'email invalide';
  return '';
}



  
 


  

  onSubmit() {
    
    this.submitted = true;
    this.errorMessage = '';
    
    if (this.registerForm.invalid) {
      return;
    }
    this.isloading = true; // Démarre le chargement
     

     console.error('donner envoyer:', this.email?.value );
    this.auth.reinitialiserMotDePasse(this.email?.value).subscribe({

        
      next: res => {
        if (res.code === 200 || res.code === 201) {
           // Arrête le chargement
            
    console.error('Navigation échouée vers /new-password/' + res.id);
   
          this.router.navigate(['/new-password', res.id]);
                     console.error('reponse envoyer:', res );
                     this.isloading = false;
        } else {
          this.errorMessage =  'identifiant invalide !';
          console.error('Erreur lors de l\'enregistrement1:', res.message );
                 console.error('Erreur lors de l\'enregistrement:', res );
                 this.isloading = false;
        }
      },
      error: err => {
        this.errorMessage = 'identifiant invalid!' ;
        this.isloading = false;
         console.error('Erreur lors de l\'enregistrement2:', err.error?.message);
      }
    });
  }

}
