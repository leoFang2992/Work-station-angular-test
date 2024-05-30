import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SubmitComfirmationComponent } from 'src/app/subpoena/_dialog/submit-comfirmation/submit-comfirmation.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Person } from 'src/app/_share/pmd/person';
import { DisclosureService } from '../../disclosure.service';
import { AlertService } from 'src/app/alert/alert.service';
import { DialogAlertService } from 'src/app/alert/dialog-alert/dialog-alert.service';
import { first } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';
import * as moment from 'moment';

@Component({
  selector: 'app-disclosure-edit',
  templateUrl: './disclosure-edit.component.html',
  styleUrls: ['./disclosure-edit.component.css']
})
export class DisclosureEditComponent implements OnInit {

  historys = this.inputData.detail.pmdhistorys;
  updateForm: FormGroup;
  addPayroll:string;
  submitted = false;
  pmdOfficer:Person;
  pmdFormValueChanges$;
  URL:string;
  uploader:FileUploader;
  fileListDataSource:MatTableDataSource<Person[]>;
  fileListDisplayedColumns:string[]=['FileName','Download','Delete'];

  uploadForm: FormGroup;
  constructor(
    private disclosureService:DisclosureService,
    private alertService: AlertService,
    private dialogAlertService:DialogAlertService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<SubmitComfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData
  ) {
    
   }

   ngOnInit() {
    let temp=[];
    this.historys.map(data=>{
      temp.push(this.initHistory(data));
      
    })
    this.updateForm = this.formBuilder.group({
      firstName:[this.inputData.detail.firstName,Validators.required],
      lastName:[this.inputData.detail.lastName,Validators.required],
      suffix:[this.inputData.detail.suffix],
      title:[this.inputData.detail.title],
      payroll:[{value:this.inputData.detail.payrollNumber,disabled:true},Validators.required],
      badge:[this.inputData.detail.badgeNumber],
      squad:[this.inputData.detail.squad],
      district:[this.inputData.detail.district],
      pmdLevel:[this.inputData.detail.hasDaHold.toString(),Validators.required],
      pmdHistorys:this.formBuilder.array(temp)
    });
    this.URL='http://10.30.132.10/pmd/files?payroll='+this.updateForm.controls.payroll.value;
    this.fileListDataSource = new MatTableDataSource(this.inputData.detail.files);
    this.uploader = new FileUploader({url:this.URL});
    this.uploader.onSuccessItem = (item:any,response:any)=>{
      let temp = JSON.parse(response).data;
      let res = this.inputData.detail.files.concat(temp);
      item.remove();
      this.fileListDataSource = new MatTableDataSource(res);
    }
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
    return this.updateForm.controls;
  }

  private initHistory(history:any){
    let temp = new Date(history.misconductDate);
    return this.formBuilder.group({
      misconductDate:[temp,Validators.required],
      summaryOfFacts:[history.summaryOfFacts,Validators.required],
      pbiFinding:[history.pbiFinding],
      penalty:[history.penalty],
      pmdHistoryId:[history.pmdHistoryId]
    });
    //initialize stream on pmdhistorys
    this.pmdFormValueChanges$ = this.f['pmdHistorys'].valueChanges;
    //subscribe to the stream so listen to changes on pmdhistorys
    this.pmdFormValueChanges$.subscribe(historys=>this.updateHistorys(historys));
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
    this.disclosureService.deleteHistory(this.f.pmdHistorys.value[i].pmdHistoryId).subscribe(
      data=>{
        this.dialogAlertService.success("History Delete Success!");
        control.removeAt(i);
      },
      error=>{
        this.dialogAlertService.error(error);
      }
    );
    
  }

  private updateHistorys(pmdHistorys:any){
    const control = <FormArray>this.f['pmdHistorys'];
    console.log(control);
  }  


  private updatePmdPerson(){
  //add new pmd person to database
    this.submitted = true;
    if(this.updateForm.invalid){
      return
    }

    let pmdPerson:any={};
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
    pmdPerson.files=this.fileListDataSource.data;
    
    pmdPerson.pmdHistory.forEach((data:any) => {
      let temp = data.misconductDate.toISOString().slice(0,10);
      data.misconductDate = temp;
    });
    this.disclosureService.updateDisclosures(pmdPerson)
      .pipe(first())
      .subscribe(
        (data:any)=>{
          this.dialogAlertService.success("Add PMD Officer Success!")
          this.dialogRef.close(data);
        },
        error=>{
          this.dialogAlertService.error(error);
        }
      )
    
  }

  // private getPayrollErrorMessage(){
  //   return this.f.payroll.hasError('required')?'You must enter a payroll Number':
  //   'The input payroll does not meet the standard';
  // }

  private getFirstErrorMessage(){
    return this.f.firstName.hasError('required')?'You must enter first name':
    ''
  }

  private getLastErrorMessage(){
    return this.f.lastName.hasError('required')?'You must enter the last name':
    ''
  }


  private downloadFile(fileName:string,path:string){
  //download file by file path when user click download button.
    this.disclosureService.downloadFiles(path).subscribe(
      // (data:any)=>{
      //   window.open(window.URL.createObjectURL(data))
      //   this.dialogAlertService.success("Download success");
      //   console.log(data);
      // }
      (data:any)=>{
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        let newBlob = new Blob([data],{type:"application/pdf"});

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if(window.navigator&& window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;    
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const res = window.URL.createObjectURL(newBlob);
        
        let link = document.createElement('a');
        link.href = res;
        link.download = fileName;
        
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
        
        setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      },
    error=>{
      console.log("error",error);
    });
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

  
}
