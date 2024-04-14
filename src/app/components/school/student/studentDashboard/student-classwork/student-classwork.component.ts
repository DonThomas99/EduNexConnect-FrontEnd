import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentService } from '../../../services/student.service';
import { IMat, IMatAsmnt } from 'src/app/Models/material';
import { pipe } from 'rxjs';
import { selectSubjectId, selectTenantId } from 'src/app/states/school/school.selector';

@Component({
  selector: 'app-student-classwork',
  templateUrl: './student-classwork.component.html',
  styleUrls: ['./student-classwork.component.css']
})
export class StudentClassworkComponent implements OnInit{
 AssignmentArray:IMatAsmnt[] =[]
 selectedOption:string ='All'
 currentPage:number = 1
itemsPerPage:number = 4
totalPages:number =0
totalItems:number =0
tenantId!:string
subjectId!:string
tenantId$ = this.store.select(pipe(selectTenantId))
subjectId$ = this.store.select(pipe(selectSubjectId))
  constructor(
  private readonly store:Store,
  private readonly studentStervice:StudentService
 ){}
  ngOnInit(): void {
 

   this.tenantId$.subscribe((id)=>{    
    if(id)
      this.tenantId = id
    })
    this.subjectId$.subscribe((id)=>{
      if(id)
      this.subjectId = id.subjectId as unknown as string
  })
  this.studentStervice.fetchAssignments(this.tenantId, this.subjectId, this.currentPage, this.itemsPerPage).subscribe({
    next:(res:IMat)=>{
      this.AssignmentArray = res.Mat
      this.totalItems = res.count
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)  ;
      
    }
   })
 }
 onSelectionChange(option:string):void{
  this.AssignmentArray =[]
  this.selectedOption = option
 }

fetchAssignments(page:number,limit:number){
  this.studentStervice.fetchAssignments(this.tenantId,this.subjectId,page,limit).subscribe({
    next:(res:IMat)=>{
      this.AssignmentArray = res.Mat
    }
  })
}


 previousPage(): void {
  if (this.currentPage > 1) {
     this.currentPage--;
     this.fetchAssignments(this.currentPage, this.itemsPerPage);
  }
 }
 
 nextPage(): void {
  console.log('vaiee');
  
  if (this.currentPage < this.totalPages) {
     this.currentPage++;
     this.fetchAssignments(this.currentPage, this.itemsPerPage)
  }
 }
 

}
