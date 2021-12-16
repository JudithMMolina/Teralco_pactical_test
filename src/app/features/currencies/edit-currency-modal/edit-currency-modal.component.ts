import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, take } from 'rxjs/operators';
import { Currency } from 'src/app/core/models/currency.model';
import { CurrencyService } from 'src/app/core/services/currency.service';

@Component({
  selector: 'app-edit-currency-modal',
  templateUrl: './edit-currency-modal.component.html',
  styleUrls: ['./edit-currency-modal.component.scss']
})
export class EditCurrencyModalComponent implements OnInit {
  /**
   * Edition form.
   */
  public currencyForm = this.formBuilder.group({
    acronym: ['', Validators.required],
    name: ['', Validators.required],
  });

  /**
   * Currency to edit.
   */
  @Input() currency: Currency | undefined;

  /**
   * Flag indicating if a currency is being editing.
   */
  public editing = false;

  constructor(
    public activeModal: NgbActiveModal,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currencyForm.setValue({
      acronym: this.currency?.acronym,
      name: this.currency?.name,
    });
  }

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
