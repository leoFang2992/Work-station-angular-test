import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { PmdService } from '../../pmd.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubmitComfirmationComponent } from 'src/app/subpoena/_dialog/submit-comfirmation/submit-comfirmation.component';
import { AlertService } from 'src/app/alert/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-discuss-detail',
  templateUrl: './discuss-detail.component.html',
  styleUrls: ['./discuss-detail.component.css']
})
export class DiscussDetailComponent implements OnInit,AfterViewInit {

  historys = this.inputData.detail.pmdhistorys;
  constructor(
    private pmdService: PmdService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<SubmitComfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData
  ) { }

  ngOnInit() {
  }

  // Workaround for angular component issue #13870
  disableAnimation = true;
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(()=>this.disableAnimation = false);
  }

  private discussed(){
    let isApproved:boolean = true;
    this.pmdService.reviewRequest(this.inputData.id,isApproved,this.inputData.detail.payrollNumber)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          
          this.alertService.success("Discussed Success!");
          this.dialogRef.close(this.inputData.id);
        },
        error=>{
          this.alertService.error(error);
          this.dialogRef.close();
        }
      )
    

  }

}
