import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          timeOut:5000,
          progressBar:true,
          progressAnimation:'increasing'
        })
    
  ],
  exports :[
    BsDropdownModule,
    ToastrModule]
})
export class SharedModule { }
