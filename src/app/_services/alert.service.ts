import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController
    , private alertController:AlertController) { }
  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-sucesss',
      color: 'success',

    });
    toast.present();
  }
  async errorToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-error',
      color: 'danger',
      mode:'md'

    });
    toast.present();
  }
  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header: 'Alert',
      message:message,
      buttons:['OK']
    });

    await alert.present();
  }

}
