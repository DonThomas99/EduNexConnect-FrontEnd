import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IMatAsmnt } from 'src/app/Models/material';

@Component({
  selector: 'app-assignment-view',
  templateUrl: './assignment-view.component.html',
  styleUrls: ['./assignment-view.component.css']
})
export class AssignmentViewComponent implements OnInit{
  selectedItem!:IMatAsmnt
  sanitizedUrls!: SafeResourceUrl[];
  

  ngOnInit() {
    
  }
  constructor(
    public dialogRef: MatDialogRef<AssignmentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { material: IMatAsmnt },
    private sanitizer: DomSanitizer,

    private readonly router:Router
  ){
    this.selectedItem = this.data.material
    this.sanitizedUrls = this.selectedItem.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

onClose(){
  this.dialogRef.close()
}

  viewSubmissions(){
  this.dialogRef.close()
   
    // this.router.navigateByUrl(`school/teacher/valuation/${this.selectedItem._id}`)
    this.router.navigate(['school/teacher/valuation',this.selectedItem._id])
    
  }

  viewPdf(){
    const pdfModal = document.getElementById('view-pdf') as  HTMLDialogElement;
    pdfModal.showModal()
  }
}
