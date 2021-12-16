import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { CurrenciesListComponent } from './currencies-list/currencies-list.component';
import { CurrenciesRoutingModule } from './currencies-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteCurrencyModalComponent } from './delete-currency-modal/delete-currency-modal.component';
import { CreateCurrencyModalComponent } from './create-currency-modal/create-currency-modal.component';
import { EditCurrencyModalComponent } from './edit-currency-modal/edit-currency-modal.component';


@NgModule({
  declarations: [
    CurrenciesListComponent,
    DeleteCurrencyModalComponent,
    CreateCurrencyModalComponent,
    EditCurrencyModalComponent,
  ],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class CurrenciesModule { }
