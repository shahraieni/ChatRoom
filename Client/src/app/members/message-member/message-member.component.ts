import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessage } from 'src/app/_model/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-message-member',
  templateUrl: './message-member.component.html',
  styleUrls: ['./message-member.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class MemberMessageComponent implements OnInit  ,OnDestroy{
  private sub = new Subscription();
  @Input()   messages :IMessage[] = [];
  @Input()   userName :string;
  messageContent = '';
  loading  = false;

constructor(private messageService : MessageService ){}


ngOnInit(): void { }



onSubmit(){
 this.sub.add(this.messageService.sendMessage(this.userName , this.messageContent).subscribe(res=>{
    this.messages.push(res);
    this.messageContent= ''
  }))    
}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}