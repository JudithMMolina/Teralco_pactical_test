import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrenciesListComponent } from './currencies-list/currencies-list.component';

const routes: Routes = [
  {
    path: '',
    component: CurrenciesListComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
