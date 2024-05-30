import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Subpoena_officer } from 'src/app/_share/Subpoena/subpoena-officer';
import { MatTableDataSource, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubpoenaService } from '../../subpoena.service';
import { DcsearchComponent } from '../dcsearch/dcsearch.component';
import { first } from 'rxjs/operators';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DialogAlertService } from 'src/app/alert/dialog-alert/dialog-alert.service';

@Component({
  selector: 'app-dc-create',
  templateUrl: './dc-create.component.html',
  styleUrls: ['./dc-create.component.css']
})
export class DcCreateComponent implements OnInit {

  searchForm: FormGroup;
  createForm: FormGroup;
  submitted = false;
  created = false;
  chargeList:string[]=[];
  filterChargeList:string[]=this.chargeList.slice();
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
    this.createForm = this.formBuilder.group({
      dcNumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pidNumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
      remarks:[''],
      hearingTypeCode:['',Validators.required],
      def:['',Validators.required],
      caseCharge:['',Validators.required]   
    });
  }

  get f(){
    return this.searchForm.controls;
  }

  get c(){
    return this.createForm.controls;
  }

  private searchby(){
  //search officer by payroll number
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
    this.subpoenaService.getCaseCharges().subscribe((data:any)=>{
      this.chargeList = data.data;
    });
    // console.log(this.chargeList)
    // console.log(this.filterChargeList)
  }

  private add(){
  // create new dc 
    this.created = true;
    if(this.createForm.invalid){
      return
    }
    this.subpoenaService.createDC(this.c.dcNumber.value,this.c.pidNumber.value,this.f.payrollString.value,this.c.def.value,this.c.caseCharge.value)
      .pipe(first())
      .subscribe(
        (res:any)=>{
          this.selectOfficers = res.data;
          this.selectOfficers.map(data=>{
            data.remarks = this.c.remarks.value;
            data.hearingTypeCode = this.c.hearingTypeCode.value;
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
        }
      );
  }

  //filter the charge list to select

  // filterCharge(val){
  //   console.log(val);
  //   this.filterCharge = this.filterChargeList.filter((unit) => unit.toLowerCase().indexOf(val.toLowerCase())!== -1);
  // }

  private getPayrollErrorMessage(){
    return this.f.payrollString.hasError('required')?'You must enter a payroll Number':
    'The input payroll does not meet the standard';
  }
  private getDcErrorMessage(){
    return this.c.dcNumber.hasError('required')?'You must enter a dc Number':
    'The input dc number does not meet the standard';
  }
  private getPidErrorMessage(){
    return this.c.pidNumber.hasError('required')?'You must enter a pid Number':
    'The input pid number does not meet the standard';
  }
  private getDefErrorMessage(){
    return this.c.def.hasError('required')?'You must enter the def name':
    ''
  }

}
