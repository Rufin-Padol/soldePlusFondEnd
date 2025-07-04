import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AsideComponent } from "../../shared/aside/aside.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-parian',
  imports: [CommonModule, AsideComponent,RouterLink],
  templateUrl: './parian.component.html',
  styleUrl: './parian.component.css'
})
export class ParianComponent {
 buykey: string= "Buy a key";
 parinerUser: string= "Parinair";
voirSolde: boolean = true;
montant: number = 300000.00;
sommeTransation: number = 5000;
menuSee: boolean = false;
asibeBarleftof: string = 'w-0 p-0';
asibeBarleftOn: string = 'w-64 p-4';
iscles: boolean = true;


chnageasibeBarleft() {

  if (this.asibeBarleftof === 'w-0 p-0') {
    this.asibeBarleftof = 'w-64 p-4';
    this.asibeBarleftOn = 'w-0 p-0';
  } else {
    this.asibeBarleftof = 'w-0 p-0';
    this.asibeBarleftOn = 'w-64 p-4';
  }
}


}
