import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent  implements OnInit {
  form!:FormGroup
  isSubmitted=false
  
  ngOnInit(): void {
    
  }

}
