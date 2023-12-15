import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right',
      timeOut:5000,
      progressBar:true,
      progressAnimation:'increasing'
    }),
    TabsModule.forRoot(),

  ],
  exports:[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
  ]
})
export class SharedModule { }
