import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { selectClassNum, selectTeacherData, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { IStudent, Istudent, StudentInfo } from 'src/app/Models/student';
import { Isubmission } from 'src/app/Models/material';
import { Asnmt, Asnmt_url, Res, addUsers, convo } from 'src/app/Models/common';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateBytrimming } from 'src/app/helpers/validations';
import { emailValidators } from 'src/app/shared/validators';
import { ToastrService } from 'ngx-toastr';
import { ChatServiceService } from '../../services/chat-service.service';
import { message } from 'src/app/Models/assignments';
import { generateAndScrollChatHTML } from 'src/app/shared/generateChatHTML';
// import { Message } from 'primeng/api';


@Component({
  selector: 'app-assignment-valuation',
  templateUrl: './assignment-valuation.component.html',
  styleUrls: ['./assignment-valuation.component.css']
})
export class AssignmentValuationComponent implements OnInit {
@ViewChild("messageContainer") mContainer:ElementRef|undefined;
  isOpen =false
  form!:FormGroup
  assignmentId!:string
  tenantId$ = this.store.select(pipe(selectTenantId))
  classNum$ = this.store.select(pipe(selectClassNum))
  teacherId$ = this.store.select(pipe(selectTeacherData))
  classNum!:string
  tenantId!:string
  studentData!:IStudent[]
  email!:string  
  sanitizedUrls!: SafeResourceUrl[];
  hasError:boolean = false
  grade!:string
  teacherId!:string
  conversationId!:string
  studentId!:string
  messages!:message[]
   chatContainer = document.getElementById('chatContainer')

  

  constructor(
    private sanitizer: DomSanitizer,
    private readonly formBuilder:FormBuilder,
    private readonly ActivatedRoute:ActivatedRoute,
    private readonly store:Store,
    private readonly teacherService:TeacherServiceService,
    private readonly toastr:ToastrService,
    private readonly chatService:ChatServiceService

  ){  }
  
  ngOnInit() {
    this.form =this.formBuilder.group({
      grade:[this.grade,Validators.required],
      studentEmail:['',validateBytrimming(emailValidators)],
      assignmentId:['',Validators.required]
    })

    this.ActivatedRoute.params.subscribe((param)=>{
      this.assignmentId = param['assignmentId']
    })
    this.tenantId$.subscribe((id)=>{
this.tenantId = id as unknown as string
})
this.classNum$.subscribe((classNum)=>{
  this.classNum = classNum.classNum as unknown as string
})

this.teacherService.fetchStudents(this.tenantId,this.classNum).subscribe({
  next:(res:IStudent[])=>{
  this.studentData= res                        
}
})

this.teacherId$.subscribe((id)=>{
  if(id){
    this.teacherId = id._id  
  }
 
})

this.chatService.reciverNotification(this.teacherId).subscribe({
  next:(message)=>{
console.log('You have a message:',message);
this.messages.push(message)
this.generateChatHTML()
  }
})

 }


 openAssignment(email:string){
  this.email = email
  this.teacherService.fetchSubmissions(email,this.assignmentId,this.tenantId).subscribe({
    next:(res:Asnmt)=>{
      console.log(res.url);
      this.grade = res.url.grade as string
      if(res){
        this.sanitizedUrls = res.url.file_url.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
        const assignmentModal = document.getElementById('view-assignment') as HTMLDialogElement;
        assignmentModal.showModal();

      }
    },
      error:(error)=>{
          this.hasError = true
      }      
  })
  
  console.log('hee',email);
  
 }

 onGradeChange(){
  this.form.get('assignmentId')?.setValue(this.assignmentId)
  this.form.get('studentEmail')?.setValue(this.email)
if(this.form.valid){
  const data = this.form.getRawValue()
  this.teacherService.gradeAssignment(this.tenantId,data).subscribe({
    next:(res:Res)=>{
      const message =  res.message
      this.toastr.success(message)
      this.grade=''
      this.email=''
      this.form.reset()
    },
    error:(res:Res)=>{
      const msg = res.message
      this.toastr.error(msg)
      this.grade=''
      this.email=''
      this.form.reset()
    }
  })

}
  
 }
 openForm(studentId:string){
  // console.log(studentId,this.teacherId);
  this.studentId = studentId
  const members ={
    studentId:studentId,
    teacherId:this.teacherId
  }

  
this.chatService.createConversation(this.tenantId,members,this.assignmentId).subscribe({
  next:(res:convo)=>{
        
    this.conversationId= res.data._id
   if(this.conversationId){
    this.chatService.getMessages(this.tenantId,this.conversationId)
    this.chatService.recieveMessages(this.conversationId).subscribe({
      next:(res:message[])=>{
        this.messages = res
        this.generateChatHTML()
        // generateAndScrollChatHTML(this.chatContainer,this.messages,this.teacherId)
      }
    })
    const users:addUsers ={
      recieverId:studentId,
      senderId:this.teacherId
    }
    this.chatService.addUser(users)
   }
    
  }
})  
this.isOpen = true
 }

 closeForm(){

this.isOpen = false
 }

 messageSubmit(){
  const messageText = (document.getElementById('chat') as HTMLTextAreaElement)?.value;
  if(!messageText){
    const message = 'Type something'
    this.toastr.error(message)
    return
  }
  if(this.teacherId){

    const newMessage:message={
      conversationId:this.conversationId,
      sender:this.teacherId,
      text:messageText
    }
      const recieverId = this.studentId
    this.chatService.newMessage(this.tenantId,newMessage,recieverId)
    this.messages.push(newMessage)
    this.generateChatHTML()

   const chatElement = (document.getElementById('chat') as HTMLTextAreaElement)
    if(chatElement){
      chatElement.value =''
    }
  }else{
    console.log("error");
    
  }

 }


 generateChatHTML(){  
   const chatContainer = document.getElementById('chatContainer')
  let chatHTML = '<div class="messageConatiner">'
  this.messages.forEach((message)=>{
    const isTeacherMessage = message.sender !== this.teacherId
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
