import { Component, OnInit, Input, OnDestroy, AfterViewInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { SubmitComfirmationComponent } from 'src/app/subpoena/_dialog/submit-comfirmation/submit-comfirmation.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DisclosureService } from '../../disclosure.service';
import { DialogAlertService } from 'src/app/alert/dialog-alert/dialog-alert.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';
import { FileUploader } from 'ng2-file-upload';
import { Person } from 'src/app/_share/pmd/person';



@Component({
  selector: 'app-disclosure-add',
  templateUrl: './disclosure-add.component.html',
  styleUrls: ['./disclosure-add.component.css']
})
export class DisclosureAddComponent implements OnInit,OnDestroy,AfterViewInit{

  addForm: FormGroup;
  addPayroll:string;
  submitted = false;
  pmdOfficer:Person;
  pmdFormValueChanges$;
  URL:string=''
  uploader:FileUploader;
  fileListDataSource:MatTableDataSource<Person[]>;
  fileListDisplayedColumns:string[]=['FileName','Delete'];

  uploadForm: FormGroup;
  constructor(
    private disclosureService:DisclosureService,
    private alertService: AlertService,
    private dialogAlertService:DialogAlertService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<SubmitComfirmationComponent>,
  ) {
   }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      suffix:[''],
      title:[''],
      payroll:['',[Validators.required,Validators.pattern('(TP[0-9]{5}||[0-9]{6})')]],
      badge:[''],
      squad:[''],
      district:[''],
      pmdLevel:['',Validators.required],
      pmdHistorys:this.formBuilder.array([])
    });
  }

  ngOnDestroy(): void {
  //unsubscribe listener
    if(this.pmdFormValueChanges$){
      this.pmdFormValueChanges$.unsubscribe();
    }
  }

  // Workaround for angular component issue #13870
  disableAnimation = true;
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(()=>this.disableAnimation = false);
  }

  get f(){
    return this.addForm.controls;
  }

  private getHistory(){
  //create form pmdHistorys
    return this.formBuilder.group({
      misconductDate:['',Validators.required],
      summaryOfFacts:['',Validators.required],
      pbiFinding:[''],
      penalty:['']
    });

    //initialize stream on pmdhistorys
    this.pmdFormValueChanges$ = this.f['pmdHistorys'].valueChanges;
    //subscribe to the stream so listen to changes on pmdhistorys
    this.pmdFormValueChanges$.subscribe(historys=>this.updateHistorys(historys));
  }

  private addHistory(){
  //add new history row into form
    
    const control = <FormArray>this.f['pmdHistorys'];
    control.push(this.getHistory());
  }

  private removeHistory(i:number){
    const control = <FormArray>this.f['pmdHistorys'];
    control.removeAt(i);
  }

  private updateHistorys(pmdHistorys:any){
    const control = <FormArray>this.f['pmdHistorys'];
    console.log(control);
  }  


  private addPmdPerson(){
  //add new pmd person to database
    this.submitted = true;
    
    if(this.addForm.invalid){
      return
    }
    this.URL = 'http://10.30.132.10/pmd/files?payroll='+this.f.payroll.value;
    this.uploader = new FileUploader({url:this.URL});



    const pmdPerson:any={};
    pmdPerson.firstName = this.f.firstName.value;
    pmdPerson.lastName = this.f.lastName.value;
    pmdPerson.title = this.f.title.value;
    pmdPerson.suffix = this.f.suffix.value;
    pmdPerson.payrollNumber = this.f.payroll.value;
    pmdPerson.squad = this.f.squad.value;
    pmdPerson.district = this.f.district.value;
    pmdPerson.badgeNumber = this.f.badge.value;
    pmdPerson.hasDaHold = this.f.pmdLevel.value;
    pmdPerson.pmdHistory = this.f.pmdHistorys.value;
    pmdPerson.files=[];
    pmdPerson.pmdHistory.forEach(data => {
      
      let temp = data.misconductDate.toISOString();

      data.misconductDate = temp;
    });

    this.uploader.onSuccessItem = (item:any,response:any)=>{
      this.pmdOfficer.files = JSON.parse(response).data;
      // console.log(response);
      // console.log(this.pmdOfficer.files);
      let temp = JSON.parse(response).data;
      let res = pmdPerson.files.concat(temp);
      item.remove();
      this.fileListDataSource = new MatTableDataSource(res);
    }

    this.disclosureService.updateDisclosures(pmdPerson)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          this.dialogAlertService.success("Add PMD Officer Success!")
          this.pmdOfficer = data.data;
          console.log(this.pmdOfficer);
        },
        error=>{
          this.dialogAlertService.error(error);
        }
      )
    
  }

  private deleteFile(fileId){
  //delete the file from attached file list
    this.disclosureService.deleteFiles([fileId]).subscribe(
      (data:any)=>{
        let temp = this.fileListDataSource.data;
        temp.splice(temp.findIndex((res:any)=>res.fileId === fileId),1);
        this.fileListDataSource = new MatTableDataSource(temp);
        this.dialogAlertService.success("Delete Success!");
      },
      error=>{
        this.dialogAlertService.error(error);
      }
    );
  }


  private getPayrollErrorMessage(){
    return this.f.payroll.hasError('required')?'You must enter a payroll Number':
    'The input payroll does not meet the standard';
  }

  private getFirstErrorMessage(){
    return this.f.firstName.hasError('required')?'You must enter first name':
    ''
  }

  private getLastErrorMessage(){
    return this.f.lastName.hasError('required')?'You must enter the last name':
    ''
  }

  turnOffPage(){
    this.dialogRef.close(this.pmdOfficer);
  }

  
 
}
