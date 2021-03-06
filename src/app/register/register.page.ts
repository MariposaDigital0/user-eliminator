import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ModalController, NavController } from '@ionic/angular';
import { ConnectivityProvider } from '../helper/connectivity.provider';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
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
      this.registerForm = new FormGroup({
        mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
        email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        pin: new FormControl('', [Validators.required, Validators.maxLength(4),Validators.minLength(4)]),
        cpin: new FormControl('', [Validators.required, Validators.maxLength(4),Validators.minLength(4)]),
        pcode: new FormControl(''),
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
  save()
  {
     this.submitAttempt = true;
    if(this.registerForm.invalid){

      console.log(this.registerForm.value);
    }
    else{
      if(!this.deviceOnline)
      {
        this.alertService.errorToast("No Internet Connectivity");
      }
      else{
      this.authService.register(this.registerForm.value.mobile, this.registerForm.value.pin, this.registerForm.value.pcode,this.registerForm.value.email).subscribe(
        data => {
          this.authService.login(this.registerForm.value.mobile,this.registerForm.value.pin).subscribe(
            data => {
            },
            error => {
              console.log(error);
            },
            () => {

              this.navCtrl.navigateRoot('/tabs');
            }
          );

        },
        error => {
          console.log(error)
          this.alertService.errorToast(error);
        },
        () => {

        }
      );
      }
    }
  }
}
