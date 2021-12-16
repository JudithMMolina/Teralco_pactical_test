import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, map, take } from 'rxjs/operators';
import { Currency } from 'src/app/core/models/currency.model';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { validAcronym } from '../utils/valid-acronym.validator';

@Component({
  selector: 'app-edit-currency-modal',
  templateUrl: './edit-currency-modal.component.html',
  styleUrls: ['./edit-currency-modal.component.scss']
})
export class EditCurrencyModalComponent implements OnInit {
  /**
   * Possible currencies.
   */
  public possibleCurrencies: string[] | undefined;

  /**
   * Edition form.
   */
  public currencyForm: FormGroup | undefined;

  /**
   * Currency to edit.
   */
  @Input() currency: Currency | undefined;

  /**
   * Flag indicating if a currency is being editing.
   */
  public editing = false;

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
  ) { }

  ngOnInit(): void {
    this.currencyService
      .getPossibleCurrencies()
      .pipe(map((response: any) => response.Data))
      .subscribe((currencies: any) => {
        this.possibleCurrencies = Object.keys(currencies);

        this.currencyForm = this.formBuilder.group({
          acronym: [this.currency?.acronym, [Validators.required, validAcronym(this.possibleCurrencies)]],
          name: [this.currency?.name, Validators.required],
        });        
      });
  }

  /**
   * Edits the currency.
   * @param id - Currency identifier.
   * @param formValues - Form values.
   */
  editCurrency(id: number, formValues: any): void {
    this.editing = true;

    this.currencyService
      .editCurrency(id, formValues)
      .pipe(
        take(1),
        finalize(() => (this.editing = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
