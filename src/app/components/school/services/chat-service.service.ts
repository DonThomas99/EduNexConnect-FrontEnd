import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { message } from 'src/app/Models/assignments';
import { Res, addUsers, convo } from 'src/app/Models/common';
import { environments } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private socket!: Socket;
  backendURL = environments.backendURL;

  constructor(private readonly http: HttpClient) { 
    this.initializeSocket().then(() => {
      console.log('Socket connected');
    }).catch(err => {
      console.error('Failed to connect socket:', err);
    });
  }

  private async initializeSocket(): Promise<void> {
    this.socket = new Socket({
      url: this.backendURL,
      options: {
        transports: ['websocket'],
      },
    });

    await this.socket.connect();
  }

  disconnectSocket(): void {
    this.socket.disconnect();
  }

  createConversation(tenantId: string, members: { studentId: string; teacherId: string; }, assignmentId: string): Observable<convo> {
    return this.http.post<convo>(`${this.backendURL}/${tenantId}/chats/newconversation`, { members, assignmentId });
  }

  newMessage(tenantId: string, message: message,recipientId:string): void{    
  this.socket.emit('sendMessage',tenantId,message,recipientId)
  }

  // getMessages(tenantId: string, conversationId: string) {
  //   return this.http.get<message[]>(`${this.backendURL}/${tenantId}/user/getMessages/${conversationId}`);
  // }

  getMessages(tenantId:string,conversationId:string){
    this.socket.emit('getMessages',tenantId,conversationId)
  }
  recieveMessages(conversationId:string):Observable<message[]>{
    const messagesSubject = new Subject<message[]>()
    if(this.socket){
      this.socket.on(conversationId,(messages:message[])=>{
        messagesSubject.next(messages)
      })
    }
    return messagesSubject.asObservable()
  }

  addUser(users: addUsers): void {
       console.log('add user function called');
       
    this.socket.emit('addUser', users);

  }
  
  reciverNotification(recipientId:string): Observable<message> {
       
    const messageSubject = new Subject<message>()
  
if(this.socket){

  this.socket.on(recipientId,(message:message)=>{
    
    messageSubject.next(message);
  })
}
return messageSubject.asObservable();
  }




}
