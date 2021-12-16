import { Component, OnInit } from '@angular/core';
import { noop, Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CurrencyService } from 'src/app/core/services/currency.service';
import { Currency } from 'src/app/core/models/currency.model';

import { DeleteCurrencyModalComponent } from '../delete-currency-modal/delete-currency-modal.component';
import { CreateCurrencyModalComponent } from '../create-currency-modal/create-currency-modal.component';
import { EditCurrencyModalComponent } from '../edit-currency-modal/edit-currency-modal.component';

@Component({
  selector: 'app-currencies-list',
  templateUrl: './currencies-list.component.html',
  styleUrls: ['./currencies-list.component.scss'],
})
export class CurrenciesListComponent implements OnInit {
  /**
   * List of currencies.
   */
  public currencies$: Observable<Currency[]> | undefined;

  /**
   * The actions dispatcher.
   */
  actions: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * The actions observable.
   */
  actions$ = this.actions.asObservable();


  /**
   * Declares the dependencies.
   */
  constructor(
    private currencyService: CurrencyService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.currencies$ = this.actions$.pipe(
      switchMap(() => this.currencyService.getCurrencies())
    );

    this.actions.next(true);
  }

  /**
   * Creates a currency in a modal.
   */
  createCurrency() {
    const createCurrencyModalRef = this.modalService.open(CreateCurrencyModalComponent, {
      centered: true,
    });

    createCurrencyModalRef.result.then(() => {
      this.actions.next(true);
    }, noop);
  }

  /**
   * Confirms and deletes a currency.
   * @param currency - Currency to delete.
   */
  deleteCurrency(currency: Currency): void {
    const deleteModalRef = this.modalService.open(
      DeleteCurrencyModalComponent,
      { centered: true }
    );

    deleteModalRef.componentInstance.currency = currency;

    deleteModalRef.result.then(() => {
        this.actions.next(true);
    }, noop);
  }

  /**
   * Creates a currency in a modal.
   */
  editCurrency(currency: Currency) {
    const editCurrencyModalRef = this.modalService.open(EditCurrencyModalComponent, {
      centered: true,
    });

    editCurrencyModalRef.componentInstance.currency = currency;

    editCurrencyModalRef.result.then(() => {
      this.actions.next(true);
    }, noop);
  }
}
