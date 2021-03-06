import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  constructor(
    private http: HttpClient,
    private storage: Storage,

  ) { }

  login(mobile,pin) {
    return this.http.post(`${environment.API_URL}` + 'auth/login/',
      {mobile: mobile, password: pin}
    ).pipe(
      tap(token => {
        if(Capacitor.isNative)
        {
        this.storage.set('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        }
        else
        {
          localStorage.setItem("token",JSON.stringify(token));
        }
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }
  register(mobile, pin,promoCode,email) {
    return this.http.post(`${environment.API_URL}` + 'auth/register/',
      {mobile:mobile,password:pin,refer_code:promoCode,email:email}
    )
  }

   getOtp(data)
   {
    return this.http.get(`${environment.API_URL}` + 'auth/')
    .pipe(
      tap(_ => this.log('fetched get')),
      catchError(this.handleError('get', []))
    );
   }
  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(`${environment.API_URL}` + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }
  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(`${environment.API_URL}` + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
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
