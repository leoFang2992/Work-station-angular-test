import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Person } from 'src/app/_share/pmd/person';
import { History } from 'src/app/_share/pmd/history';
import { DisclosureService } from '../disclosure.service';
import { DisclosureDetailComponent } from '../_dialog/disclosure-detail/disclosure-detail.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
@Component({
  selector: 'app-disclosure-user',
  templateUrl: './disclosure-user.component.html',
  styleUrls: ['./disclosure-user.component.css']
})
export class DisclosureUserComponent implements OnInit {

  // payroll:string;
  searchForm:FormGroup;
  submitted = false;

  disclosuresListDataSource:MatTableDataSource<Person[]>;
  disclosuresListDisplayedColumns:string[]=['Payroll','Badge','Title','Last Name','First Name', 'District','Squad'];

  constructor(
    private alertService: AlertService,
    private formBuilder:FormBuilder,
    public dialog:MatDialog,
    private disclosureService: DisclosureService
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      payroll:['',[Validators.required,Validators.pattern('(TP[0-9]{5}||[0-9]{6})(?:;(TP[0-9]{5}||[0-9]{6}))*')]],
    });
  }

  get f(){
    return this.searchForm.controls;
  }

  private searchByPayroll(){
  //reload disclosures form
    this.submitted = true;
    if(this.searchForm.invalid){
      return
    }
      this.disclosureService.getUserDisclosuresList(this.f.payroll.value).subscribe(
        (data:any)=>{
          this.disclosuresListDataSource = new MatTableDataSource([data.data]);
          console.log(this.disclosuresListDataSource.data)
        },
        error=>{
          this.alertService.error(error);
        }
      );
    
  }

  private getPayrollErrorMessage(){
  //error message for payroll
    return this.f.payroll.hasError('required')?'You must enter a payroll Number':
      'The input payroll does not meet the standard';
  }

  private showDetail(row){
  //show the detail from dataq by user selected in disclosures form
    const dialogRef = this.dialog.open(DisclosureDetailComponent,{
      width:'600px',
      data:{
        detail:row
      }
    });
    dialogRef.afterClosed().subscribe();
  }


}
