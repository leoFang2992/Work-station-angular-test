import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Person } from 'src/app/_share/pmd/person';
import { SubmitComfirmationComponent } from 'src/app/subpoena/_dialog/submit-comfirmation/submit-comfirmation.component';
import { DisclosureService } from '../../disclosure.service';
import { AlertService } from 'src/app/alert/alert.service';
import { DialogAlertService } from 'src/app/alert/dialog-alert/dialog-alert.service';

@Component({
  selector: 'app-disclosure-delete',
  templateUrl: './disclosure-delete.component.html',
  styleUrls: ['./disclosure-delete.component.css']
})
export class DisclosureDeleteComponent implements OnInit {

  historys = this.inputData.detail.pmdhistorys;
  file:any;

  fileListDataSource:MatTableDataSource<Person[]>;
  fileListDisplayedColumns:string[]=['FileName','Download'];



  constructor(
    public dialogRef: MatDialogRef<SubmitComfirmationComponent>,
    private alertService: AlertService,
    private dialogAlertService: DialogAlertService,
    private disclosureService: DisclosureService,
    @Inject(MAT_DIALOG_DATA) public inputData
  ) { }

  ngOnInit() {
  }

  private delete(){
    this.disclosureService.deletePerson(this.inputData.detail.payrollNumber).subscribe(
      data=>{
        this.alertService.success("PMD Person Delete Success!");
        this.dialogRef.close();
      },
      error=>{
        this.dialogAlertService.error(error);
      }
    );
  }

  private cancel(){
    console.log("cancel delete")
    this.dialogRef.close();
  }


}
