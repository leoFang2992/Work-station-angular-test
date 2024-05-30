import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { QuicksearchComponent } from './_dialog/quicksearch/quicksearch.component';
import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { DcsearchComponent } from './_dialog/dcsearch/dcsearch.component';
import { OfficerSearchComponent } from './_dialog/officer-search/officer-search.component';
import { DcCreateComponent } from './_dialog/dc-create/dc-create.component';
import { SubpoenaService } from './subpoena.service';
import { Subscription } from 'rxjs';
import { Subpoena_officer } from '../_share/Subpoena/subpoena-officer';
import {SelectionModel} from '@angular/cdk/collections';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { User } from '../_share/user';
import { AuthenticationService } from '../login/authentication.service';
import { Subpoena_Request } from '../_share/Subpoena/subpoena-request';
import { SubmitComfirmationComponent } from './_dialog/submit-comfirmation/submit-comfirmation.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-subpoena',
  templateUrl: './subpoena.component.html',
  styleUrls: ['./subpoena.component.css']
})
export class SubpoenaComponent implements OnInit,OnDestroy {

  
  submitForm: FormGroup;
  submitted = false;
  userList:any=[];
  selectedOfficers:any=[];
  selectedPayroll:string[]=[];
  quickSearchResult:any;
  // subscription:Subscription;


  //for create form datasource
  createDataSource:MatTableDataSource<Subpoena_officer[]>;
  displayedColumns:string[]=['Select','Payroll','Badge','Officer','DC','Def','Charge','Type','Remarks','Trial','Cancel'];
  selection = new SelectionModel<Subpoena_officer>(true, []);
  //@ViewChild(MatPaginator) paginator:MatPaginator;

  //future form datasource
  futureDataSource:MatTableDataSource<Subpoena_Request[]>;
  futureDisplayedColumns:string[]=['Select','Date','Payroll','Badge','Officer','DC','Def','Charge','Type','Remarks','Trial','Cancel'];
  futureSelection = new SelectionModel<Subpoena_Request>(true, []);
  @ViewChild('futurePaginator') futurePaginator:MatPaginator;
  
  //history form datasoucre
  pastDataSource:MatTableDataSource<Subpoena_Request[]>;
  pastDisplayedColumns:string[]=['Date','Payroll','Badge','Officer','DC','Def','Charge','Type','Remarks','Trial','Cancel'];
  // pastSelection = new SelectionModel<Subpoena_Request>(true, []);
  @ViewChild('pastPaginator') pastPaginator:MatPaginator;

  //get currentUser payroll from token
  currentUser: User;
  currentUserSubscription: Subscription;
  users:User[] =[];

