import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthServiceTsService } from '../../../Services/auth.service.ts.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  standalone: true,
  selector: 'app-inscription',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
})
export class InscriptionComponent {
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
         
        password: ['', [Validators.required, Validators.minLength(6)]],
        
      }
      
    );
  }

   
  get email(): AbstractControl | null {
    return this.registerForm.get('email');

    
  }
    
  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }
 

  

  getEmailError(): string {
  if (!this.email) return '';
  if (this.email.hasError('required')) return 'L\'email est requis';
  if (this.email.hasError('email')) return 'Format d\'email invalide';
  return '';
}



  
 


  

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.isloading = true; // Démarre le chargement
    const user: LoginRequest = {
    
      username: this.email?.value,
      password: this.password?.value,
    
    };

     console.error('donner envoyer:', user );
    this.auth.login(user).subscribe({

        
      next: res => {
        if (res.code === 200 || res.code === 201) {
           // Arrête le chargement
           if(localStorage.getItem('user_role')== 'ADMIN'){
            this.router.navigate(['/admin']);

           }else{
            this.router.navigate(['/clients']);
           }
          
                     console.error('reponse envoyer:', res );
                     this.isloading = false;
        } else {
          this.errorMessage =  'identifiant invalide !';
          console.error('Erreur lors de l\'enregistrement1:', res.messsage );
                 console.error('Erreur lors de l\'enregistrement:', user );
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
