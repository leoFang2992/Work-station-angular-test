import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { PmdService } from '../../pmd.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubmitComfirmationComponent } from 'src/app/subpoena/_dialog/submit-comfirmation/submit-comfirmation.component';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit,AfterViewInit {

  // panelOpenState = false;
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

  private approval(){
  //approved this request by admin
    let isApproved:boolean = true;
    this.pmdService.reviewRequest(this.inputData.id,isApproved,this.inputData.detail.payrollNumber)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          
          this.alertService.success("Approve Success!");
          this.dialogRef.close(this.inputData.id);
        },
        error=>{
          this.alertService.error(error);
          this.dialogRef.close()
        }
      )
    
  }

  private deny(){
  //deny this request by admin
    let isApproved:boolean = false;
    this.pmdService.reviewRequest(this.inputData.id,isApproved,this.inputData.detail.payrollNumber)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          this.alertService.success("Deny Success!");
          this.dialogRef.close(this.inputData.id);
        },
        error=>{
          this.alertService.error(error);
          this.dialogRef.close()
        }
      )
    
  }

}
