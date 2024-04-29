import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectClassNum, selectSubjectId, selectTenantId } from 'src/app/states/school/school.selector';
import { StudentService } from '../../../services/student.service';
import { IMat, IMatAsmnt } from 'src/app/Models/material';
import { DatePipe } from '@angular/common';
import { Res } from 'src/app/Models/common';
import { Router } from '@angular/router';
import { saveAsnmt } from 'src/app/states/school/school.actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MaterialViewComponent } from '../material-view/material-view.component';

@Component({
  selector: 'app-student-subject-detail-page',
  templateUrl: './student-subject-detail-page.component.html',
  styleUrls: ['./student-subject-detail-page.component.css']
})
export class StudentSubjectDetailPageComponent implements OnInit {

  @ViewChild('materialsView') materialsView!: ElementRef;
// @ViewChild('assignmentsView') assignmentsView!: ElementRef;

currentPage:number = 1
roomId!:string
classNum!:string
itemsPerPage:number = 4
totalPages:number =0
totalItems:number =0
selectedOption:string = 'Materials';
tenantId!:string
subjectId!:string
uploadsArray!:IMatAsmnt[]


classNum$ = this.store.select(pipe(selectClassNum))
  constructor(
    private readonly router:Router,
    private readonly store : Store,
    private readonly studentService:StudentService,
    private dialog:MatDialog
  ){}

  onSelectionChange(option: string): void {
    this.uploadsArray = [];
    this.selectedOption = option;
    const currentPage =1
    this.totalPages=0
    this.fetchMaterialsOrAssignments(currentPage, this.itemsPerPage);
 }

 fetchMaterialsOrAssignments(page: number, limit: number): void {
  if (this.selectedOption === 'Materials') {
     this.studentService.fetchMatAsnmt(this.tenantId, this.subjectId, page, limit).subscribe({
       next: (res: IMat) => {
         this.uploadsArray = res.Mat;
         this.totalItems = res.count; // Ensure you have a count property in your response
         this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) -1 ;
         console.log('total Pages:',this.totalPages);
         
       }
     });
  } else {
     this.studentService.fetchAssignments(this.tenantId, this.subjectId, page, limit).subscribe({
       next: (res: IMat) => {
         this.uploadsArray = res.Mat;
         this.totalItems = res.count; // Ensure you have a count property in your response
         this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
       }
     });
  }
 }
 

  tenantId$ = this.store.select(pipe(selectTenantId))
subjectId$ = this.store.select(pipe(selectSubjectId))


  ngOnInit(): void {
    this.classNum$.subscribe((classNum)=>{
      this.classNum = classNum.classNum as unknown as string
    console.log('classNum:',this.classNum);
    
    })
    this.tenantId$.subscribe((id)=>{    
      if(id)
        this.tenantId = id
      })
      this.subjectId$.subscribe((id)=>{
        if(id)
        this.subjectId = id.subjectId as unknown as string
      
      })
      this.studentService.fetchRoomId(this.tenantId,this.subjectId,this.classNum).subscribe({
        next:(res:Res)=>{         
          this.roomId = res as unknown as  string      
        }
      })
      this.studentService.fetchMatAsnmt(this.tenantId,this.subjectId,this.currentPage,this.itemsPerPage).subscribe({
        next:(res:IMat)=>{
          console.log();
          
          this.uploadsArray = res.Mat
          this.totalItems = res.count
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) -1 ;
         
          
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
   
 joinClass(){
  this.router.navigateByUrl(`/school/v-class/${this.roomId}`)
  
 }  

 detailViewPage(item:IMatAsmnt){
      if(item.assignmentTitle){
        this.store.dispatch(saveAsnmt({upload:item}))
        this.router.navigate(['/school/student/assignment-view'])
      } else if(item.materialTitle){
        const dialogRef = this.dialog.open(MaterialViewComponent,{
          data:{material:item},
          width:'80%',
          height:'70%'
        } )
        dialogRef.afterClosed().subscribe(result =>{
          if(result){
          
          }
        })  
      }
 }

}
