import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { ShowEnumPipe } from './_pipes/show-enum.pipe';




@NgModule({
  declarations: [ShowEnumPipe],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          timeOut:5000,
          progressBar:true,
          progressAnimation:'increasing'
        }),

  TabsModule.forRoot(),
  NgxGalleryModule,
  FileUploadModule,
  BsDatepickerModule.forRoot(),
  PaginationModule.forRoot()
  ],
  exports :[
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ShowEnumPipe
  ]
})
export class SharedModule { }
