import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LinesListComponent } from './lines-list/lines-list.component';
import { LinesRoutingModule } from './lines-routing.module';


@NgModule({
  declarations: [
    LinesListComponent,
  ],
  imports: [
    CommonModule,
    LinesRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class LinesModule { }
