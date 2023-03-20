import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { UserlistComponent } from './userlist/userlist.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { AssignmnettabComponent } from './assignmnettab/assignmnettab.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AuthGuard } from 'src/app/Services/auth.guard';
import {DragDropModule} from '@angular/cdk/drag-drop';
const proRoute1: Routes = [
  {path:'tab', component:AssignmnettabComponent,canActivate: [AuthGuard]},
  {path:'task',component:TasklistComponent,canActivate: [AuthGuard]},
  {path:'project',component:ProjectlistComponent,canActivate: [AuthGuard]},
  {path:'user',component:UserlistComponent,canActivate: [AuthGuard]},
  {path:'customer',component:CustomerlistComponent,canActivate: [AuthGuard]},
  ];

@NgModule({
  declarations: [
    TasklistComponent,
    ProjectlistComponent,
    UserlistComponent,
    CustomerlistComponent,
    AssignmnettabComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    DragDropModule,
    RouterModule.forChild(proRoute1)
  ]
})
export class RightpanelModule { }
