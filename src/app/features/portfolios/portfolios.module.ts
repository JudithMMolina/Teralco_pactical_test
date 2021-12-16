import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { PortfoliosListComponent } from './portfolios-list/portfolios-list.component';
import { PortfoliosRoutingModule } from './portfolios-routing.module';
import { CreatePortfolioModalComponent } from './components/create-portfolio-modal/create-portfolio-modal.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';
import { DeletePortfolioModalComponent } from './components/delete-portfolio-modal/delete-portfolio-modal.component';
import { EditPortfolioModalComponent } from './components/edit-portfolio-modal/edit-portfolio-modal.component';
import { CreateLineModalComponent } from './components/create-line-modal/create-line-modal.component';
import { EditLineModalComponent } from './components/edit-line-modal/edit-line-modal.component';
import { DeleteLineModalComponent } from './components/delete-line-modal/delete-line-modal.component';


@NgModule({
  declarations: [
    PortfoliosListComponent,
    CreatePortfolioModalComponent,
    PortfolioDetailsComponent,
    DeletePortfolioModalComponent,
    EditPortfolioModalComponent,
    CreateLineModalComponent,
    EditLineModalComponent,
    DeleteLineModalComponent,
  ],
  imports: [
    CommonModule,
    PortfoliosRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class PortfoliosModule { }
