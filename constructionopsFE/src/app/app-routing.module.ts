import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsloginGuard } from './auth/islogin.guard';
import { LoginGuard } from './auth/login.guard';
import { CompanyLoginComponent } from './Components/company-login/company-login.component';
import { ResetPassComponent } from './Components/company-login/reset-pass/reset-pass.component';
import { VerifyforgetpasskeyComponent } from './Components/company-login/verifyforgetpasskey/verifyforgetpasskey.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CompanyMainpageComponent } from './Components/newCompany/company-mainpage/company-mainpage.component';
import { DepartmentLibraryComponent } from './Components/newCompany/department-library/department-library.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full'},
  // { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {path:'login', component: CompanyLoginComponent,canActivate: [LoginGuard]},
  {path:'resetpassword', component: ResetPassComponent},
  {path:'forgotpassword/:key', component: VerifyforgetpasskeyComponent},
  {path: 'newcompany', component: CompanyMainpageComponent},
  {path: 'company/department', component: DepartmentLibraryComponent},

  
  {
    path: 'home', component: DashboardComponent, canActivate: [AuthGuard, IsloginGuard], children: [
      { path: '', loadChildren: () => import('./Components/rightpanel/rightpanel.module').then(a => a.RightpanelModule) },
      
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
