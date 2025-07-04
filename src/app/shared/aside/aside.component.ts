import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {


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
