import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor(private spinner:NgxSpinnerService) { }
  private busyRequestCont = new BehaviorSubject<number>(0);
  showBusy(){
    this.busyRequestCont.next(this.busyRequestCont.value + 1);
    this.spinner.show(undefined,{
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'medium',
      color: '#fff',
      type: 'square-jelly-box',
    })

  }
  hideBusy(){
    this.busyRequestCont.next(this.busyRequestCont.value - 1);
    if(this.busyRequestCont.value <= 0){
      this.busyRequestCont.next(0);
      this.spinner.hide();

    }

  }
}
