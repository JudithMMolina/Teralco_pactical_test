import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { Currency } from 'src/app/core/models/currency.model';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { PortfolioLineService } from 'src/app/core/services/portfolio-line.service';
import { PortfolioLine } from '../../models/portfolio-lines.model';

@Component({
  selector: 'app-edit-portfolio-modal',
  templateUrl: './edit-line-modal.component.html',
  styleUrls: ['./edit-line-modal.component.scss']
})
export class EditLineModalComponent implements OnInit {
  /**
   * Currency to edit.
   */
  @Input() line: PortfolioLine | undefined;

  /**
   * Posible currencies.
   */
  public currencies$: Observable<Currency[]> | undefined;

  /**
   * Edit form.
   */
  public lineForm = this.formBuilder.group({
    currency: ['', Validators.required],
    amount: ['', [Validators.required]],
  });

  /**
   * Flag indicating if a portfolio is being creating.
   */
  public editing = false;

  /**
   * Declares the dependencies.
   * @param activeModal - ng-bootstrap active modal.
   * @param currencyService - Currency service.
   * @param portfolioLineService - Portfolio line service.
   * @param formBuilder - Form builder.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private currencyService: CurrencyService,
    private portfolioLineService: PortfolioLineService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currencies$ = this.currencyService.getCurrencies();

    this.lineForm.setValue({
      currency: this.line?.coinId,
      amount: this.line?.amount,
    });
  }

  /**
   * Edits the porfolio.
   * @param id - Portfolio identifier.
   * @param formValues - Form values.
   */
  editLine(portfolioId: number, lineId: number, formValues: any): void {
    this.editing = true;
    const line = {
      portfolioId,
      coinId: formValues.currency,
      amount: formValues.amount,
    }

    this.portfolioLineService
      .editLine(lineId, line)
      .pipe(
        take(1),
        finalize(() => (this.editing = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
