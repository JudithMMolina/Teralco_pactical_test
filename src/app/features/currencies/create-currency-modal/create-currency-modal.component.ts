import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, take } from 'rxjs/operators';
import { CurrencyService } from 'src/app/core/services/currency.service';

@Component({
  selector: 'app-create-currency-modal',
  templateUrl: './create-currency-modal.component.html',
  styleUrls: ['./create-currency-modal.component.scss'],
})
export class CreateCurrencyModalComponent {
  /**
   * Creation form.
   */
  public currencyForm = this.formBuilder.group({
    acronym: ['', Validators.required],
    name: ['', Validators.required],
  });

  /**
   * Flag indicating if a currency is being creating.
   */
  public creating;

  constructor(
    public activeModal: NgbActiveModal,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {
    this.creating = false;
  }

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
