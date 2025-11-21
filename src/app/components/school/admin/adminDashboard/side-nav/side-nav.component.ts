import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  adminNavLinks = [
    { label: 'Overview', path: '/school/admin/dashboard' },
    { label: 'Teachers', path: '/school/admin/dashboard/teachers' },
    { label: 'Classes', path: '/school/admin/dashboard/subjects' },
    { label: 'Students', path: '/school/admin/dashboard/students' },
    { label: 'Sign-Out', path: '/school/admin' },
  ];
}
