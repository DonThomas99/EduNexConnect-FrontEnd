import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StreamVideoParticipant } from '@stream-io/video-client';
import { VideoCallService } from '../../school/services/video-call.service';

@Component({
  selector: 'app-participant',
  exportAs:'app-participant',
  standalone: true, 
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.css']
})
export class ParticipantComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('audioElement') audioElemnt!: ElementRef<HTMLAudioElement>;

  @Input() participant!:StreamVideoParticipant;
  unbindVideoElement: (()=> void) | undefined;
  unbindAudioElement: (()=> void) | undefined;

  constructor(private callingService:VideoCallService){
  }
  ngAfterViewInit():void{
    this.unbindVideoElement = this.callingService
    .call()
    ?.bindVideoElement(
      this.videoElement.nativeElement,
      this.participant.sessionId,
      'videoTrack'
    )

    this.unbindAudioElement = this.callingService
    .call()
    ?.bindAudioElement(
      this.audioElemnt.nativeElement,
      this.participant.sessionId,
      'audioTrack'
    )
  }

  ngOnDestroy():void{
    this.unbindVideoElement?.();
    this.unbindAudioElement?.();
  }
}
