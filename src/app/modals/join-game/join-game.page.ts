import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { map} from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { UpcomingMatchesService } from 'src/app/_services/upcoming-matches.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.page.html',
  styleUrls: ['./join-game.page.scss'],
})
export class JoinGamePage implements OnInit {
 // Data passed in by componentProps
 @Input() type: string;
 @Input() id: any;
 @Input() name: any;
 playerCount:number=0;
 isSubmited=false;
 players=[];

  constructor(
      private modalCtrl:ModalController,
      private _service:UpcomingMatchesService,
      private navCtrl: NavController,
      private alertService:AlertService,
      private router:Router) { }

  ngOnInit() {
    if(this.type=='solo')
    {
      this.playerCount=1;
    }
    else if(this.type=='squad')
    {
      this.playerCount=4;
    }
    else
    this.playerCount=2;
    for(var i=0;i<this.playerCount;i++)
    {
      this.players.push({name:''})
    }


    console.log(this.type)
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  joinPlayers()
  {

    this.isSubmited=true;
    var data='';
    for(var i=0;i<this.playerCount;i++)
    {
      if(this.players[i].name=='')
      {
        return;

      }
      data+=i+1+'. '+this.players[i].name+'<br>'
    }
    this._service.join(this.id,data).subscribe(
      data=>
      {
        console.log(data)
        this.alertService.presentToast(data['message']);
        this.isSubmited=false;
        this.dismiss();

      },
      error=>
      {

        console.log(error);
        this.isSubmited=false;
        this.modalCtrl.dismiss({
          'dismissed': true
        });
        this.alertService.presentAlert(error)

      }

    )
    console.log(data)
  }

}
