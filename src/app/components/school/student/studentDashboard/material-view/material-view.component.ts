import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IMatAsmnt } from 'src/app/Models/material';
// import { EditMaterialsComponent } from 'src/app/components/common/edit-materials/edit-materials.component';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent implements OnInit{
selectedItem!:IMatAsmnt
sanitizedUrls!: SafeResourceUrl[];

constructor(
  private sanitizer:DomSanitizer,
  public dialogRef: MatDialogRef<MaterialViewComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { material: IMatAsmnt },
){

}
  ngOnInit() {
    this.openModal(this.data.material)
  }

  openModal(item:IMatAsmnt){

    this.selectedItem = item
    
    this.sanitizedUrls = item.pdf.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
    if('materialTitle' in item){
         
       
        } 
    
      }
  
      viewPdf(){
        const pdfModal = document.getElementById('view-pdf') as  HTMLDialogElement;
        pdfModal.showModal()
      }
      closePdf(){
        this.sanitizedUrls=[]
      }
      onClose(){
        
        
        this.dialogRef.close(true)
      }

}
