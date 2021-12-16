import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Portfolio } from 'src/app/core/models/portfolio.model';
import { PortfolioService } from 'src/app/core/services/portfolio.service';
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
  public portfolioId: number | undefined;

  /**
   * Portfolio details data.
   */
  public viewModel$: Observable<ViewModel> | undefined;

  /**
   * Creation line form.
   */
  public lineForm = this.formBuilder.group({
    currency: ['', Validators.required],
    amount: ['', Validators.required, Validators.min(0.01)],
  });

  public creating = false;

  /**
   * Declares the dependencies.
   * @param activatedRoute - Activated route.
   * @param portfolioService - Portfolio service.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.portfolioId = this.activatedRoute.snapshot.params?.id;

    if (this.portfolioId) {
      this.getPortfolio(this.portfolioId);
    }
  }

  /**
   * Gets the portfolio information.
   * @param id - Portfolio identifier.
   */
  getPortfolio(id: number) {
    this.viewModel$ = forkJoin([
      this.portfolioService.getPorfolio(id),
      this.portfolioService.getPorfolioLines(id),
    ]).pipe(
      map(([portfolio, lines]) => {
        return <ViewModel>{
          portfolio,
          lines,
        };
      })
    );

    this.viewModel$.subscribe(console.log);
  }

  createLine(): void {}
}
