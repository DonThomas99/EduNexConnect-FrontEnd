import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild,ElementRef, AfterViewInit, Input, Signal, NgModule} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {Call, StreamVideoClient, StreamVideoParticipant} from '@stream-io/video-client'
import { Store } from '@ngrx/store';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { pipe } from 'rxjs';
import { selectClassNum, selectStudentData, selectSubjectId, selectTeacherData, selectTenantId } from 'src/app/states/school/school.selector';
import { TeacherServiceService } from '../../school/services/teacher-service.service';
import { Res } from 'src/app/Models/common';
import { IStudent } from 'src/app/Models/student';
import { VideoCallService } from '../../school/services/video-call.service';
import {toSignal} from '@angular/core/rxjs-interop'
import { ParticipantComponent } from '../participant/participant.component';


@Component({
 selector: 'app-video-class',
 standalone:true,
 imports:[CommonModule, ParticipantComponent],
//  exportAs:[ParticipantComponent],
 templateUrl: './video-class.component.html',
 styleUrls: ['./video-class.component.css']
})
export class VideoClassComponent implements OnInit {
  name:string = 'User 101'
  roomID!:string
  classNum!:string
  teacherId!:string
  teacherName!:string
  tenantId!:string
  subjectId!:string
  classNum$ = this.store.select(pipe(selectClassNum))
  tenantId$ = this.store.select(pipe(selectTenantId))
  subjectId$  = this.store.select(pipe(selectSubjectId))
  teacherData$ = this.store.select(pipe(selectTeacherData))
  studentData$ = this.store.select(pipe(selectStudentData))
  studentData!:IStudent
  constructor (
    private readonly callingService:VideoCallService,
    private readonly store:Store,
    private readonly route:Router,
    private readonly ActivatedRoute:ActivatedRoute,
    private readonly teacherService:TeacherServiceService
    ){
      this.participants = toSignal(
        this.callingService.call()!.state.participants$,{requireSync:true}
      )
    }
  @ViewChild('root')
  root!:ElementRef;
  @Input({required:true}) call!:Call;
  participants: Signal<StreamVideoParticipant[]>
  
  ngOnInit(): void {

    const call = this.callingService.call();
    if (call) {
      this.participants = toSignal(call.state.participants$, { requireSync: true });
    }

    this.studentData$.subscribe((student)=>{
      this.studentData = student
    })
    // this.classNum$.subscribe()
    this.ActivatedRoute.params.subscribe((param)=>{

      console.log(param['roomId']);
      this.roomID = param['roomId']
    })
    
    this.subjectId$.subscribe((id)=>{
      if(id){
        this.subjectId = id.subjectId as unknown as string
        console.log('subjectIdfddf',this.subjectId);
      }
    })

    this.classNum$.subscribe((id)=>{
      if(id){
        this.classNum = id.classNum as unknown as string        
      console.log('sdfsw',this.classNum);
      
      }
    })

    this.teacherData$.subscribe((id) => {
      if (id) {
        this.teacherId = id._id
        this.teacherName = id.name
      }
  })
  this.tenantId$.subscribe((id)=>{
    if(id){
      this.tenantId = id      
    }
  })
}
  setCall(){
    this.callingService.setCallId(this.roomID)
  }
  toggleMicrophone(){
    this.call.microphone.toggle();
  }
  toggleCamera(){
    this.call.camera.toggle();
  }
  trackBySessionId(_:number,participant:StreamVideoParticipant){
    return participant.sessionId
  }
  leaveCall(){

    this.callingService.setCallId(undefined)
  }
//   ngAfterViewInit(){
//     const appID = 1207553440
//     const serverSecret = '90f9c5e19d192bd158b41c97d93f19da'
    
//     const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, this.roomID,this.classNum,this.name );
    
//     // Create instance object from Kit Token.
//     const zp = ZegoUIKitPrebuilt.create(kitToken);
  

//     zp.joinRoom({
//       container: this.root.nativeElement,
//       sharedLinks: [
//         {
//           name: 'Personal link',
//           url:
//            window.location.protocol + '//' + 
//            window.location.host + window.location.pathname +
//             '?roomID=' +
//            this.roomID,
//         },
//       ],
//       scenario: {
//        mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//  });


//   }

  endClass(){       
    
    this.teacherService.endClass(this.tenantId,this.classNum,this.subjectId).subscribe({
      next:(res:Res)=>{
        if(this.teacherId){
          this.route.navigate(['/school/teacher/dashboard'])
        } else if(this.studentData){
          this.route.navigate(['/school/student/dashboard'])

        }
      }
    })
  }

}
  function ngAfterViewInit(): ((error: any) => void) | null | undefined {
    throw new Error('Function not implemented.');
  }

  // @NgModule({
  //   declarations: [ParticipantComponent],
  //   imports: [CommonModule],
  //   exports: [ParticipantComponent]
  //  })
  //  export class VideoClassModule { }

