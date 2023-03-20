import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkimportedComponent } from './workimported.component';
import { RouterModule, Routes } from '@angular/router';
import { WorkfooterComponent } from './workfooter/workfooter.component';
import { authInterceptorProviders } from 'src/app/auth.interceptor';
import { WorkaddComponent } from './workadd/workadd.component';
import { FormsModule } from '@angular/forms';
import { WorkcreateComponent } from './workcreate/workcreate.component';

const proRoute3: Routes = [
  {path:'', component:WorkimportedComponent,children:[
  ]
}
  ];


@NgModule({
  declarations: [
    WorkimportedComponent,
    WorkfooterComponent,
    WorkaddComponent,
    WorkcreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(proRoute3)
  ]
})
export class WorkimportedModule { }
