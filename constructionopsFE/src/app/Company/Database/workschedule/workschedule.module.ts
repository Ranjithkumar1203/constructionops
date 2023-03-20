import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkscheduleComponent } from './workschedule.component';
import { FormsModule } from '@angular/forms';


const proRoute1: Routes = [
  {path:'', component:WorkscheduleComponent,children:[
    
  ]
}
  ];

@NgModule({
  declarations: [
    WorkscheduleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(proRoute1)
  ],
  bootstrap: [WorkscheduleComponent]
})
export class WorkscheduleModule { }
