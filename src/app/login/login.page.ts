import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { ConnectivityProvider } from '../helper/connectivity.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  deviceOnline:any;
  public submitAttempt: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private connectivityProvider:ConnectivityProvider
  ) {
      this.loginForm = new FormGroup({
        mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        pin: new FormControl('', [Validators.required, Validators.maxLength(4),Validators.minLength(4)]),
      });

   }

  ngOnInit() {



    this.connectivityProvider.appIsOnline$.subscribe(online => {
      if (online) {

          this.deviceOnline=online;

      } else {

          this.deviceOnline=false;

      }

  })
  }
 // Dismiss Login Modal
 dismissLogin() {
  this.modalController.dismiss();
}
// On Register button tap, dismiss login modal and open register modal
async registerModal() {
  this.dismissLogin();
  const registerModal = await this.modalController.create({
    component: RegisterPage
  });
  return await registerModal.present();
}


  login()
  {
     this.submitAttempt = true;
    if(this.loginForm.invalid){

      console.log(this.loginForm.value);
    }
    else{

      if(!this.deviceOnline)
      {
        this.alertService.errorToast("No Internet Connectivity");
      }
      else{
      this.authService.login(this.loginForm.value.mobile, this.loginForm.value.pin).subscribe(
        data => {
          this.alertService.presentToast("Logged In");
          console.log(data)
        },
        (error) => {
         console.log(error);
         this.alertService.errorToast(error);
        },
        () => {
          this.navCtrl.navigateRoot('/tabs');
        }
      );
      }
    }
  }


}
