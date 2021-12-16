import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { noop, Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Portfolio } from 'src/app/core/models/portfolio.model';
import { PortfolioService } from 'src/app/core/services/portfolio.service';
import { CreatePortfolioModalComponent } from '../components/create-portfolio-modal/create-portfolio-modal.component';
import { DeletePortfolioModalComponent } from '../components/delete-portfolio-modal/delete-portfolio-modal.component';
import { EditPortfolioModalComponent } from '../components/edit-portfolio-modal/edit-portfolio-modal.component';

@Component({
  selector: 'app-portfolios-list',
  templateUrl: './portfolios-list.component.html',
  styleUrls: ['./portfolios-list.component.scss']
})
export class PortfoliosListComponent implements OnInit {
  /**
   * List of portfolios.
   */
  public portfolios$: Observable<Portfolio[]> | undefined;

  /**
   * The actions dispatcher.
   */
  actions: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * The actions observable.
   */
  actions$ = this.actions.asObservable();

  /**
   * Declares the dependencies.
   */
  constructor(private modalService: NgbModal, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolios$ = this.actions$.pipe(
      switchMap(() => this.portfolioService.getPorfolios()),
    );

    this.actions.next(true);
  }

  /**
   * Creates a portfolio in a modal.
   */
  createPortfolio() {
    const createPortfolioModalRef = this.modalService.open(CreatePortfolioModalComponent, {
      centered: true,
    });

    createPortfolioModalRef.result.then(() => {
      this.actions.next(true);
    }, noop);
  }

  /**
   * Confirms and deletes a currency.
   * @param portfolio - Portfolio to delete.
   */
  deletePortfolio(portfolio: Portfolio) {
    const deleteModalRef = this.modalService.open(
      DeletePortfolioModalComponent,
      { centered: true }
    );

    deleteModalRef.componentInstance.portfolio = portfolio;

    deleteModalRef.result.then(() => {
        this.actions.next(true);
    }, noop);
  }

  /**
   * Edits a portfolio in a modal.
   * @param portfolio - Portfolio to edit.
   */
  editPortfolio(portfolio: Portfolio): void {
    const editPortfolioModalRef = this.modalService.open(EditPortfolioModalComponent, {
      centered: true,
    });

    editPortfolioModalRef.componentInstance.portfolio = portfolio;

    editPortfolioModalRef.result.then(() => {
      this.actions.next(true);
    }, noop);
  }
}
