import { Injectable, computed, signal } from '@angular/core';
import {Call,StreamVideoClient,User} from '@stream-io/video-client'

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  callId = signal<string|undefined>(undefined)
  call = computed<Call | undefined>(()=>{
    const currentCallId = this.callId()
    if(currentCallId !== undefined){
      const call = this.client.call('default',currentCallId)
      call.join({create:true}).then(async()=>{
        call.camera.enable();
        call.microphone.enable();
      });
      return call;
    }else{
      return undefined
    }
  })
client:StreamVideoClient;
  constructor() {
    const apiKey ='mmhfdzb5evj2';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQmFzdGlsYV9TaGFuIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9CYXN0aWxhX1NoYW4iLCJpYXQiOjE3MTI0OTE0MzEsImV4cCI6MTcxMzA5NjIzNn0.cbBpohHRD3VXm4uAslQIRlBXCbjElbTVQbkoMymm3w0'
    const user:User = {id:'voewn'}
    this.client = new StreamVideoClient({apiKey,token,user})
  }
setCallId(IcallId:string|undefined){
  if(IcallId === undefined){
    this.call()?.leave()
  }
  this.callId.set(IcallId)
  console.log('set callId with value : ', this.callId)
}
}
