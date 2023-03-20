import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './auth.interceptor';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserprofileComponent } from './Admin/userprofile/userprofile.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SidepanelComponent } from './Components/sidepanel/sidepanel.component';
import { HeaderComponent } from './Components/header/header.component';
import { NotificationiconsComponent } from './Components/header/notificationicons/notificationicons.component';
import { RightpanelComponent } from './Components/rightpanel/rightpanel.component';
import { BodyheaderComponent } from './Components/rightpanel/bodyheader/bodyheader.component';
import { CompdashboardComponent } from './Components/compdashboard/compdashboard.component';
import { CompanyheaderComponent } from './Company/companyheader/companyheader.component';
import { SearchComponent } from './Company/companyheader/search/search.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSortModule} from '@angular/material/sort';
import { CompanyLoginComponent } from './Components/company-login/company-login.component';
import { ResetPassComponent } from './Components/company-login/reset-pass/reset-pass.component';
import { VerifyforgetpasskeyComponent } from './Components/company-login/verifyforgetpasskey/verifyforgetpasskey.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import{MatTabsModule} from "@angular/material/tabs";
import { CompanyMainpageComponent } from './Components/newCompany/company-mainpage/company-mainpage.component';
import { DepartmentLibraryComponent } from './Components/newCompany/department-library/department-library.component';
import { ResourceTypeComponent } from './Components/newCompany/resource-type/resource-type.component';
import { WorkScheduleComponent } from './Components/newCompany/work-schedule/work-schedule.component';
import { HolidayLibraryComponent } from './Components/newCompany/holiday-library/holiday-library.component';
import { PositionLibraryComponent } from './Components/newCompany/position-library/position-library.component';
import { ConstraintLibraryComponent } from './Components/newCompany/constraint-library/constraint-library.component';
import { TradeLibraryComponent } from './Components/newCompany/trade-library/trade-library.component';
import { CreateDepartmentDialogComponent } from './Components/newCompany/department-library/create-department-dialog/create-department-dialog.component';
import { EditDeprtmentComponent } from './Components/newCompany/department-library/edit-deprtment/edit-deprtment.component';
import { CreateResourceTypeComponent } from './Components/newCompany/resource-type/create-resource-type/create-resource-type.component';
import { EditResourceTypeComponent } from './Components/newCompany/resource-type/edit-resource-type/edit-resource-type.component';
import { CreateWorkScheduleComponent } from './Components/newCompany/work-schedule/create-work-schedule/create-work-schedule.component';
import { EditWorkScheduleComponent } from './Components/newCompany/work-schedule/edit-work-schedule/edit-work-schedule.component';
import { EditworkComponent } from './Components/newCompany/work-schedule/editwork/editwork.component';
import { CreateworkComponent } from './Components/newCompany/work-schedule/creatework/creatework.component';


@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    SidepanelComponent,
    DashboardComponent,
    HeaderComponent,
    NotificationiconsComponent,
    RightpanelComponent,
    BodyheaderComponent,
    CompdashboardComponent,
    CompanyheaderComponent,
    SearchComponent,
    CompanyLoginComponent,
    ResetPassComponent,
    VerifyforgetpasskeyComponent,
    CompanyMainpageComponent,
    DepartmentLibraryComponent,
    ResourceTypeComponent,
    WorkScheduleComponent,
    HolidayLibraryComponent,
    PositionLibraryComponent,
    ConstraintLibraryComponent,
    TradeLibraryComponent,
    CreateDepartmentDialogComponent,
    EditDeprtmentComponent,
    CreateResourceTypeComponent,
    EditResourceTypeComponent,
    CreateWorkScheduleComponent,
    EditWorkScheduleComponent,
    EditworkComponent,
    CreateworkComponent
   
  ],
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    BrowserModule,
    MatTooltipModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    MatSortModule,
    MatDialogModule,MatTabsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent,NotificationiconsComponent]
})
export class AppModule { }
