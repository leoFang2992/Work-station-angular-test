import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../_share/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Subpoena_Request } from '../_share/Subpoena/subpoena-request';
import { PmdService } from './pmd.service';
import { DiscussDetailComponent } from './_dialog/discuss-detail/discuss-detail.component';
import { ReviewDetailComponent } from './_dialog/review-detail/review-detail.component';

@Component({
  selector: 'app-pmd',
  templateUrl: './pmd.component.html',
  styleUrls: ['./pmd.component.css']
})
export class PmdComponent implements OnInit,OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;
  users:User[] =[];
  ada:any;

  userDisclosuresDataSource:MatTableDataSource<Subpoena_Request[]>;
  userDisclosuresDisplayedColumns:string[]=['Officer','DC','Def','Court Room','Listing Date', 'Status'];
  @ViewChild('userDisclosuresPaginator') userDisclosuresPaginator:MatPaginator;

  reviewDisclosuresDataSource:MatTableDataSource<Subpoena_Request[]>;
  reviewDisclosuresDisplayedColumns:string[]=['Officer','DC','Def','Court Room','Listing Date', 'ADA'];
  @ViewChild('reviewDisclosuresPaginator') reviewDisclosuresPaginator:MatPaginator;

  discussDisclosuresDataSource:MatTableDataSource<Subpoena_Request[]>;
  discussDisclosuresDisplayedColumns:string[]=['Officer','DC','Def','Court Room','Listing Date','ADA'];
  @ViewChild('discussDisclosuresPaginator') discussDisclosuresPaginator:MatPaginator;


  constructor(
    public dialog:MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private pmdService: PmdService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
    });
   }

  ngOnInit() {
    //get all data at begin
    this.pmdService.getUserRequest(this.currentUser.payroll).subscribe((data:any)=>{
      this.userDisclosuresDataSource = new MatTableDataSource(data.data);
      this.userDisclosuresDataSource.paginator = this.userDisclosuresPaginator;
    });

    this.pmdService.getAllRequest(2).subscribe((data:any)=>{
      this.reviewDisclosuresDataSource = new MatTableDataSource(data.data);
      this.reviewDisclosuresDataSource.paginator = this.reviewDisclosuresPaginator;
    });

    this.pmdService.getAllRequest(1).subscribe((data:any)=>{
      this.discussDisclosuresDataSource = new MatTableDataSource(data.data);
      this.discussDisclosuresDataSource.paginator = this.discussDisclosuresPaginator;
    });


  }  
  
  ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  private applyFilter(filterValue:string){
  //filter to subpoena
    this.userDisclosuresDataSource.filter = filterValue.trim().toLowerCase();
    if(this.userDisclosuresDataSource.paginator){
      this.userDisclosuresDataSource.paginator.firstPage();
    }
  }

  private userDisclosuresReload(){
  //get all relevent request by current user
    this.pmdService.getUserRequest(this.currentUser.payroll).subscribe((data:any)=>{
      this.userDisclosuresDataSource = new MatTableDataSource(data.data);
      this.userDisclosuresDataSource.paginator = this.userDisclosuresPaginator;
    });
  }

  private statusDetection(row){
    if(!row.isPmdApproved){
      return "Pending";
    }
    if(row.isPmdApproved == true){
      return "Approved";
    }
    if(row.isPmdApproved == false){
      return "Deny";
    }

  }



  private applyReviewFilter(filterValue:string){
  //filter to review form
    this.reviewDisclosuresDataSource.filter = filterValue.trim().toLowerCase();
    if(this.reviewDisclosuresDataSource.paginator){
      this.reviewDisclosuresDataSource.paginator.firstPage();
    }
  }


  private reviewDisclosuresReload(){
  //get all relevent request 
    this.pmdService.getAllRequest(2).subscribe((data:any)=>{
      this.reviewDisclosuresDataSource = new MatTableDataSource(data.data);
      this.reviewDisclosuresDataSource.paginator = this.reviewDisclosuresPaginator;
    });
  }
  private showReviewDetail(row){
  //show detail from data by user selected in review part
    const reviewDialogRef = this.dialog.open(ReviewDetailComponent,{
      width:'500px',
      data:{
        detail:row.pmdPerson,
        id:row.subpoenaRequest.subpoenaRequestId
      }
    });
    reviewDialogRef.afterClosed().subscribe(res=>{
      if(res){
        let temp = this.reviewDisclosuresDataSource.data;
        for (let i =0;i<temp.length;i++){
          let obj:any = temp[i];
          if(res.toString().indexOf(obj.subpoenaRequest.subpoenaRequestId.toString())!==-1){
            temp.splice(i,1);
          }
        }
        console.log(temp.length);
        this.reviewDisclosuresDataSource = new MatTableDataSource(temp);
        this.reviewDisclosuresDataSource.paginator = this.reviewDisclosuresPaginator;
      }
    });
  }



  applyDiscussFilter(filterValue:string){
  //filter to discuss form
    this.discussDisclosuresDataSource.filter = filterValue.trim().toLowerCase();
    if(this.discussDisclosuresDataSource.paginator){
      this.discussDisclosuresDataSource.paginator.firstPage();
    }
  }

  discussDisclosuresReload(){
  //get all relevent request 
    this.pmdService.getAllRequest(1).subscribe((data:any)=>{
      this.discussDisclosuresDataSource = new MatTableDataSource(data.data);
      this.discussDisclosuresDataSource.paginator = this.discussDisclosuresPaginator;
    });
  }

  showDiscussDetail(row){
  //show detail from data by user selected in discuss part
    const discussDialogRef = this.dialog.open(DiscussDetailComponent,{
      width:'500px',
      data:{
        detail:row.pmdPerson,
        id:row.subpoenaRequest.subpoenaRequestId
      }
    });
    discussDialogRef.afterClosed().subscribe(res=>{
      if(res){
        let temp = this.discussDisclosuresDataSource.data;
        for (let i =0;i<temp.length;i++){
          let obj:any = temp[i];
          if(res.toString().indexOf(obj.subpoenaRequest.subpoenaRequestId.toString())!==-1){
            temp.splice(i,1);
          }
        }
        console.log(temp.length);
        this.discussDisclosuresDataSource = new MatTableDataSource(temp);
        this.discussDisclosuresDataSource.paginator = this.discussDisclosuresPaginator;
      }
    });
  }




}
