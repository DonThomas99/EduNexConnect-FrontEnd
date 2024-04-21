import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { Assignment, IAssignmentData, IMatAsmnt, IMaterials, Material } from 'src/app/Models/material';
import { selectSubjectId, selectTeacherData, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { IAssignments } from 'src/app/Models/assignments';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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


  tenantId$ = this.store.select(pipe(selectTenantId))
  constructor(
    private sanitizer: DomSanitizer,
    private TeacherService: TeacherServiceService,
    private store: Store
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

    this.TeacherService.fetchMaterials(this.tenantId, this.subjectId, this.teacherId).subscribe({
      next: (res: IMatAsmnt[]) => {
        this.materials = res

      }

    })

  }

  deleteItem(){

  }
  editItem(){}


  openModal(item:IMatAsmnt){

this.selectedItem = item
    
    if('materialTitle' in item){
      const materialModal = document.getElementById('materials') as  HTMLDialogElement;
      this.sanitizedUrls = item.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
      materialModal.showModal();

    } else{
      const assignmentModal = document.getElementById('assignments') as HTMLDialogElement;
      // this.sanitizedUrls = item.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))

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

}
