import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { Assignment, IAssignmentData, IMat, IMatAsmnt, IMaterials, Material } from 'src/app/Models/material';
import { selectSubjectId, selectTeacherData, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { IAssignments } from 'src/app/Models/assignments';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-landing-page',
  templateUrl: './teacher-landing-page.component.html',
  styleUrls: ['./teacher-landing-page.component.css']
})
export class TeacherLandingPageComponent implements OnInit {
  // type Item = Material|Assignment;
  tenantId!: string
  subjectId!: string
  subjectId$ = this.store.select(pipe(selectSubjectId))
  assignments!:IAssignments[]
  teacherId!: string
  teacherName!: string
  materials!: IMatAsmnt[]
  teacherData$ = this.store.select(pipe(selectTeacherData))
  selectedItem!:IMatAsmnt | null
  sanitizedUrls!: SafeResourceUrl[];
  selectedOption:string = 'Materials';
uploadsArray!:IMatAsmnt[]
  totalPages:number =0
  currentPage:number = 1
  totalItems:number =0
  itemsPerPage:number =4


  tenantId$ = this.store.select(pipe(selectTenantId))
  constructor(
    private sanitizer: DomSanitizer,
    private TeacherService: TeacherServiceService,
    private store: Store,
    private toastr:ToastrService
  ) {

  }

  ngOnInit(): void {

    this.tenantId$.subscribe((id) => {
      if (id)
        this.tenantId = id
    })
    this.subjectId$.subscribe((id) => {
      if (id)
        this.subjectId = id.subjectId as unknown as string
    })

    this.teacherData$.subscribe((id) => {
      if (id) {
        this.teacherId = id._id
        this.teacherName = id.name
      }
    })

    this.TeacherService.fetchMaterials(this.tenantId, this.subjectId,this.currentPage).subscribe({
      next: (res: IMat) => {
        this.uploadsArray = res.Mat
        this.totalItems = res.count; // Ensure you have a count property in your response        
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) ;
        console.log('total Pages:',this.totalPages);
      }

    })

  }

  openModal(item:IMatAsmnt){

this.selectedItem = item
    
this.sanitizedUrls = item.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
    if('materialTitle' in item){
      const materialModal = document.getElementById('materials') as  HTMLDialogElement;
      materialModal.showModal();

    } else{
      const assignmentModal = document.getElementById('assignments') as HTMLDialogElement;
      assignmentModal.showModal();
    }
  }
  openMenu(event:MouseEvent){
    event.stopPropagation();
  }

  viewPdf(){
    const pdfModal = document.getElementById('view-pdf') as  HTMLDialogElement;
    pdfModal.showModal()
  }
  closePdf(){
    this.sanitizedUrls=[]
  }
  onSelectionChange(option: string): void {
    this.uploadsArray = [];
    this.selectedOption = option;
    const currentPage =1
    this.currentPage = 1
    this.totalPages=0
    this.fetchMaterialsOrAssignments(currentPage);
 }
 fetchMaterialsOrAssignments(page:number)
{ 
  if (this.selectedOption === 'Materials') {
    this.TeacherService.fetchMaterials(this.tenantId, this.subjectId, page).subscribe({
      next: (res: IMat) => {
        this.uploadsArray = res.Mat;
        this.totalItems = res.count; // Ensure you have a count property in your response
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage) ;
            
      }
    });
 } else {
    this.TeacherService.fetchAssignments(this.tenantId, this.subjectId, page).subscribe({
      next: (res: IMat) => {
        this.uploadsArray = res.Mat;        
        this.totalItems = res.count; // Ensure you have a count property in your response
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      }
    });
 }
}

previousPage(){  
  if (this.currentPage > 1) {
    this.currentPage--;
    this.fetchMaterialsOrAssignments(this.currentPage);
 }
}

nextPage(){  
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.fetchMaterialsOrAssignments(this.currentPage)
 }
}

}
