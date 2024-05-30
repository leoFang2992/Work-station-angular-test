import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { SubmitComfirmationComponent } from 'src/app/subpoena/_dialog/submit-comfirmation/submit-comfirmation.component';
import { DisclosureService } from '../../disclosure.service';
import { Person } from 'src/app/_share/pmd/person';
import { DialogAlertService } from 'src/app/alert/dialog-alert/dialog-alert.service';

@Component({
  selector: 'app-disclosure-detail',
  templateUrl: './disclosure-detail.component.html',
  styleUrls: ['./disclosure-detail.component.css']
})
export class DisclosureDetailComponent implements OnInit,AfterViewInit {

  historys = this.inputData.detail.pmdhistorys;
  file:any;

  fileListDataSource:MatTableDataSource<Person[]>;
  fileListDisplayedColumns:string[]=['FileName','Download'];



  constructor(
    public dialogRef: MatDialogRef<SubmitComfirmationComponent>,
    private dialogAlertService: DialogAlertService,
    private disclosureService: DisclosureService,
    @Inject(MAT_DIALOG_DATA) public inputData
  ) { }

  ngOnInit() {
    this.fileListDataSource = new MatTableDataSource(this.inputData.detail.files);
  }

  // Workaround for angular component issue #13870
  disableAnimation = true;
  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(()=>this.disableAnimation = false);
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
}
