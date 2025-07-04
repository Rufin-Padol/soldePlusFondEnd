import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthServiceTsService } from '../../../Services/auth.service.ts.service';
 

@Component({
  selector: 'app-new-pass-word',
    standalone: true, 
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './new-pass-word.component.html',
  styleUrl: './new-pass-word.component.css'
})
export class NewPassWordComponent  implements OnInit{
isloading:boolean = false;
   showPassword = false;
  showConfirmPassword = false;
  showancienMotDePasse = false;

   idUser:number = 0;
    currentassword = '';
  successMessage: string='';

  // ... ton FormGroup etc.

  togglePasswordVisibility(field: 'password' | 'confirmPassword'|'ancienMotDePasse') {
    if(field === 'password') {
      this.showPassword = !this.showPassword;
    } else if(field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
    else if(field === 'ancienMotDePasse'){
   this.showancienMotDePasse = !this.showancienMotDePasse;
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

  constructor(private fb: FormBuilder, private auth: AuthServiceTsService, private router: Router,private route : ActivatedRoute) {}

  ngOnInit() {

   
      this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
    this.idUser = params.get('id');
  
    console.log('ID utilisateur reçu:', this.idUser );
    // Ici tu peux utiliser userId pour récupérer les données, valider, etc.
  })
    this.registerForm = this.fb.group(
      {
        ancienMotDePasse: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );

   
  }

    get ancienMotDePasse(): AbstractControl | null {
    return this.registerForm.get('ancienMotDePasse');
  }
  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }
  get confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

 



 

 

  passwordMatchValidator(form: FormGroup) {
    const pw = form.get('password')?.value;
    const cpw = form.get('confirmPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  }

  onSubmit() {
       console.error('reponse envoyer:' );
    this.submitted = true;
    if (this.registerForm.invalid) {
         console.error('reponse envoyer:' );
      return;
    }
    this.isloading = true; // Démarre le chargement
    
    this.auth.changerMotDePasse( this.idUser,this.ancienMotDePasse?.value,this.password?.value).subscribe({

        
      next: res => {
        if (res.code === 200 || res.code === 201) {
          setTimeout(() => {
            this.errorMessage = '';
            this.successMessage = 'Mot de passe modifié avec succès';
            this.router.navigate(['/login']);
          }, 2000); // Redirection après 2 secondes
           // Arrête le chargement
     
                     console.error('reponse envoyer:', res );
                     this.isloading = false;
        } else {
              this.successMessage = '';
          this.errorMessage = res.message || 'Erreur inconnue';
          console.error('Erreur lors de l\'enregistrement:', res.message );
              
                 this.isloading = false;
        }
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Erreur serveur';
        this.isloading = false;
            this.successMessage = '';
         console.error('Erreur lors de l\'enregistrement:', err.error?.message);
      }
    });
  }
}
