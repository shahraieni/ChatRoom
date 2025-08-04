import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessage } from 'src/app/_model/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-message-member',
  templateUrl: './message-member.component.html',
  styleUrls: ['./message-member.component.css']
})
export class MemberMessageComponent implements OnInit  ,OnDestroy{
  private sub = new Subscription();
  @Input()  userName ;
  messages :IMessage[] = [];
constructor( private messageService :MessageService){}


ngOnInit(): void { }

  loadMessageThread(){
    this.sub.add( this.messageService.getMessageThread(this.userName).subscribe((res)=>{
      this.messages = res;
    }))
    
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}