import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioLine } from 'src/app/features/portfolios/models/portfolio-lines.model';

import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  public getPorfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>('http://localhost:3000/portfolios?_embed=lines');
  }

  public getPorfolio(id: number): Observable<Portfolio> {
    return this.http.get<Portfolio>(`http://localhost:3000/portfolios/${id}`);
  }

  public getPorfolioLines(id: number): Observable<PortfolioLine[]> {
    return this.http.get<PortfolioLine[]>(`http://localhost:3000/portfolios/${id}/lines?_expand=coin`);
  }

  public createPorfolio(portfolio: Portfolio): Observable<any> {
    return this.http.post<any>('http://localhost:3000/portfolios', portfolio);
  }

  public deletePorfolio(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/portfolios/${id}`);
  }

  public editPorfolio(id: number, portfolio: Portfolio): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/portfolios/${id}`, portfolio);
  }
}
