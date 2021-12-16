import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, noop, Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Portfolio } from 'src/app/core/models/portfolio.model';
import { PortfolioLineService } from 'src/app/core/services/portfolio-line.service';
import { PortfolioService } from 'src/app/core/services/portfolio.service';
import { CreateLineModalComponent } from '../components/create-line-modal/create-line-modal.component';
import { DeleteLineModalComponent } from '../components/delete-line-modal/delete-line-modal.component';
import { EditLineModalComponent } from '../components/edit-line-modal/edit-line-modal.component';
import { PortfolioLine } from '../models/portfolio-lines.model';

export interface ViewModel {
  portfolio: Portfolio;
  lines: PortfolioLine[];
}

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss'],
})
export class PortfolioDetailsComponent implements OnInit {
  /**
   * Portfolio details data.
   */
  public viewModel$: Observable<ViewModel> | undefined;

  /**
   * The actions dispatcher.
   */
  private actions: ReplaySubject<number> = new ReplaySubject<number>(1);

  /**
   * The actions observable.
   */
  private actions$ = this.actions.asObservable();

  /**
   * Declares the dependencies.
   * @param activatedRoute - Activated route.
   * @param modalService - ng-bootstrap modal service.
   * @param portfolioService - Portfolio line service.
   * @param portfolioLineService - Portfolio service.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private portfolioService: PortfolioService,
    private portfolioLineService: PortfolioLineService
  ) {}

  ngOnInit(): void {
    const portfolioId = this.activatedRoute.snapshot.params?.id;

    if (portfolioId) {
      this.getViewModel();
      this.actions.next(portfolioId);
    }
  }

  /**
   * Gets the portfolio information.
   */
  getViewModel() {
    this.viewModel$ = this.actions$.pipe(
      switchMap((portfolioId: number) => {
        return forkJoin([
          this.portfolioService.getPortfolio(portfolioId),
          this.portfolioLineService.getPortfolioLines(portfolioId),
        ]);
      }),
      map(([portfolio, lines]) => {
        return <ViewModel>{
          portfolio,
          lines,
        };
      })
    );
  }

  /**
   * Creates a line.
   * @param portfolio - Portfolio to which a line is to be added
   */
  createLine(portfolio: Portfolio): void {
    const createLineModalRef = this.modalService.open(
      CreateLineModalComponent,
      {
        centered: true,
      }
    );

    createLineModalRef.componentInstance.portfolio = portfolio;

    createLineModalRef.result.then(() => {
      this.actions.next(portfolio.id);
    }, noop);
  }

  /**
   * Edits the line.
   * @param portfolio - Portfolio to which the line belongs.
   * @param line - Portfolio line to edit.
   */
  editLine(portfolio: Portfolio, line: PortfolioLine) {
    const editLineModalRef = this.modalService.open(
      EditLineModalComponent,
      {
        centered: true,
      }
    );

    editLineModalRef.componentInstance.line = line;

    editLineModalRef.result.then(() => {
      this.actions.next(portfolio.id);
    }, noop);
  }

  /**
   * Confirms and deletes the portfolio line.
   * @param portfolio - Portfolio to which the line belongs.
   * @param line - The line to delete.
   */
  deleteLine(portfolio: Portfolio, line: PortfolioLine): void {
    const deleteLineModalRef = this.modalService.open(
      DeleteLineModalComponent,
      {
        centered: true,
      }
    );

    deleteLineModalRef.componentInstance.line = line;

    deleteLineModalRef.result.then(() => {
      this.actions.next(portfolio.id);
    }, noop);
  }
}
