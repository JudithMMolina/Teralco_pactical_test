import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinesListComponent } from './lines-list/lines-list.component';

const routes: Routes = [
  {
    path: '',
    component: LinesListComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
