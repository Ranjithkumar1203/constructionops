import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorkcompleteComponent } from './workcomplete.component';
import { FormsModule } from '@angular/forms';
import { WorkfooterComponent } from './workfooter/workfooter.component';
import { WorkaddComponent } from './workadd/workadd.component';
import { WorkcreateComponent } from './workcreate/workcreate.component';

const proRoute4: Routes = [
  {path:'', component:WorkcompleteComponent,children:[
  ]
}
  ];


@NgModule({
  declarations: [
    WorkcompleteComponent,
    WorkfooterComponent,
    WorkaddComponent,
    WorkcreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(proRoute4)
  ]
})
export class WorkcompleteModule { }
