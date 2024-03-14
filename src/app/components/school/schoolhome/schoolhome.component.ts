import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { saveTenantIdOnStore } from 'src/app/states/school/school.actions';


@Component({
  selector: 'app-schoolhome',
  templateUrl: './schoolhome.component.html',
  styleUrls: ['./schoolhome.component.css']
})
export class SchoolhomeComponent {
  public schoolName: string = '';
  public tenantId!: string;

  constructor(
    private authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (res: any) => {
        this.schoolName = res.get['schoolName'];
      }
    });
  }

  // Method to handle form submission
  onSubmit() {
    // Call the service method with the school name
    this.authService.extractUrl(this.schoolName.toUpperCase()).subscribe({
      next: (res) => {
        console.log(res);
        this.tenantId = res as unknown as string
        console.log("tenantId frm component.ts",this.tenantId);
        this.store.dispatch(saveTenantIdOnStore({tenantId:this.tenantId}))
        // Handle the response as needed
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle errors
      }
    });
  }
}