  constructor(
    private subpoenaService:SubpoenaService,
    public dialog:MatDialog,
    private alertService: AlertService,
    private formBuilder:FormBuilder,
    private authenticationService: AuthenticationService,
  ){
    //get the current user's info by authentication part
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user=>{
      this.currentUser = user;
    });
   }

  ngOnInit() {
    //get the future and history record of subpoena by current user's payroll 
    this.subpoenaService.getFutureSubpoena(this.currentUser.payroll).subscribe((data:any)=>{
      this.futureDataSource = new MatTableDataSource(data.data);
      this.futureDataSource.paginator = this.futurePaginator;
    }); 
    this.subpoenaService.getPastSubpoena(this.currentUser.payroll).subscribe((data:any)=>{
      this.pastDataSource = new MatTableDataSource(data.data);
      this.pastDataSource.paginator = this.pastPaginator;
    });

    this.submitForm = this.formBuilder.group({
      courtNumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
      subpoenaDate:['',Validators.required],
      subpoenaTime:['',[Validators.required,Validators.pattern('[0-2][0-9]:[0-5][0-9]')]]
    });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
  get f(){
    return this.submitForm.controls;
  }

  private openQuickSearch(){
    this.submitted = false;
      if(!this.f.courtNumber.value||!this.f.subpoenaDate.value){

        this.alertService.error("Please enter date and court number before quick search!");
        return
      } 

      //put data to quick search form in quicksearch component and get the response for selected officer to avoid them occur to search result.
      this.subpoenaService.searchOfficersbyDate(this.f.courtNumber.value,this.f.subpoenaDate.value.toISOString().slice(0,10)).subscribe(
        (data:any)=>{
          this.quickSearchResult = data.data;
          const quickRef = this.dialog.open(QuicksearchComponent,{
            data:{
              payroll:this.selectedPayroll,
              officers:this.quickSearchResult
            }
          });
          //push data to subpoena officers form to show the result and filter.
          quickRef.afterClosed().subscribe(res=>{
            if(res){
              res = res.concat(this.selectedOfficers);
              this.createDataSource = new MatTableDataSource(res);
              this.selectedOfficers = res;
              this.selectedPayroll = [];
              this.selectedOfficers.map(d=>{
                this.selectedPayroll.push(d.payrollNumber);
              })
            }
          })
        },
        error=>{
          this.alertService.error(error);
        }
      );
    
  }

  private openSearchDC(){
 
    this.submitted = false;
    //get the response for selected officer to avoid them occur to search result.
    const dialogRef = this.dialog.open(DcsearchComponent,{
      data:{
        payroll:this.selectedPayroll
      }
    });
    //push data to subpoena officers form to show the result and filter.
    dialogRef.afterClosed().subscribe(res=>{
      // console.log('the searchOfficer was closed');
      if(res){
        res = res.concat(this.selectedOfficers);
        // console.log(res);
        this.createDataSource = new MatTableDataSource(res);
        this.selectedOfficers = res;
        this.selectedPayroll = [];
        this.selectedOfficers.map(d=>{
          this.selectedPayroll.push(d.payrollNumber);
        })
      }
      // console.log(this.selectedPayroll);
    })
  }

  private openOfficerSearch(){

    this.submitted = false;
    //get the response for selected officer to avoid them occur to search result.
    const attachRef = this.dialog.open(OfficerSearchComponent,{
      data:{
        payroll:this.selectedPayroll
      }
    });
    //push data to subpoena officers form to show the result and filter.
    attachRef.afterClosed().subscribe(res=>{
      if(res){
        res = res.concat(this.selectedOfficers);
        console.log(res);
        this.createDataSource = new MatTableDataSource(res);
        this.selectedOfficers = res;
        this.selectedPayroll = [];
        this.selectedOfficers.map(d=>{
          this.selectedPayroll.push(d.payrollNumber);
        })
      }
    })
  }

  private openCreateDC(){

    this.submitted = false;
    //get the response for selected officer to avoid them occur to search result.
    const createRef = this.dialog.open(DcCreateComponent,{
      data:{
        payroll:this.selectedPayroll
      }
    });
    //push data to subpoena officers form to show the result and filter.
    createRef.afterClosed().subscribe(res=>{
      if(res){
        res = res.concat(this.selectedOfficers);
        this.createDataSource = new MatTableDataSource(res);
        this.selectedOfficers = res;
        this.selectedPayroll = [];
        this.selectedOfficers.map(d=>{
          this.selectedPayroll.push(d.payrollNumber);
        })
      }
    })
  }

  private submitComfirmation(){
    this.submitted = true;
    if(this.submitForm.invalid){
      return
    }
    if(this.selectedOfficers[0]){
      // this.subpoenaService.confirmList(this.currentUser.payroll)
      //   .subscribe((data:any)=>{
      //     this.userList = data;
      //     console.log("1",this.userList)
      //   })

      // if(this.userList[0]){
      const confirmRef = this.dialog.open(SubmitComfirmationComponent,{
        data:{  
          selectedOfficers:this.selectedOfficers,
          subpoenaDate:this.f.subpoenaDate.value.toISOString().slice(0,10),
          subpoenaTime:this.f.subpoenaTime.value+":00",
          courtNumber:this.f.courtNumber.value,
          currentUser: this.currentUser.payroll
        }
      });
      confirmRef.afterClosed().subscribe(res=>{
        // console.log("success!");
        // this.alertService.success("Create Subpoena successful");
      })
      // }
    }else{
      this.alertService.error("Please selected some officers before create subpoena!");
    }
  }
  
  private applyFilter(filterValue:string){
    //filter to future and history subpoena
    this.futureDataSource.filter = filterValue.trim().toLowerCase();
    if(this.futureDataSource.paginator){
      this.futureDataSource.paginator.firstPage();
    }
  }

  private isAllSelected(){
    // Whether the number of selected elements matches the total number of rows. 
    const numSelected = this.futureSelection.selected.length;
    const numRows = this.futureDataSource.data.length;
    return numSelected === numRows;
  }

  private removeSelectedRows(){
    // remove all selectrows by checkbox selection

    //Get selected item
    let x:any=[];
    this.futureSelection.selected.forEach(res=>{
      let temp = this.futureDataSource.data;
      let index:number = temp.findIndex((d:any)=>d === res);
      // console.log(temp.findIndex((d:any)=>d === res));
      x.push(temp.splice(index,1));
      this.futureDataSource = new MatTableDataSource<Subpoena_Request[]>(temp);
    });
    //Get the id for selected and translate to string;
    let result = [];
    x.map((res:any)=>{
        result.push(res[0].subpoenaRequestId);
    })
    if(!result[0]){
      this.alertService.error("Must select subpoena before cancel!");
      return
    }
    // console.log(result.toString());
    this.subpoenaService.cancelRequest(result.toString())
      .pipe(first()).subscribe(
        data=>{
          console.log("success!");
          this.alertService.success("Cancel Subpoena Requests successful");
        },
      );


    this.futureSelection = new SelectionModel<Subpoena_Request>(true,[]);
  }

  private masterToggle(){
    // Selects all rows if they are not all selected; otherwise clear selection.
    this.isAllSelected()?
      this.futureSelection.clear():
      this.futureDataSource.data.forEach((row:any)=>this.futureSelection.select(row));
    
  }

  // checkboxLabel(row?:any):string{
  //   if(!row){
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.futureSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  private isAllOfficerSelected(){
    // Whether the number of selected elements matches the total number of rows. 
    const numSelected = this.selection.selected.length;
    const numRows = this.createDataSource.data.length;
    return numSelected === numRows;
  }

  private removeSelectedOfficers(){
    // remove all selectrows by checkbox selection

    //Get selected item
    this.selection.selected.forEach(res=>{
      let index:number = this.selectedOfficers.findIndex((d:any)=>d === res);
      this.selectedOfficers.splice(index,1);
      this.createDataSource = new MatTableDataSource<Subpoena_officer[]>(this.selectedOfficers);
      this.selectedPayroll = [];
      this.selectedOfficers.map(d=>{
        this.selectedPayroll.push(d.payrollNumber);
      })
    });
    this.selection = new SelectionModel<Subpoena_officer>(true,[]);
  }

  private officerMasterToggle(){
    // Selects all rows if they are not all selected; otherwise clear selection.
    this.isAllSelected()?
      this.selection.clear():
      this.createDataSource.data.forEach((row:any)=>this.selection.select(row));
    
  }

  //fiter in weekdays
  myFilter = (d:Date):boolean=>{
    const day = d.getDay();
    return day!==0 && day!==6;
  }


  //reload data 
  private futureReload(){
    this.subpoenaService.getFutureSubpoena(this.currentUser.payroll).subscribe((data:any)=>{
      this.futureDataSource = new MatTableDataSource(data.data);
      this.futureDataSource.paginator = this.futurePaginator;
    });
  }

  private pastReload(){
    this.subpoenaService.getPastSubpoena(this.currentUser.payroll).subscribe((data:any)=>{
      this.pastDataSource = new MatTableDataSource(data.data);
      this.pastDataSource.paginator = this.pastPaginator;
    });
  }

  //show the error hint for input part
  private getCourtErrorMessage(){
    return this.f.courtNumber.hasError('required')?'You must enter a court Number':
    'The input court must be a number';
  }

  private getTimeErrorMessage(){
    return this.f.subpoenaTime.hasError('required')?'You must enter a time for subpoena':
    'The input should be in time format like HH:MM';
  }

}
