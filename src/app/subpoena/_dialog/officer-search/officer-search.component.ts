import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Subpoena_officer } from 'src/app/_share/Subpoena/subpoena-officer';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubpoenaService } from '../../subpoena.service';
import { DcsearchComponent } from '../dcsearch/dcsearch.component';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DialogAlertService } from 'src/app/alert/dialog-alert/dialog-alert.service';

@Component({
  selector: 'app-officer-search',
  templateUrl: './officer-search.component.html',
  styleUrls: ['./officer-search.component.css']
})
export class OfficerSearchComponent implements OnInit {

  searchForm: FormGroup;
  attachForm: FormGroup;
  submitted = false;
  attached = false;
  selectOfficers:Subpoena_officer[]=[];
  isNew = true;
  isSelected = true;
  trialInProgress = false;
  isCancelled = false;
  isExpend = false;

  dataSource:MatTableDataSource<Subpoena_officer[]>;
  displayedColumns:string[]=['Officer','Badge','Payroll'];
  @ViewChild(MatPaginator) paginator:MatPaginator;
  
  constructor(
    private subpoenaService:SubpoenaService,
    private dialogAlertService:DialogAlertService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<DcsearchComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedData: Subpoena_officer[],
    @Inject(MAT_DIALOG_DATA) public inputData) { }

  ngOnInit() {
    // this.selectedData = this.selectOfficers;
    this.searchForm = this.formBuilder.group({
      payrollString:['',[Validators.required,Validators.pattern('(TP[0-9]{5}||[0-9]{6})(?:;(TP[0-9]{5}||[0-9]{6}))*')]],

    });
    this.attachForm = this.formBuilder.group({
      dcNumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pidNumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
      remarks:[''],
      hearingTypeCode:['',Validators.required]
    });
  }

  get f(){
    return this.searchForm.controls;
  }
  get a(){
    return this.attachForm.controls;
  }

  private searchby(){
  //search officers by payroll number
    this.submitted = true;
    if(this.searchForm.invalid){
      return
    }
    this.subpoenaService.searchOfficersByPayroll(this.f.payrollString.value).subscribe(
      (data:any)=>{
        let result = data.data.filter(res=>
          !this.inputData.payroll.includes(res.payrollNumber)
        );
        // this.selectOfficers = result;
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        if(this.dataSource.data.length !== 0){
          this.isExpend = true;
        }
      },
      error=>{
        this.dialogAlertService.error(error);
      }
    );
    // this.dcNumber="";
  }

  private add(){
  //attach officer to the dc 
    this.attached = true;
    if(this.attachForm.invalid){
      return
    }
    this.subpoenaService.attachOfficers(this.a.dcNumber.value,this.a.pidNumber.value,this.f.payrollString.value)
      .pipe(first())
      .subscribe(
      (res:any)=>{
        this.selectOfficers = res.data;
        this.selectOfficers.map(data=>{
          data.remarks = this.a.remarks.value;
          data.hearingTypeCode = this.a.hearingTypeCode.value;
          data.isNew = this.isNew;
          data.isSelected = this.isSelected;
          data.trialInProgress = this.trialInProgress;
          data.isCancelled = this.isCancelled;
        })
        this.selectedData = this.selectOfficers;
        // console.log(this.selectedData);
        this.dialogRef.close(this.selectedData);
      },
      error=>{
        this.dialogAlertService.error(error);  
      });
  }

  //error message for input fields
  private getPayrollErrorMessage(){
    return this.f.payrollString.hasError('required')?'You must enter a payroll Number':
      'The input payroll does not meet the standard';
  }

  private getDcErrorMessage(){
    return this.a.dcNumber.hasError('required')?'You must enter a dc Number':
    'The input dc number does not meet the standard';
  }

  private getPidErrorMessage(){
    return this.a.pidNumber.hasError('required')?'You must enter a pid Number':
    'The input pid number does not meet the standard';
  }

}
