import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Output() fileChange = new EventEmitter<File>();

  onFileChange(event: any) {
     console.log('File change event triggered');
     if (event.target.files && event.target.files.length > 0) {
       const file = event.target.files[0];
       this.fileChange.emit(file);
     }
  }
}
