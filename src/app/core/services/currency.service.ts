import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyRequest } from '../models/currency-request.model';
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
  public createCurrency(currency: CurrencyRequest): Observable<any> {
    return this.http.post<any>('http://localhost:3000/coins', currency);
  }

  /**
   * Edits the currency.
   * @param id - Currency identifier.
   * @param currency - Data required for edition.
   */
  public editCurrency(id: number, currency: CurrencyRequest): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/coins/${id}`, currency);
  }

  /**
   * Deletes the currency.
   * @param id - Currency identifier.
   */
  public deleteCurrency(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/coins/${id}`);
  }
  
  /**
   * Gets currency values.
   * @param currencies - Acronyms of the currencies from which we want to obtain their value.
   * @param toCurrency - To the currency for which the value is to be known.
   */
  public getCurrencyValues(currencies: string[], toCurrency: string): Observable<any> {
    var params = new HttpParams();
    params = params.append('fsyms', currencies.join(','));
    params = params.append('tsyms', toCurrency);

    return this.http.get<any>('https://min-api.cryptocompare.com/data/pricemulti', { params });
  }
}
