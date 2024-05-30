import { Component, OnInit, ViewChild, Output, Inject } from '@angular/core';
import { SubpoenaService } from '../../subpoena.service';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subpoena_officer } from 'src/app/_share/Subpoena/subpoena-officer';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DialogAlertService } from 'src/app/alert/dialog-alert/dialog-alert.service';



@Component({
  selector: 'app-dcsearch',
  templateUrl: './dcsearch.component.html',
  styleUrls: ['./dcsearch.component.css']
})
export class DcsearchComponent implements OnInit {

  searchDcForm: FormGroup;
  addOfficerForm: FormGroup;
  submitted = false;
  selectOfficers:Subpoena_officer[]=[];
  isNew = false;
  trialInProgress = false;
  isCancelled = false;

  dataSource:MatTableDataSource<Subpoena_officer[]>;
  displayedColumns:string[]=['Officer','Badge','Payroll','Dept'];
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(
    private subpoenaService:SubpoenaService,
    private dialogAlertService: DialogAlertService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DcsearchComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedData: Subpoena_officer[],
    @Inject(MAT_DIALOG_DATA) public inputData) {
  }

  ngOnInit() {
    this.selectedData = this.selectOfficers;
    this.searchDcForm = this.formBuilder.group({
      dcNumber:['',Validators.required]
      // hearingType:['',Validators.required]
    });
    this.addOfficerForm = this.formBuilder.group({
      remarks:[''],
      hearingTypeCode:['',Validators.required]
    });
  }

  get f(){
    return this.searchDcForm.controls;
  }

  get a(){
    return this.addOfficerForm.controls;
  }

  private searchby(){
  //search officers by dc number from api
    this.submitted = true;
    if(this.searchDcForm.invalid){
      return
    }
    this.subpoenaService.searchOfficersbyDC(this.f.dcNumber.value).subscribe(
      (data:any)=>{
        let result = data.data.filter(res=>
          !this.inputData.payroll.includes(res.payrollNumber)
        );
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
      },
      error=>{
        this.dialogAlertService.error(error);
        // console.log(error);
      }
    );
    // this.dcNumber="";
  }


  private add(){
  //add selected officers to subpoena form
    this.selectOfficers.map(data=>{
      data.remarks = this.a.remarks.value;
      data.hearingTypeCode = this.a.hearingTypeCode.value;
      data.isNew = this.isNew;
      data.trialInProgress = this.trialInProgress;
      data.isCancelled = this.isCancelled;
    })
    // this.subpoenaService.sendData(this.selectOfficers);
  }

  private choose(row){
  //click row to insert officers to selected list
    row.isSelected = !row.isSelected;
    if(row.isSelected == false){
      this.selectOfficers = this.selectOfficers.filter(res=> res.isSelected == true );
    }else{
      this.selectOfficers.push(row);
    }
  }

  private getErrorMessage(){
  //dc number form validator.
    return this.f.dcNumber.hasError('required')?'You must enter a dc Number':
      '';
  }

}
