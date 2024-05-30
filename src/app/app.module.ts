import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { JwtInterceptor } from './_share/jwt';
import { ErrorInterceptor } from './_share/error';
// import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { SubpoenaComponent } from './subpoena/subpoena.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { OfficerlistComponent } from './officerlist/officerlist.component';
import { LayoutComponent } from './_layout/layout/layout.component';
import { HeaderComponent } from './_layout/header/header.component';
import { SidenavListComponent } from './_layout/sidenav-list/sidenav-list.component';
import { OfficerPipe } from './officerlist/officer.pipe';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { FileUploadModule } from 'ng2-file-upload';

import { QuicksearchComponent } from './subpoena/_dialog/quicksearch/quicksearch.component';
import { DcsearchComponent } from './subpoena/_dialog/dcsearch/dcsearch.component';
import { OfficerSearchComponent } from './subpoena/_dialog/officer-search/officer-search.component';
import { DcCreateComponent } from './subpoena/_dialog/dc-create/dc-create.component';
import { DialogAlertComponent } from './alert/dialog-alert/dialog-alert.component';
import { SubmitComfirmationComponent } from './subpoena/_dialog/submit-comfirmation/submit-comfirmation.component';
import { PmdComponent } from './pmd/pmd.component';
import { DiscussDetailComponent } from './pmd/_dialog/discuss-detail/discuss-detail.component';
import { ReviewDetailComponent } from './pmd/_dialog/review-detail/review-detail.component';
import { DisclosureAdminComponent } from './disclosure/disclosure-admin/disclosure-admin.component';
import { DisclosureUserComponent } from './disclosure/disclosure-user/disclosure-user.component';
import { DisclosureDetailComponent } from './disclosure/_dialog/disclosure-detail/disclosure-detail.component';
import { DisclosureEditComponent } from './disclosure/_dialog/disclosure-edit/disclosure-edit.component';
import { DisclosureAddComponent } from './disclosure/_dialog/disclosure-add/disclosure-add.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { DisclosureDeleteComponent } from './disclosure/_dialog/disclosure-delete/disclosure-delete.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SubpoenaComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    OfficerlistComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    OfficerPipe,
    QuicksearchComponent,
    DcsearchComponent,
    OfficerSearchComponent,
    DcCreateComponent,
    DialogAlertComponent,
    SubmitComfirmationComponent,
    PmdComponent,
    DiscussDetailComponent,
    ReviewDetailComponent,
    DisclosureAdminComponent,
    DisclosureUserComponent,
    DisclosureDetailComponent,
    DisclosureEditComponent,
    DisclosureAddComponent,
    FooterComponent,
    DisclosureDeleteComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AmazingTimePickerModule,
    FileUploadModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    QuicksearchComponent,
    DcsearchComponent,
    OfficerSearchComponent,
    DcCreateComponent,
    SubmitComfirmationComponent,
    DiscussDetailComponent,
    ReviewDetailComponent,
    DisclosureDetailComponent,
    DisclosureEditComponent,
    DisclosureAddComponent,
    DisclosureDeleteComponent
  ]
})
export class AppModule { }
