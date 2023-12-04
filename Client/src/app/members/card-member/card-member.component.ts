import { Component, Input } from '@angular/core';
import { IMember } from 'src/app/_models/Member';

@Component({
  selector: 'app-card-member',
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.css']
})
export class CardMemberComponent {

  @Input() member:IMember
}
