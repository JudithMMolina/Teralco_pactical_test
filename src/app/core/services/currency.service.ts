import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  public getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>('http://localhost:3000/coins');
  }

  public createCurrency(currency: Currency): Observable<any> {
    return this.http.post<any>('http://localhost:3000/coins', currency);
  }

  public deleteCurrency(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/coins/${id}`);
  }

  public editCurrency(id: number, currency: Currency): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/coins/${id}`, currency);
  }
}
