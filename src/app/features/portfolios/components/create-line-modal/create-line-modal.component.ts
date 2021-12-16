import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { PortfolioLineRequest } from 'src/app/core/models/portfolio-line-request.model';

import { Currency } from 'src/app/core/models/currency.model';
import { Portfolio } from 'src/app/core/models/portfolio.model';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { PortfolioLineService } from 'src/app/core/services/portfolio-line.service';

@Component({
  selector: 'app-create-line-modal',
  templateUrl: './create-line-modal.component.html',
  styleUrls: ['./create-line-modal.component.scss'],
})
export class CreateLineModalComponent implements OnInit {
  /**
   * Portfolio to which the line is to be created.
   */
  @Input() portfolio: Portfolio | undefined;

  /**
   * Posible currencies.
   */
  public currencies$: Observable<Currency[]> | undefined;

  /**
   * Creation line form.
   */
  public lineForm = this.formBuilder.group({
    currency: ['', Validators.required],
    amount: ['', [Validators.required]],
  });

  /**
   * Flag indicating if a portfolio is being creating.
   */
  public creating = false;

  /**
   * Declares the dependencies.
   * @param activeModal - ng-bootstrap active modal.
   * @param currencyService - Currency service.
   * @param formBuilder - Form builder.
   * @param portfolioLineService - Portfolio service.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder,
    private portfolioLineService: PortfolioLineService
  ) {}

  ngOnInit(): void {
    this.currencies$ = this.currencyService.getCurrencies();
  }

  /**
   * Creates a portfolio.
   * @param portfolioId - Portfolio identifier.
   * @param formValues - Form values.
   */
  createLine(portfolioId: number, formValues: any) {
    this.creating = true;

    const line: PortfolioLineRequest = {
      portfolioId,
      coinId: formValues.currency,
      amount: formValues.amount,
    };

    this.portfolioLineService
      .createLine(portfolioId, line)
      .pipe(
        take(1),
        finalize(() => (this.creating = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
