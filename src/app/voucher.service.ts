import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Voucher } from './voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  // url now updated to be deployed heroku back end
  private vouchersUrl = 'https://sag-voucher-back-end.herokuapp.com/vouchers'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  /** GET vouchers from the server */
  getVouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(this.vouchersUrl)
      .pipe(
        tap(_ => console.log('fetched vouchers')),
        catchError(this.handleError<Voucher[]>('getVouchers', []))
      )
  }

  /** GET voucher by id. Return 'undefined' when id not found */
  getVoucherNo404<Data>(id: number): Observable<Voucher> {
    const url = `${this.vouchersUrl}/?id=${id}`
    return this.http.get<Voucher[]>(url)
      .pipe(
        map(vouchers => vouchers[0]),
        tap(v => {
          const outcome = v ? 'fetched' : 'did not find'
          console.log(`${outcome} voucher id=${id}`)
        }),
        catchError(this.handleError<Voucher>(`getVoucher id=${id}`))
      )
  }

  /** GET voucher by id. Will 404 if id not found */
  getVoucher(id: number): Observable<Voucher> {
    const url = `${this.vouchersUrl}/${id}`
    return this.http.get<Voucher>(url).pipe(
      tap(_ => console.log(`fetched voucher id=${id}`)),
      catchError(this.handleError<Voucher>(`getVoucher id=${id}`))
    )
  }

  /** PUT: update the voucher on the server */
  updateVoucher(voucher: Voucher): Observable<any> {
    const url = `${this.vouchersUrl}/edit/${voucher._id}`
    return this.http.put(url, voucher, this.httpOptions).pipe(
      tap(_ => console.log(`updated voucher id=${voucher._id}`)),
      catchError(this.handleError<any>(`updateVoucher`))
    ) 
  }

  /** POST: add a new voucher to the server */
  addVoucher(voucher: Voucher): Observable<Voucher> {
    return this.http.post<Voucher>(this.vouchersUrl, voucher, this.httpOptions).pipe(
      tap((newVoucher: Voucher) => console.log(`added voucher w id=${newVoucher._id}`)),
      catchError(this.handleError<Voucher>('addVoucher')),
    )
  }

  /** DELETE: delete a voucher from the server  */
  deleteVoucher(id: number): Observable<Voucher> {
    const url = `${this.vouchersUrl}/${id}`

    return this.http.delete<Voucher>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted voucher id=${id}`)),
      catchError(this.handleError<Voucher>('deleteVoucher'))
    )
  }

  /** GET vouchers whose name contains search term */
  searchVouchersByActorName(term: string): Observable<Voucher[]> {
    if (!term.trim()) {
      //if not search term, return empty vouchers array
      return of([])
    }
    return this.http.get<Voucher[]>(`${this.vouchersUrl}/?actorName=${term}`).pipe(
      tap(x => x.length ?
        console.log(`found vouchers with names matching "${term}"`) : 
        console.log(`no vouchers with names matching "${term}"`)),
        catchError(this.handleError<Voucher[]>('searchVouchersByName', []))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error)
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }

  genId(vouchers: Voucher[]): number {
    return vouchers.length > 0 ?
      Math.max(...vouchers.map(v => v._id)) + 1 : 1
  }
}
