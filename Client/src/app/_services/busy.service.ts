import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private busyRequestCount = new BehaviorSubject<number>(0);
  constructor(private spinner :NgxSpinnerService) { }

  showBusy(){
    this.busyRequestCount.next(this.busyRequestCount.value + 1);
    this.spinner.show(undefined,{
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'medium',
      color: '#fff',
      type: 'square-jelly-box',
    })
  }
  hideBusy(){
      this.busyRequestCount.next(this.busyRequestCount.value - 1);

      if(this.busyRequestCount.value <= 0){
        this.busyRequestCount.next(0);
        this.spinner.hide();
      }
  }
}
