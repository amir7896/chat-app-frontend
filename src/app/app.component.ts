import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { ChatService } from './chat.service';

export interface MessageModel{
  message?: string;
  senderId?:string; 
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';
  public socketId: string = '';
  public reciverID: string =''
  constructor(public chatService: ChatService){}

  newMessage!: string;
  messageList: MessageModel[] = [];

  ngOnInit(){
    this.socketId = this.chatService.socketID;
    console.log('this.socketID',  this.socketId)
    this.chatService.getNewMessage().subscribe((message: MessageModel) => {
      
      this.messageList.push(message);
      
    });
  }
  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }


}
