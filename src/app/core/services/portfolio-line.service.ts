import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PortfolioLine } from 'src/app/features/portfolios/models/portfolio-lines.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioLineService {
  /**
   * Declares the dependencies.
   * @param http - Http client.
   */
  constructor(private http: HttpClient) { }

  public getPorfolioLines(id: number): Observable<PortfolioLine[]> {
    return this.http.get<PortfolioLine[]>(`http://localhost:3000/portfolios/${id}/lines?_expand=coin`);
  }

  public editPorfolio(id: number, portfolio: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/portfolios/${id}`, portfolio);
  }

  public createLine(portfolioId: number, line: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/portfolios/${portfolioId}/lines`, line);
  }

  public editLine(lineId: number, line: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/lines/${lineId}`, line);
  }

  public deleteLine(lineId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/lines/${lineId}`);
  }
}
