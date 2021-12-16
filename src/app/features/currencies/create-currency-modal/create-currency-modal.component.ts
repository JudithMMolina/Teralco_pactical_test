import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, take } from 'rxjs/operators';

import { CurrencyService } from 'src/app/core/services/currency.service';
import { validAcronym } from '../utils/valid-acronym.validator';

@Component({
  selector: 'app-create-currency-modal',
  templateUrl: './create-currency-modal.component.html',
  styleUrls: ['./create-currency-modal.component.scss'],
})
export class CreateCurrencyModalComponent implements OnInit {
  /**
   * Possible currencies.
   */
  public possibleCurrencies: string[] | undefined;

  /**
   * Creation form.
   */
  public currencyForm: FormGroup | undefined;

  /**
   * Flag indicating if a currency is being creating.
   */
  public creating;

  /**
   * Declares the dependencies.
   * @param activeModal - Active modal.
   * @param currencyService - Currency service.
   * @param formBuilder - Form builder.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {
    this.creating = false;
  }

  ngOnInit(): void {
    this.currencyService
      .getPossibleCurrencies()
      .pipe(map((response: any) => response.Data))
      .subscribe((currencies: any) => {
        this.possibleCurrencies = Object.keys(currencies);

        this.currencyForm = this.formBuilder.group({
          acronym: ['', [Validators.required, validAcronym(this.possibleCurrencies)]],
          name: ['', Validators.required],
        });
      });
  }

  /**
   * Creates a currency.
   * @param formValues - Form values.
   */
  createCurrency(formValues: any): void {
    this.creating = true;

    this.currencyService
      .createCurrency(formValues)
      .pipe(
        take(1),
        finalize(() => (this.creating = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
