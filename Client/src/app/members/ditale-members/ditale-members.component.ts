import { MemberService } from './../../_services/member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { IMember } from 'src/app/_models/Member';

@Component({
  selector: 'app-ditale-members',
  templateUrl: './ditale-members.component.html',
  styleUrls: ['./ditale-members.component.css']
})
export class DitaleMembersComponent  implements OnInit {
  member:IMember;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    this.loademember();
    this.loadOptions();

  }
  loademember(){

    this.route.data.subscribe((data)=>{
      this.member = data['member'] as IMember;
      this.galleryImages = this.getimage();
    })

  }
  private loadOptions(){
     this.galleryOptions=[{
       width:'300px',
       height:'300px',
       thumbnailsColumns:4,
       imageAnimation:NgxGalleryAnimation.Slide,
       preview:false
     }]

   }
 private getimage(){
    const images : NgxGalleryImage[]=[];
    for(let image of this.member.photos){
      images.push({
        big:image.url,
        small:image.url,
        medium:image.url
      })
    }
    return images
  }

}
