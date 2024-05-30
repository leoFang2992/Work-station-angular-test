import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatDialogRef } from '@angular/material';
import { Subpoena_officer } from 'src/app/_share/Subpoena/subpoena-officer';
import { DcsearchComponent } from '../dcsearch/dcsearch.component';


@Component({
  selector: 'app-quicksearch',
  templateUrl: './quicksearch.component.html',
  styleUrls: ['./quicksearch.component.css']
})
export class QuicksearchComponent implements OnInit {

  hearingTypeCode:string="";
  remarks:string ="";
  selectOfficers:Subpoena_officer[]=[];
  // tempDC:string="";
  // tempDef:string="";
  isNew = false;
  trialInProgress = false;
  isCancelled = false;

  dataSource:MatTableDataSource<Subpoena_officer[]>;
  displayedColumns:string[]=['Officer','Badge','Payroll','Dept'];
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(public dialogRef: MatDialogRef<DcsearchComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedData: Subpoena_officer[],@Inject(MAT_DIALOG_DATA) public inputData) { }

  ngOnInit() {
    let result = this.inputData.officers.filter(res=>
      !this.inputData.payroll.includes(res.payrollNumber)
    );
    this.dataSource = new MatTableDataSource(result);
    this.dataSource.paginator = this.paginator;
    this.selectedData = this.selectOfficers;
    // if(result[0]){
    //   this.tempDC = "["+result[0].dcNumber+"-"+result[0].pidNumber+"]";
    //   this.tempDef = result[0].defName;
    // }
  }

  private add(){
  //add officers to subpoena list in main page
    this.selectOfficers.map(data=>{
      data.remarks = this.remarks;
      data.hearingTypeCode = this.hearingTypeCode;
      data.isNew = this.isNew;
      data.trialInProgress = this.trialInProgress;
      data.isCancelled = this.isCancelled;
    })
    // this.subpoenaService.sendData(this.selectOfficers);
  }

  private choose(row){
  // set officer to selected by clicked row;
    row.isSelected = !row.isSelected;
    if(row.isSelected == false){
      this.selectOfficers = this.selectOfficers.filter(res=> res.isSelected == true );
    }else{
      this.selectOfficers.push(row);
    }
    // console.log(this.dataSource.filteredData);
  }
}
