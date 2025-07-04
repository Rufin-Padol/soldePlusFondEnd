import { Component } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [ ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  constructor( private route : Router) { }
navigateToRegister() {
    this.route.navigate(['/register']);
  }
}


