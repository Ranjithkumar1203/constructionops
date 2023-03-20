import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysimportedComponent } from './holidaysimported.component';
import { HolidaysfooterComponent } from './holidaysfooter/holidaysfooter.component';
import { HolidaysaddComponent } from './holidaysadd/holidaysadd.component';
import { HolidayscreateComponent } from './holidayscreate/holidayscreate.component';
import { FormsModule } from '@angular/forms';

const proRoute4: Routes = [
  {path:'', component:HolidaysimportedComponent,children:[
  ]
}
  ];

@NgModule({
  declarations: [
    HolidaysimportedComponent,
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
export class HolidaysimportedModule { }
