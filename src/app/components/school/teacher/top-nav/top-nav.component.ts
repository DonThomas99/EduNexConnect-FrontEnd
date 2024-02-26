import { Component } from '@angular/core';
import {Sidenav,initTE} from 'tw-elements'


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  renderer: any;
  constructor() {
    initTE({ Sidenav }); // Initialize TW Elements
}



}
