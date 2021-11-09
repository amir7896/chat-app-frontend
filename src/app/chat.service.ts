import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { MessageModel } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit {
  public message$: BehaviorSubject<MessageModel> = new BehaviorSubject({});
  public socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  public socketID: string = ''
  constructor() {
    this.socket =io('http://localhost:3000');
    this.socket.on('myId', (id)=>{
      console.log('from service',id);
      this.socketID = id;
     
    });
    
  }
  ngOnInit(): void {
    
  }
  public sendMessage(message:any) {
    this.socket.emit('sendMessage', {message: message, senderId : this.socketID});
    const senderID = this.socket.id;
    console.log('Sender ID = ' ,senderID);
  }

  public getNewMessage = () => {
    this.socket.on('recieveMessage', (message) =>{
      this.message$.next(message);
      const reciverID = this.socket.id;
      console.log('Receiver ID = ', reciverID)
      console.log(message);
    });
    
    return this.message$.asObservable();
  };
}
