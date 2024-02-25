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

toggleSideNav() {
  const instance = Sidenav.getInstance(document.getElementById("sidenav-2"));
  instance.toggle(); // Toggle the side navigation
  this.adjustContentArea(instance.isHidden());
}

adjustContentArea(isHidden: boolean) {
  const contentElement = document.getElementById("content");
  if (contentElement) {
      if (isHidden) {
          // If the side navigation is hidden, restore the default styles of the content area
          this.renderer.removeClass(contentElement, 'pl-[260px]');
      } else {
          // If the side navigation is visible, adjust the content area to accommodate it
          this.renderer.addClass(contentElement, 'pl-[260px]');
      }
  }
}
}
