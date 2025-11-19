import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent  implements OnInit{
  constructor(
        private readonly store:Store,
      private readonly router:Router
  ){

  
  }
  ngOnInit(): void {
    // Initialize component data or perform setup tasks
  }

  logout() {
    // Implement logout functionality here
    this.router.navigate(['/super-admin']);
  }
}
