import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, take } from 'rxjs/operators';
import { PortfolioService } from 'src/app/core/services/portfolio.service';

@Component({
  selector: 'app-create-portfolio-modal',
  templateUrl: './create-portfolio-modal.component.html',
  styleUrls: ['./create-portfolio-modal.component.scss'],
})
export class CreatePortfolioModalComponent {
  /**
   * Creation form.
   */
  public portfolioForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  /**
   * Flag indicating if a portfolio is being creating.
   */
  public creating = false;

  /**
   * Declares the dependencies.
   * @param activeModal - ng-bootstrap active modal.
   * @param formBuilder - Form builder.
   * @param portfolioService - Portfolio service.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
  ) {
  }

  /**
   * Creates a portfolio.
   * @param formValues - Form values.
   */
  createPortfolio(formValues: any) {
    this.creating = true;

    this.portfolioService
      .createPorfolio(formValues)
      .pipe(
        take(1),
        finalize(() => (this.creating = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
