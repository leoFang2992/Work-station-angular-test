import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { SubpoenaComponent } from './subpoena/subpoena.component';
import { OfficerlistComponent } from './officerlist/officerlist.component';
import { PmdComponent } from './pmd/pmd.component';
import { DisclosureAdminComponent } from './disclosure/disclosure-admin/disclosure-admin.component';
import { DisclosureUserComponent } from './disclosure/disclosure-user/disclosure-user.component';

const routes: Routes = [
  { path:'', component: HomeComponent, canActivate:[AuthGuard] },
  { path:'login', component: LoginComponent },
  { path:'subpoena', component: SubpoenaComponent, canActivate:[AuthGuard] },
  { path:'officer', component: OfficerlistComponent, canActivate:[AuthGuard] },
  { path:'pmd', component: PmdComponent, canActivate:[AuthGuard] },
  { path:'disclosureAdmin', component: DisclosureAdminComponent, canActivate:[AuthGuard]  },
  { path:'disclosureUser', component: DisclosureUserComponent, canActivate:[AuthGuard]  },
  //otherwise redirect to home
  { path:'**', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
