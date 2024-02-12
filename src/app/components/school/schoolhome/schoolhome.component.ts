import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-schoolhome',
  templateUrl: './schoolhome.component.html',
  styleUrls: ['./schoolhome.component.css']
})
export class SchoolhomeComponent {
  public schoolName!: string;
  public tenantId!: string;

  constructor(
    private authService: AuthService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (res: any) => {
        this.schoolName = res['schoolName'];
      }
    });
  }

  // Method to handle form submission
  onSubmit() {
    // Call the service method with the school name
    this.authService.extractUrl(this.schoolName.toUpperCase()).subscribe({
      next: (res) => {
        console.log(res);
        // this.tenantId = res as unknown as string
        console.log(this.tenantId);
        
        // Handle the response as needed
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle errors
      }
    });
  }
}
