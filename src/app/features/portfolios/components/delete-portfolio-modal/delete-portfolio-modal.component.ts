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
  public deleting = false;

  /**
   * Declares the dependencies.
   * @param activeModal - The active modal.
   * @param - Portfolio service.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private portfolioService: PortfolioService
  ) { }

  /**
   * Deletes the portfolio.
   * @param id - Portfolio identifier.
   */
   deletePortfolio(id: number): void {
    this.deleting = true;

    this.portfolioService
      .deletePortfolio(id)
      .pipe(
        take(1),
        finalize(() => (this.deleting = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
