import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';

import { PortfoliosListComponent } from './portfolios-list/portfolios-list.component';

const routes: Routes = [
  {
    path: '',
    component: PortfoliosListComponent,
  },
  {
    path: ':id',
    component: PortfolioDetailsComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfoliosRoutingModule { }
