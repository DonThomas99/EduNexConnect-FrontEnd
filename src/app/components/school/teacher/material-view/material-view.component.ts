import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IMatAsmnt } from 'src/app/Models/material';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent {
  selectedItem!:IMatAsmnt
  sanitizedUrls!: SafeResourceUrl[];

constructor(
  public dialogRef: MatDialogRef<MaterialViewComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { material: IMatAsmnt },
  private sanitizer: DomSanitizer,

  private readonly router:Router
){
  this.selectedItem = this.data.material
  this.sanitizedUrls = this.selectedItem.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))

}
onClose(){
  this.dialogRef.close()
}

viewPdf(){
  const pdfModal = document.getElementById('view-pdf') as  HTMLDialogElement;
  pdfModal.showModal()
}
}
