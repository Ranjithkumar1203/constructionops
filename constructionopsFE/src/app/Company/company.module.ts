import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';


const proRoutes: Routes = [
  {
    path: '', component: CompanyComponent, children: [
      { path: 'workschedule', loadChildren: () => import('../Company/Database/workschedule/workschedule.module').then(m => m.WorkscheduleModule) },
      { path: 'workimported', loadChildren: () => import('../Company/Database/workschedule/workimported/workimported.module').then(m => m.WorkimportedModule) },
      { path: 'workcomplete', loadChildren: () => import('../Company/Database/workschedule/workcomplete/workcomplete.module').then(o => o.WorkcompleteModule) },
      { path: 'holiday', loadChildren: () => import('../Company/Database/holidays/holidays.module').then(n => n.HolidaysModule) },
      { path: 'holidaysimported', loadChildren: () => import('../Company/Database/holidays/holidaysimported/holidaysimported.module').then(n => n.HolidaysimportedModule) },
      { path: 'holidayscomplete', loadChildren: () => import('../Company/Database/holidays/holidayscomplete/holidayscomplete.module').then(n => n.HolidayscompleteModule) },
    ]
  },
];

@NgModule({
  declarations: [
    CompanyComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(proRoutes)
  ],
  bootstrap: [CompanyModule]
})
export class CompanyModule { }
