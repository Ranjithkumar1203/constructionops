import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysComponent } from './holidays.component';
import { FormsModule } from '@angular/forms';


const proRoute2: Routes = [
  {path:'', component:HolidaysComponent,children:[
    
  ]},
  
  ];

@NgModule({
  declarations: [
    HolidaysComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(proRoute2)
  ],
  bootstrap: [HolidaysComponent]
})
export class HolidaysModule { }
