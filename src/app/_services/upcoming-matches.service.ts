import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UpcomingMatchesService {

  constructor(
    private http: HttpClient,
  ) { }
  getMatches(game): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/game/?game=`+game+'&&status=active')
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }
  getPlayerList(game): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/join-match/?game_id=`+game)
      .pipe(
        tap(_ => this.log('fetched get')),
        catchError(this.handleError('get', []))
      );
  }

  join(id,data) {
    return this.http.post(`${environment.API_URL}` + 'join-match/',
      {game:id,player_name:data}
    )
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
