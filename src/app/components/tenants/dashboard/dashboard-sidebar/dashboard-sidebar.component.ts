import { Component, OnInit } from '@angular/core';
import {faDashboard} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.css']
})
export class DashboardSidebarComponent implements OnInit {
faDashboard = faDashboard
// faPerson = faPerson
  ngOnInit(): void {
  }

}
