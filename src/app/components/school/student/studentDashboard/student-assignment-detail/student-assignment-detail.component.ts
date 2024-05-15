import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { IMatAsmnt, Isubmission } from 'src/app/Models/material';
import { selectAssignment, selectStudentData, selectSubjectId, selectTenantId } from 'src/app/states/school/school.selector';
import { StudentService } from '../../../services/student.service';
import { Asnmt_url, Res, addUsers, convo } from 'src/app/Models/common';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { ChatServiceService } from '../../../services/chat-service.service';
import { message } from 'src/app/Models/assignments';

@Component({
  selector: 'app-student-assignment-detail',
  templateUrl: './student-assignment-detail.component.html',
  styleUrls: ['./student-assignment-detail.component.css']
})
export class StudentAssignmentDetailComponent implements OnInit {
  isOpen=false
  isSubmitted:boolean = false
  imageMimeTypes = [
    'image/apng',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'image/webp',
    'application/pdf'
 ];
hasError:boolean = false
  url!:string[]
  grade!:string |null
  uploadForm!:FormGroup;
  assignmentItem!:IMatAsmnt;
  assignmentId!:string;
  studentEmail!:string;
  tenantId!:string;
  tenantId$ = this.store.select(pipe(selectTenantId))
  student$ = this.store.select(pipe(selectStudentData))
  assignmentItem$ = this.store.select(pipe(selectAssignment))
  subjectId$ = this.store.select(pipe(selectSubjectId))
  subjectId!:string;
  sanitizedUrls!: SafeResourceUrl[];
  studentId!:string
  teacherId!:string
  conversationId!:string
  messages!:message[]
  constructor(
    private sanitizer: DomSanitizer,
    private platform :Platform,
    private readonly toastr:ToastrService,
    private formBuilder:FormBuilder,
    private readonly store:Store,
    private readonly studentService:StudentService,
    private readonly chatService:ChatServiceService
  ){
  }
  ngOnInit(): void {
    this.tenantId$.subscribe((tenantId)=>{
      this.tenantId = tenantId as unknown as string
    })
    this.student$.subscribe((student)=>{
      this.studentEmail = student.email
      this.studentId =   student._id    
    })
    this.assignmentItem$.subscribe((assignment)=>{
      this.assignmentItem = assignment
      this.assignmentId = assignment._id
      this.teacherId = assignment.teacherId

    })
    this.subjectId$.subscribe((subjectId)=>{
      this.subjectId = subjectId.subjectId as string
    })

    this.uploadForm = this.formBuilder.group({
      id:['',Validators.required],
      studentEmail:['',Validators.required],
      assignmentId:['',[Validators.required]],
      subjectId:['',[Validators.required]],
      file:[null,[Validators.required]]
    })

    this.studentService.fetchSubmissions(this.tenantId,this.studentEmail,this.assignmentId).subscribe({
      next:(res:Asnmt_url)=>{
               
     if (res && res.url) {
      this.grade = res.url.grade;

      // Check if res.url.file_url exists before mapping
      if (res.url.file_url) {
        this.sanitizedUrls = res.url.file_url.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
      }
    }
      },
      error:(error)=>{
          this.hasError = true
      }
    })

this.chatService.reciverNotification(this.studentId).subscribe({
  next:(message)=>{
    
    this.messages.push(message)
  }, error:(error)=>{
    console.log('error:',error);
    
  }
} )



  }
  
  onFileChange(event:any){
    console.log('gtdu');
    
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0]   
      if (this.imageMimeTypes.includes(file.type)) {
         this.uploadForm.get('file')?.setValue(file)
         this.uploadForm.get('assignmentId')?.setValue(this.assignmentId)
         this.uploadForm.get('studentEmail')?.setValue(this.studentEmail)
         this.uploadForm.get('subjectId')?.setValue(this.subjectId)
         this.uploadForm.get('id')?.setValue(this.tenantId)
     }    
    }
  }
  onSubmit(){
    
    this.isSubmitted =true
    if(this.uploadForm.valid){
      const formValue = this.uploadForm.getRawValue()
      this.studentService.uploadAssignment(this.tenantId,formValue).subscribe({
        next:(res:Asnmt_url)=>{
          const message = res.message as unknown as string
          this.toastr.success(message)
          this.ngOnInit()
        }
      })
    
    }
  }

  deleteFile(i:number){
    this.studentService.deleteSubmissions(this.tenantId,this.studentEmail,this.assignmentId,i).subscribe({
      next:(res:Asnmt_url)=>{
        const message = res.message
        this.toastr.success(message)
        this.ngOnInit()
      }, error:(res:Asnmt_url)=>{
          const message = res.message
          this.toastr.error(message)
      }
    })
  }

    openForm(){
      const members = {
        studentId:this.studentId,
        teacherId:this.teacherId
      }
      this.chatService.createConversation(this.tenantId,members,this.assignmentId).subscribe({
        next:(res:convo)=>{
          this.conversationId = res.data._id
          if(this.conversationId){
            this.chatService.getMessages(this.tenantId,this.conversationId)
            this.chatService.recieveMessages(this.conversationId).subscribe({
              next:(res:message[])=>{
                this.messages = res
              this.generateChatHTML()
              }
            })
              const users:addUsers ={
              recieverId:this.teacherId,
              senderId:this.studentId
            }
            this.chatService.addUser(users)
          }
        }
      })
      this.isOpen =true
    }

    closeForm(){
      this.isOpen = false
    
    }

messageSubmit(event?:Event){
if(event){
  event.preventDefault()
}
 const messageText = (document.getElementById('chat') as HTMLTextAreaElement)?.value
 if(!messageText){
  const message = "Type something "
  this.toastr.error(message)
  return 
 }
 const newMessage:message ={
  conversationId: this.conversationId,
  sender:this.studentId,
  text:messageText
 }
 const recieverId = this.teacherId
 this.chatService.newMessage(this.tenantId,newMessage,recieverId)
this.messages.push(newMessage)
this.generateChatHTML()
const chatElement = (document.getElementById('chat') as HTMLTextAreaElement)
if(chatElement){
  chatElement.value =''
} else{
  console.log('error');
  
}

 

}


generateChatHTML(){  
  const chatContainer = document.getElementById('chatContainer')
 let chatHTML = '<div class="messageConatiner">'
 this.messages.forEach((message)=>{
   const isTeacherMessage = message.sender === this.teacherId
   const chatClass = isTeacherMessage? 'chat chat-start': 'chat chat-end';
   chatHTML +=`  <div class="${chatClass}">
   <div class="chat-bubble">${message.text}</div>
 </div> `
 })
 chatHTML+='</div>'
 
 if(chatContainer){
   chatContainer.innerHTML = chatHTML
  
     chatContainer.scrollTop = chatContainer.scrollHeight;
 } else{
   console.log('chat Container element not found');
 }
}

}





