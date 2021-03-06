import { Component,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

name:string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.name="";
    this.route.params.subscribe(params => {
      if(params.name){
        this.name = params.name;

      }
    });
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
