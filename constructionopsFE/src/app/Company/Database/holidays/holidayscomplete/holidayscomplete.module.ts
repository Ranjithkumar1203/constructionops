import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayscompleteComponent } from './holidayscomplete.component';
import { HolidaysfooterComponent } from './holidaysfooter/holidaysfooter.component';
import { HolidaysaddComponent } from './holidaysadd/holidaysadd.component';
import { HolidayscreateComponent } from './holidayscreate/holidayscreate.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const proRoute4: Routes = [
  {path:'', component:HolidayscompleteComponent,children:[
  ]
}
  ];

@NgModule({
  declarations: [
    HolidayscompleteComponent,
    HolidaysfooterComponent,
    HolidaysaddComponent,
    HolidayscreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(proRoute4)
  ]
})
export class HolidayscompleteModule { }
