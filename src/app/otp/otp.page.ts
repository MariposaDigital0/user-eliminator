import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  public otpForm: FormGroup;

  public submitAttempt: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
  ) {
      this.otpForm = new FormGroup({

        otp1: new FormControl('', [Validators.required, Validators.maxLength(1),Validators.minLength(1)]),
        otp2: new FormControl('', [Validators.required, Validators.maxLength(1),Validators.minLength(1)]),
        otp3: new FormControl('', [Validators.required, Validators.maxLength(1),Validators.minLength(1)]),
        otp4: new FormControl('', [Validators.required, Validators.maxLength(1),Validators.minLength(1)]),
      });

   }

  ngOnInit() {
  }
  verifyOTP()
  {
     this.submitAttempt = true;
    if(this.otpForm.invalid){

      console.log(this.otpForm.value);
    }
    else{
      console.log("login")
    }
  }
  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    }
  }
}
