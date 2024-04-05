import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectSubjectId, selectTenantId } from 'src/app/states/school/school.selector';
import { StudentService } from '../../../services/student.service';
import { IMat, IMatAsmnt } from 'src/app/Models/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-subject-detail-page',
  templateUrl: './student-subject-detail-page.component.html',
  styleUrls: ['./student-subject-detail-page.component.css']
})
export class StudentSubjectDetailPageComponent implements OnInit {
currentPage:number = 1
itemsPerPage:number = 4
totalPages:number =0
totalItems:number =0
selectedOption:string = 'Materials';
tenantId!:string
subjectId!:string
uploadsArray!:IMatAsmnt[]
  constructor(
    private datePipe:DatePipe,
    private readonly store : Store,
    private readonly studentService:StudentService
  ){}

  onSelectionChange(option: string): void {
    this.uploadsArray = [];
    this.selectedOption = option;
    this.fetchMaterialsOrAssignments(this.currentPage, this.itemsPerPage);
 }

 fetchMaterialsOrAssignments(page: number, limit: number): void {
   
   if (this.selectedOption === 'Materials') {
     this.studentService.fetchMatAsnmt(this.tenantId, this.subjectId, page, limit).subscribe({
       next: (res: IMat) => {
         // console.log(res);
         this.uploadsArray = res.Mat;
         console.log('heow',this.uploadsArray);
         
        }
      });
    } else {
      console.log('vannthitta',page,limit);
      this.studentService.fetchAssignments(this.tenantId, this.subjectId, page, limit).subscribe({
        next: (res: IMat) => {
          console.log(res);
          this.uploadsArray = res.Mat;
        }
      });
    }
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) + 1 ;
    console.log(this.totalPages);
    
 }

  tenantId$ = this.store.select(pipe(selectTenantId))
subjectId$ = this.store.select(pipe(selectSubjectId))


  ngOnInit(): void {
    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
      this.subjectId$.subscribe((id)=>{
        if(id)
        this.subjectId = id.subjectId as unknown as string
      
      })
      this.studentService.fetchMatAsnmt(this.tenantId,this.subjectId,this.currentPage,this.itemsPerPage).subscribe({
        next:(res:IMat)=>{
          console.log();
          
          this.uploadsArray = res.Mat
          this.totalItems = res.count
          console.log('eee',this.totalItems);
          
        }
      })
  }

  previousPage(): void {
    if (this.currentPage > 1) {
       this.currentPage--;
       this.fetchMaterialsOrAssignments(this.currentPage, this.itemsPerPage);
    }
   }
   
   nextPage(): void {
    console.log('vaiee');
    
    if (this.currentPage < this.totalPages) {
       this.currentPage++;
       this.fetchMaterialsOrAssignments(this.currentPage, this.itemsPerPage)
    }
   }
   
   

}
