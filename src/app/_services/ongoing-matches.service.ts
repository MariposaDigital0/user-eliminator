import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OngoingMatchesService {

  constructor(
    private http: HttpClient,
  ) { }
  getMatches(game): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/game/?game=`+game+'&&status=ongoing')
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }
  getRoomCredentials(game): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/room-details/?game_id=`+game)
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
