import { Component } from '@angular/core';
import {Sidenav,initTE} from 'tw-elements';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  open = false
  toggleOpen(){
    this.open = !this.open
  }
  constructor() { }

  ngOnInit(): void {
    // Initialize TW Elements
    initTE({ Sidenav });

    // Add event listener for slim toggler button if the element exists
    const slimToggler = document.getElementById('slim-toggler');
    if (slimToggler) {
      slimToggler.addEventListener('click', () => {
        const sidenav = document.getElementById('sidenav-4');
        if (sidenav) {
          const instance = Sidenav.getInstance(sidenav);
          instance.toggleSlim();
        }
      });
    }
  }

}
