import { Component } from '@angular/core';
import { UserDto } from '../../../models/UserDto';
import { AuthServiceTsService } from '../../../Services/auth.service.ts.service';
import { AbstractControl, FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enregistrer',
    standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './enregistrer.component.html',
  styleUrl: './enregistrer.component.css'
})
export class EnregistrerComponent {

isloading:boolean = false;
   showPassword = false;
  showConfirmPassword = false;
  hidderChampCodeParrain = false;
   user!: UserDto;
  codePrrain :string = '';

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

  constructor(private fb: FormBuilder, private auth: AuthServiceTsService, private router: Router,private route : ActivatedRoute) {}

  ngOnInit() {

this.route.queryParams.subscribe(params => {
    const codeParrain = params['codeparrain'];
 
    if (codeParrain) {
     this.hidderChampCodeParrain= true;
      this.codePrrain = codeParrain;
    }  
  });
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        telephone: ['', [
  Validators.required,
  Validators.pattern(/^[1-9]\d{7,14}$/)
]],

        code: [''], // code parrainage, optionnel, pas de validator spécifique
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get username(): AbstractControl | null {
    return this.registerForm.get('username');
  }
  get email(): AbstractControl | null {
    return this.registerForm.get('email');

    
  }
   get telephone(): AbstractControl | null {
    return this.registerForm.get('telephone');
  }
  get code(): AbstractControl | null {
    return this.registerForm.get('code');
  }
  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }
  get confirmPassword(): AbstractControl | null {
    return this.registerForm.get('confirmPassword');
  }

  getUsernameError() {
    if (!this.username) return '';
    if (this.username.hasError('required')) return 'Le nom d\'utilisateur est requis';
    if (this.username.hasError('minlength')) return 'Minimum 3 caractères';
    if (this.username.hasError('maxlength')) return 'Maximum 20 caractères';
    return '';
  }

  getEmailError(): string {
  if (!this.email) return '';
  if (this.email.hasError('required')) return 'L\'email est requis';
  if (this.email.hasError('email')) return 'Format d\'email invalide';
  return '';
}



//   getTelephoneError(): string {
//   if (!this.telephone) return '';
//   if (this.telephone.hasError('pattern')) return 'Numéro de téléphone invalide';
//   return '';
// }


getTelephoneError(): string {
  if (!this.telephone) return '';
  if (this.telephone.hasError('required')) return 'Le numéro de téléphone est requis';
  if (this.telephone.hasError('pattern')) {
    return 'Entrez le numéro complet avec indicatif pays (ex : 237697847396), sans espace ni +';
  }
  return '';
}


getCodeError(): string {
  // Si tu veux ajouter des validations sur le code, sinon retourne vide
  if (!this.code) return '';
  // Par exemple, on peut vérifier une longueur minimale si tu veux
  // if (this.code.hasError('minlength')) return 'Code trop court';
  return '';
}


  passwordMatchValidator(form: FormGroup) {
    const pw = form.get('password')?.value;
    const cpw = form.get('confirmPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.isloading = true; // Démarre le chargement
    
    if(this.hidderChampCodeParrain){
        this.user  = {
      nom: this.username?.value,
      email: this.email?.value,
      telephone: this.telephone?.value,
      cleParrain: this.codePrrain, // ajoute si dans ton modèle UserDto
      motDePasse: this.password?.value,
      role: 'CLIENT' // par défaut, adapte si besoin
    };
    }else{
  this.user = {
      nom: this.username?.value,
      email: this.email?.value,
      telephone: this.telephone?.value,
      cleParrain: this.code?.value, // ajoute si dans ton modèle UserDto
      motDePasse: this.password?.value,
      role: 'CLIENT' // par défaut, adapte si besoin
    };

    }
  

     console.error('donner envoyer:', this.user );
    this.auth.creerUtilisateur(this.user).subscribe({

        
      next: res => {
        if (res.code === 200 || res.code === 201) {
           // Arrête le chargement
          this.router.navigate(['/activation', res.id]);
                     console.error('reponse envoyer:', res );
                     this.isloading = false;
        } else {
          this.errorMessage = res.message || 'Erreur inconnue';
          console.error('Erreur lors de l\'enregistrement:', res.message );
                 console.error('Erreur lors de l\'enregistrement:', this.user );
                 this.isloading = false;
        }
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Erreur serveur';
        this.isloading = false;
         console.error('Erreur lors de l\'enregistrement:', err.error?.message);
      }
    });
  }

}
