import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAction, NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { IMember } from 'src/app/_model/member';
import { IMessage } from 'src/app/_model/message';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-detail-member',
  templateUrl: './detail-member.component.html',
  styleUrls: ['./detail-member.component.css']
})
export class DetailMemberComponent  implements OnInit  , OnDestroy{

  member:IMember;
  messages : IMessage[];
  sub = new Subscription();
  galleryOptions : NgxGalleryOptions[];
  galleryImages:NgxGalleryImage[];
  @ViewChild('staticTabs', { static: true }) staticTabs: TabsetComponent;
  activeTab:TabDirective;
  tabId = 1;

  constructor(private route:ActivatedRoute ,  private messageService  : MessageService ){
    

  }
  ngOnInit(): void {
     this.loadMember();
   
    this.loadOptions();
    this.route.queryParams.subscribe(params=>{
    this.tabId = (params['tab'] != null ? +params['tab'] : 0);
      if(params['tab']){

        this.selectTab(this.tabId)
      }

    })
  }

  selectTab(tabId:number){
    this.staticTabs.tabs[tabId].active = true;
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
  
  loadMessageThread(){
    this.sub.add( this.messageService.getMessageThread(this.member.userName).subscribe((res)=>{
      this.messages = res;
    }))
    
  }
  
  onTabChange(tab :TabDirective){
    
    this.activeTab = tab;
    if(this.activeTab.heading ==="Messages"){
      this.loadMessageThread();
    }
  }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }


}
