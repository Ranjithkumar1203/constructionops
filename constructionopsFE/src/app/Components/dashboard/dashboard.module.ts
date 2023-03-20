import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
const proRoute1: Routes = [
  {path:'dashboard', component:DashboardComponent},
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(proRoute1)
  ]
})
export class DashboardModule { }
