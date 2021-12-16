import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, take } from 'rxjs/operators';
import { Currency } from 'src/app/core/models/currency.model';
import { CurrencyService } from 'src/app/core/services/currency.service';

@Component({
  selector: 'app-delete-currency-modal',
  templateUrl: './delete-currency-modal.component.html',
  styleUrls: ['./delete-currency-modal.component.scss'],
})
export class DeleteCurrencyModalComponent {
  /**
   * Currency to delete.
   */
  @Input() currency: Currency | undefined;

  /**
   * Flag indicating if a currency is being deleting.
   */
  public deleting = false;

  /**
   * Declares the dependencies.
   * @param activeModal - The active modal.
   * @param currencyService - Currency service.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private currencyService: CurrencyService
  ) { }

  /**
   * Deletes the currency.
   * @param id - Currency identifier.
   */
  deleteCurrency(id: number): void {
    this.deleting = true;

    this.currencyService
      .deleteCurrency(id)
      .pipe(
        take(1),
        finalize(() => (this.deleting = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
