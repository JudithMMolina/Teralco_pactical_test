import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioRequest } from '../models/portfolio-request.model';

import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  /**
   * Declares the dependencies.
   * @param http - Http client.
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets the portfolios.
   */
  public getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>('http://localhost:3000/portfolios?_embed=lines');
  }

  /**
   * Gets a portfolio.
   * @param id - Portfolio identifier.
   */
  public getPortfolio(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`http://localhost:3000/portfolios/${id}`);
  }

  /**
   * Creates a portfolio.
   * @param portfolio - Data required for creation.
   */
  public createPortfolio(portfolio: PortfolioRequest): Observable<any> {
    return this.http.post<any>('http://localhost:3000/portfolios', portfolio);
  }

  /**
   * Edits the portfolio.
   * @param id - Portfolio identifier.
   * @param portfolio - Data required for edition.
   */
  public editPortfolio(id: number, portfolio: PortfolioRequest): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/portfolios/${id}`, portfolio);
  }

  /**
   * Deletes the portfolio.
   * @param id - Portfolio identifier.
   */
  public deletePortfolio(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/portfolios/${id}`);
  }
}
