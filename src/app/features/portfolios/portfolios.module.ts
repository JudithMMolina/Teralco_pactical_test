import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { PortfoliosListComponent } from './portfolios-list/portfolios-list.component';
import { PortfoliosRoutingModule } from './portfolios-routing.module';
import { CreatePortfolioComponent } from './create-portfolio-modal/create-portfolio-modal.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';
import { DeletePortfolioModalComponent } from './delete-portfolio-modal/delete-portfolio-modal.component';
import { EditPortfolioModalComponent } from './edit-portfolio-modal/edit-portfolio-modal.component';


@NgModule({
  declarations: [
    PortfoliosListComponent,
    CreatePortfolioComponent,
    PortfolioDetailsComponent,
    DeletePortfolioModalComponent,
    EditPortfolioModalComponent,
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
