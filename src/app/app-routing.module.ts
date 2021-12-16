import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'portfolios',
    loadChildren: () => import('./features/portfolios/portfolios.module').then(m => m.PortfoliosModule),
  },
  {
    path: 'portfolio-lines',
    loadChildren: () => import('./features/lines/lines.module').then(m => m.LinesModule),
  },
  {
    path: 'currencies',
    loadChildren: () => import('./features/currencies/currencies.module').then(m => m.CurrenciesModule),
  },
  { path: '', redirectTo: 'portfolios', pathMatch: 'full' },
  { path: '**', redirectTo: 'portfolios' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
