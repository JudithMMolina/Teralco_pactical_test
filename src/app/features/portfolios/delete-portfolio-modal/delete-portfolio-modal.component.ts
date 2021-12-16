import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, take } from 'rxjs/operators';
import { Portfolio } from 'src/app/core/models/portfolio.model';
import { PortfolioService } from 'src/app/core/services/portfolio.service';

@Component({
  selector: 'app-delete-portfolio-modal',
  templateUrl: './delete-portfolio-modal.component.html',
  styleUrls: ['./delete-portfolio-modal.component.scss']
})
export class DeletePortfolioModalComponent {
  /**
   * Portfolio to delete.
   */
  @Input() portfolio: Portfolio | undefined;

  /**
   * Flag indicating if a portfolio is being deleting.
   */
  public deleting;

  /**
   * Declares the dependencies.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private portfolioService: PortfolioService
  ) {
    this.deleting = false;
  }

  /**
   * Deletes a currency.
   * @param id - Identifier.
   */
  deleteCurrency(id: number): void {
    this.deleting = true;

    this.portfolioService
      .deletePorfolio(id)
      .pipe(
        take(1),
        finalize(() => (this.deleting = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
