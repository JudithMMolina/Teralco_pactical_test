import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  /**
   * Gets the existing currencies.
   */
  public getPossibleCurrencies(): Observable<any> {
    return this.http.get<any>('https://min-api.cryptocompare.com/data/all/coinlist');
  }

  /**
   * Gets the currencies.
   */
  public getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>('http://localhost:3000/coins');
  }

  /**
   * Creates a currency.
   * @param currency - Data required for creation.
   * @returns 
   */
  public createCurrency(currency: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/coins', currency);
  }

  /**
   * Edits the currency.
   * @param id - Currency identifier.
   * @param currency - Data required for edition.
   */
  public editCurrency(id: number, currency: Currency): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/coins/${id}`, currency);
  }

  /**
   * Deletes the currency.
   * @param id - Currency identifier.
   */
  public deleteCurrency(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/coins/${id}`);
  }
}
