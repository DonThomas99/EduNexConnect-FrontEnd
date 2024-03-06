import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
import { StudentService } from '../../services/student.service';
import { validateBytrimming } from 'src/app/helpers/validations';
import { emailValidators, passwordValidators } from 'src/app/shared/validators';
import Swal from 'sweetalert2';
import { Res } from 'src/app/Models/common';
import { IStudent } from 'src/app/Models/student';
import { saveStudentData } from 'src/app/states/school/school.actions';
// import { setStudentEmail, setStudentEmail } from 'src/app/states/school/school.actions';


@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent  implements OnInit {
  form!:FormGroup
  isSubmitted=false
  tenantId!:string;
  tenantId$= this.store.select(pipe(selectTenantId))

  constructor(
    private readonly formBuilder:FormBuilder,
    private studentService: StudentService,
    private readonly router:Router,
    private readonly store:Store,
    
  ){}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email :['',validateBytrimming(emailValidators)],
      password:['',validateBytrimming(passwordValidators)]
    })

    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })

      
  }
submit(){
  
  this.isSubmitted= true
  console.log(this.form);
  
  if(this.form.valid){
    const data = this.form.getRawValue()
    console.log('kindi');
    
    this.studentService.studentLogin(this.tenantId,data.email,data.password).subscribe({
      next:(res:Res )=>{ 
// this.store.dispatch(setStudentEmail(this.studentEmail))

this.studentService.fetchStudentData(this.tenantId, data.email).subscribe({
  next: (res:IStudent) => {
    console.log(res);
    this.store.dispatch(saveStudentData({studentData:res}))
  }
});

        void Swal.fire({ 
          icon:'success',
          title:res
          })
          this.router.navigate(['school/student/dashboard'])
      },error:(error)=>{
        void Swal.fire({
          icon:'error',
          title:error
          })
      }
    })
  }

}

}
