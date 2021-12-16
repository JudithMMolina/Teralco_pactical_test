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

  /**
   * Gets the lines of a portfolio.
   * @param id - Portfolio identifier.
   */
  public getPortfolioLines(id: number): Observable<PortfolioLine[]> {
    return this.http.get<PortfolioLine[]>(`http://localhost:3000/portfolios/${id}/lines?_expand=coin`);
  }

  /**
   * Creates a line portfolio.
   * @param portfolioId - Portfolio identifier for which the line is to be created.
   * @param line - Data required for creation.
   * @returns 
   */
  public createLine(portfolioId: number, line: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/portfolios/${portfolioId}/lines`, line);
  }

  /**
   * Edits the portfolio line.
   * @param lineId - Portfolio line identifier.
   * @param line - Data required for edition.
   * @returns 
   */
  public editLine(lineId: number, line: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/lines/${lineId}`, line);
  }

  /**
   * Deletes the portfolio line.
   * @param lineId - Portfolio line identifier.
   */
  public deleteLine(lineId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/lines/${lineId}`);
  }
}
