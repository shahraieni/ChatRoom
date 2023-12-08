import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ditale-members',
  templateUrl: './ditale-members.component.html',
  styleUrls: ['./ditale-members.component.css']
})
export class DitaleMembersComponent  implements OnInit {

  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
   console.log(this.route?.snapshot?.params['username'])
  }

}
