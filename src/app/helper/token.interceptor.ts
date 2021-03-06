import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: any;
  loaderToShow: any = null;
  isLoading: boolean = false;
  loaderTimeout: any;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private storage: Storage,
    public loadingController: LoadingController
  ) {
      this.storage.get('token').then((data)=>{
        this.token = data.token;
        console.log(this.token);
      });
  }

  async showLoader() {

    await this.loadingController.create({
      cssClass: 'loading-class',
      message: 'Please wait...',
      spinner:'bubbles'
      //message: 'This Loader will Not AutoHide'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        this.isLoading = false;

      });
    });
    //await this.hideLoader();
  }

  async hideLoader() {
    // setTimeout(() => {

      await this.loadingController.dismiss();

    //}, 1000);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("loader " + this.isLoading);
    const token =  JSON.parse( localStorage.getItem('token'));
    console.log(token, this.token, request['url']);

    /* let jwtData = token.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    let isAdmin = decodedJwtData.admin

    console.log('jwtData: ' + jwtData)
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
    console.log('decodedJwtData: ' + decodedJwtData)*/
    if (token ) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'JWT ' + token.token
        }
      });
      if(!this.isLoading) {
        this.showLoader();
        this.isLoading = true;
      }
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        //if(this.isLoading == true) this.hideLoader();
        if (event instanceof HttpResponse) {
          console.log(this.isLoading);
          if(this.isLoading == true)  this.hideLoader();
          console.log('event--->>>', event);
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if(this.isLoading == true)  this.hideLoader();
        //if(this.isLoading == true) this.hideLoader();
        if (error.status === 401 || error.status === 403) {
          if (error.error.success === false) {
            this.presentToast('Login failed');
          } else {
            //this.router.navigate(['login']);
          }

          return throwError(error);
        }
        else if(error.status === 400){
          let error_message = "";
          for(let item in error.error){
            for(let i = 0; i < error.error[item].length; i++){
              error_message = error_message + " " + error.error[item][i];
            }
          }

          return throwError(error_message);
        }
        else{
          return throwError(error);
        }
      }));
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
