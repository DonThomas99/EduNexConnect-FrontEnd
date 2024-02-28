import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectTenantId } from 'src/app/states/school/school.selector';
 
import { emailValidators, passwordValidators } from 'src/app/shared/validators';
import { validateBytrimming } from 'src/app/helpers/validations';
import { TeacherServiceService } from '../../services/teacher-service.service';
import Swal from 'sweetalert2';
import { SaveTeacherData, setTeacherEmail } from 'src/app/states/school/school.actions';
import { IteacherData } from 'src/app/Models/teacher';


@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {
  form!:FormGroup
  tenantId!:string
tenantId$= this.store.select(pipe(selectTenantId))

  constructor(
    private readonly formBuilder:FormBuilder,
    private TeacherService:TeacherServiceService,
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
    if(this.form.valid){
      const data = this.form.getRawValue()
      this.TeacherService.teacherLogin(this.tenantId,data.email,data.password).subscribe({
        next:(res)=>{
          this.store.dispatch(setTeacherEmail({teacherEmail:data.email}))          
    void Swal.fire({
      icon:'success',
      title:'Successfully Logged In !!!'
      })
      this.TeacherService.fetchTeacherData(this.tenantId, data.email).subscribe({
        next: (res: IteacherData) => {
          console.log(res);
          this.store.dispatch(SaveTeacherData({teacherData:res}))
        }
      });
this.router.navigate(['school/teacher/dashboard'])

        }
      })

    }

  }
}
