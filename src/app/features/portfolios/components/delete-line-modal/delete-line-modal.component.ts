import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, take } from 'rxjs/operators';

import { PortfolioLineService } from 'src/app/core/services/portfolio-line.service';
import { PortfolioLineWithCoin } from '../../../../core/models/portfolio-line-with-coin.model';

@Component({
  selector: 'app-delete-line-modal',
  templateUrl: './delete-line-modal.component.html',
  styleUrls: ['./delete-line-modal.component.scss']
})
export class DeleteLineModalComponent {
  /**
   * Portfolio line to delete.
   */
  @Input() line: PortfolioLineWithCoin | undefined;

  /**
   * Flag indicating if a portfolio line is being deleting.
   */
  public deleting = false;

  /**
   * Declares the dependencies.
   * @param activeModal - The modal active.
   * @param portfolioLineService - Portfolio line service.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private portfolioLineService: PortfolioLineService,
  ) { }

  /**
   * Deletes the portfolio line.
   * @param id - Portfolio line identifier.
   */
   deleteLine(id: number): void {
    this.deleting = true;

    this.portfolioLineService
      .deleteLine(id)
      .pipe(
        take(1),
        finalize(() => (this.deleting = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
