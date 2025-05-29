import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAction, NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { IMember } from 'src/app/_model/member';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-detail-member',
  templateUrl: './detail-member.component.html',
  styleUrls: ['./detail-member.component.css']
})
export class DetailMemberComponent  implements OnInit {

  member:IMember;
  galleryOptions : NgxGalleryOptions[];
  galleryImages:NgxGalleryImage[];

  constructor(private route:ActivatedRoute ){
      }
  ngOnInit(): void {
      this.loadMember();
   
    this.loadOptions();
  }

  private loadOptions() {
    this.galleryOptions = [{
      width: '400px',
      height: '400px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];
  }

   loadMember() {
    this.route.data.subscribe((data) => {
      this.member = data['member'] as IMember;
    });
    this.galleryImages = this.getImages();
  }

  getImages(){
    const images:NgxGalleryImage[] = [];

    for(let image of this.member?.photos){
      images.push({
        big : image.url,
        medium:image.url,
        small:image.url
      })
    }
      return images
  }

onTabChange(){

}


}
