import { Component, Input, OnInit } from '@angular/core';
import { IMember } from 'src/app/_model/member';

@Component({
  selector: 'app-card-member',
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.css']
})
export class CardMemberComponent  implements OnInit {

  @Input() member :IMember

  constructor(){}

  ngOnInit(): void { }

}
