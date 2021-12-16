import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, take } from 'rxjs/operators';
import { Portfolio } from 'src/app/core/models/portfolio.model';
import { PortfolioService } from 'src/app/core/services/portfolio.service';

@Component({
  selector: 'app-edit-portfolio-modal',
  templateUrl: './edit-portfolio-modal.component.html',
  styleUrls: ['./edit-portfolio-modal.component.scss']
})
export class EditPortfolioModalComponent implements OnInit {
  /**
   * Portfolio form.
   */
  public portfolioForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  /**
   * Currency to edit.
   */
  @Input() portfolio: Portfolio | undefined;

  /**
   * Flag indicating if a portfolio is being creating.
   */
  public editing = false;

  /**
   * Declares the dependencies.
   * @param activeModal - ng-bootstrap active modal.
   * @param portfolioService - Portfolio service.
   * @param formBuilder - Form builder.
   */
  constructor(
    public activeModal: NgbActiveModal,
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.portfolioForm.setValue({
      name: this.portfolio?.name,
    });
  }

  /**
   * Edits the porfolio.
   * @param id - Portfolio identifier.
   * @param formValues - Form values.
   */
  editPortfolio(id: number, formValues: any): void {
    this.editing = true;

    this.portfolioService
      .editPortfolio(id, formValues)
      .pipe(
        take(1),
        finalize(() => (this.editing = false))
      )
      .subscribe(() => {
        this.activeModal.close();
      });
  }
}
