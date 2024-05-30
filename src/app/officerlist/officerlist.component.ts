import { Component, OnInit, ViewChild } from '@angular/core';
import { Officer } from '../_share/officer';
import { OfficerService } from './officer.service';
import { MatTableDataSource, MatPaginator} from '@angular/material';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-officerlist',
  templateUrl: './officerlist.component.html',
  styleUrls: ['./officerlist.component.css']
})
export class OfficerlistComponent implements OnInit {

  lastname:string="";
  firstname:string="";
  badge:string="";
  filters:string="";

  dataSource:MatTableDataSource<Officer[]>;
  displayedColumns:string[]=['Payroll','Badge','Title','Last','First'];
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(
    private officerService:OfficerService,
    private alertService:AlertService
    ) { 
  }

  private searchby(){
  //search office by name and badge
    this.officerService.searchOfficer(this.lastname,this.firstname,this.badge).subscribe((data:any)=>{

      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
    },
    error=>{
      this.alertService.error(error);
    });
    this.lastname="";
    this.firstname="";
    this.badge="";
    // console.log(this.dataSource);
  }

  //filter for officer form
  private applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
  }

}
