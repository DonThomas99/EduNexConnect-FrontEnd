import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError,pipe, tap, throwError } from 'rxjs';
// import {MatDialogRef} from '@angular/material'
import { selectTenantId } from 'src/app/states/school/school.selector';
import { SchoolAdminService } from '../../../services/school-admin.service';
import { validateBytrimming } from 'src/app/helpers/validations';
import { classValidators, nameValidators } from 'src/app/shared/validators';
import Swal from 'sweetalert2';
import { classSubjects, classes } from 'src/app/Models/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects!:classSubjects[];
  form!:FormGroup
  isSubmitted:boolean = false
  tenantId!:string
  isModalOpen:boolean = false
  tenantId$= this.store.select(pipe(selectTenantId))

constructor(
  private readonly formBuilder:FormBuilder,
  private schoolAdminService:SchoolAdminService,
  private readonly router:Router,
  private readonly store:Store,
  // private dialogRef:MatDialogRef
){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      class:['',classValidators],
      subject:['',validateBytrimming(nameValidators)]
    })
    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
      

      this.schoolAdminService.fetchClasses(this.tenantId).subscribe({
        next:(res:classes)=>{
          console.log('kopp',res.data);
          
        }
      })
    
}

  
  submit(){
    this.isSubmitted = true
    if(this.form.valid){
      const data  = this.form.getRawValue()
      console.log(data);
      
      this.schoolAdminService.addSubjects(data.class,data.subject,this.tenantId).subscribe({
  next:()=>{
    void Swal.fire({
      icon:'success',
      title:'Subject Added Successfully',
    }).then(()=>{

      window.location.reload()
    }
    )
    // this.router.navigate(['/school/admin/dashboard/subjects'])
  }
      })
    }
  }

}
