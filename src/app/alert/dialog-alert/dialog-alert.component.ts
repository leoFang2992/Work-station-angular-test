import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogAlertService } from './dialog-alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  message: any;
  constructor(private dialogAlertService:DialogAlertService) { }

  ngOnInit() {
    this.subscription = this.dialogAlertService.getMessage().subscribe(message=>{
      this.message = message;
    })
  }
  clear(){
    this.message = ""
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
