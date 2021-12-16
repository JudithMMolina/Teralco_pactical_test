import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public getPorfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>('http://localhost:3000/portfolios?_embed=lines');
  }

  public getPorfolio(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`http://localhost:3000/portfolios/${id}`);
  }

  public createPorfolio(portfolio: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/portfolios', portfolio);
  }

  public deletePorfolio(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/portfolios/${id}`);
  }

  public editPorfolio(id: number, portfolio: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/portfolios/${id}`, portfolio);
  }
}
