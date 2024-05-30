import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Person } from 'src/app/_share/pmd/person';
import { DisclosureService } from '../disclosure.service';
import { DisclosureDetailComponent } from '../_dialog/disclosure-detail/disclosure-detail.component';
import { DisclosureEditComponent } from '../_dialog/disclosure-edit/disclosure-edit.component';
import { DisclosureAddComponent } from '../_dialog/disclosure-add/disclosure-add.component';
import { Overlay } from '@angular/cdk/overlay';
import { DisclosureDeleteComponent } from '../_dialog/disclosure-delete/disclosure-delete.component';

@Component({
  selector: 'app-disclosure-admin',
  templateUrl: './disclosure-admin.component.html',
  styleUrls: ['./disclosure-admin.component.css']
})
export class DisclosureAdminComponent implements OnInit {

  disclosuresListDataSource:MatTableDataSource<Person[]>;
  disclosuresListDisplayedColumns:string[]=['Payroll','Badge','Title','Last Name','First Name', 'District','Squad','Edit','Delete'];
  @ViewChild('disclosuresListPaginator') disclosuresListPaginator:MatPaginator;

  filter:string=""

  constructor(
    public dialog:MatDialog,
    private disclosureService: DisclosureService,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.disclosureService.getAdminDisclosuresList().subscribe((data:any)=>{
      this.disclosuresListDataSource = new MatTableDataSource(data.data);
      this.disclosuresListDataSource.paginator = this.disclosuresListPaginator;
    });
  }

  private applyFilter(filterValue:string){
  //filter to disclosures form
  this.disclosuresListDataSource.filter = filterValue.trim().toLowerCase();
    if(this.disclosuresListDataSource.paginator){
      this.disclosuresListDataSource.paginator.firstPage();
    }
  }

  reload(){
  //reload disclosures form
    this.disclosureService.getAdminDisclosuresList().subscribe((data:any)=>{
      this.disclosuresListDataSource = new MatTableDataSource(data.data);
      this.disclosuresListDataSource.paginator = this.disclosuresListPaginator;
    });
  }

  private add(){
  //add new officer to disclosures list
    const addDialogRef = this.dialog.open(DisclosureAddComponent,{
      maxHeight: '80vh'
    });
    addDialogRef.afterClosed().subscribe(res=>{
      if(res){
        let temp = this.disclosuresListDataSource.data;
        let isCreated = false;
        //update and make the item in the top of list
        for (let i =0;i<temp.length;i++){
          let obj:any = temp[i];
          if(res.payrollNumber.indexOf(obj.payrollNumber)!==-1){
            isCreated = true;
            temp.splice(i,1);
            temp.unshift(res);
          }
        }

        //add and make the item in the top of list
        if(isCreated === false ){
          console.log(isCreated);
          temp.unshift(res);
        }
        this.filter = "";
        this.disclosuresListDataSource = new MatTableDataSource(temp);
        this.disclosuresListDataSource.paginator = this.disclosuresListPaginator;

      }
    });  
  }

  private edit(row){
  //edit all information for the row
    const editDialogRef = this.dialog.open(DisclosureEditComponent,{
      maxHeight: '80vh',
      data:{
        detail:row
      }
    });
    editDialogRef.afterClosed().subscribe(res=>{
      if(res){
        let temp = this.disclosuresListDataSource.data;
        for (let i =0;i<temp.length;i++){
          let obj:any = temp[i];
          if(res.data.payrollNumber == obj.payrollNumber){
            temp.splice(i,1,res.data);
          }
        }
        this.disclosuresListDataSource = new MatTableDataSource(temp);
        this.disclosuresListDataSource.paginator = this.disclosuresListPaginator;
      }
      // this.reload();
      this.filter = "";
    });

  }

  private delete(row){
    const deleteDialogRef = this.dialog.open(DisclosureDeleteComponent,{
      maxHeight:'80vh',
      width:'600px',
      data:{
        detail:row
      }
    });
    deleteDialogRef.afterClosed().subscribe(
      data=>{
        this.filter = "";
        this.reload();
    }); 
  }


  private showDetail(row){
  //show the detail from dataq by user selected in disclosures form
    const detailDialogRef = this.dialog.open(DisclosureDetailComponent,{
      width:'600px',
      maxHeight: '80vh',
      data:{
        detail:row
      }
    });
    detailDialogRef.afterClosed().subscribe();
  }

}
