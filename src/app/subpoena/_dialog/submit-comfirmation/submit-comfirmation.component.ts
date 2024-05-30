import { Component, OnInit, Inject } from '@angular/core';
import { SubpoenaService } from '../../subpoena.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-submit-comfirmation',
  templateUrl: './submit-comfirmation.component.html',
  styleUrls: ['./submit-comfirmation.component.css']
})
export class SubmitComfirmationComponent implements OnInit {


  userList:any[] = [];
  createAda:any=""

  constructor(private subpoenaService:SubpoenaService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<SubmitComfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData
  ) { }

  ngOnInit() {
    this.subpoenaService.confirmList(this.inputData.currentUser)
      .subscribe((data:any)=>{
        if(Array.isArray(data.data)){
          //data is array
          this.userList = data.data;
        }else{
          //data is object
          this.userList.push(data.data);
        }
      })
    
  }

  private count(){
      return this.inputData.selectedOfficers.length  
  }

  private create(){
  // create a new subpoena by all input: court, date, time, selectedOfficersPayroll and Creator payroll number
    this.subpoenaService.submitRequest(this.inputData.selectedOfficers,this.inputData.subpoenaDate,this.inputData.subpoenaTime,this.inputData.courtNumber,this.createAda.payroll)
      .pipe(first()).subscribe(
        data=>{
          console.log("success!");
          this.alertService.success("Create Subpoena successful");
          this.dialogRef.close();
        },
        error=>{
          this.alertService.error(error);
        }
      )
  }
}
