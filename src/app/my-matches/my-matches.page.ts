import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { error } from 'protractor';
import { JoinGamePage } from 'src/app/modals/join-game/join-game.page';
import { PlayersListPage } from 'src/app/modals/players-list/players-list.page';


import { UpcomingMatchesService } from 'src/app/_services/upcoming-matches.service'
import { RoomCredentialsPage } from '../modals/room-credentials/room-credentials.page';
import { MyMatchesService } from '../_services/my-matches.service';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.page.html',
  styleUrls: ['./my-matches.page.scss'],
})
export class MyMatchesPage implements OnInit {

  upcomingMatches=[];

  constructor(private _service:MyMatchesService,
    public modalController: ModalController,
    private navCtrl: NavController,
    private router:Router
    ) {

   }

  ngOnInit() {
    this.getUpComingMatches();
  }
  getUpComingMatches()
  {
   this._service.getMatches().subscribe(

      data=>
      {
        this.upcomingMatches=data;
        console.log(this.upcomingMatches);
      },
      error=>
      {
        console.log(error)
      }

   );
  }
  doRefresh(event)
  {

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  async ViewRoomDetails(id)
  {


    const modal = await this.modalController.create({
      component: RoomCredentialsPage,
      cssClass: 'room-credentials-modal-css',
      componentProps: {

         'id':id
      }
    });
    return await modal.present();

  }
  async ViewPlayers(id)
  {
    const modal = await this.modalController.create({
      component: PlayersListPage,
      cssClass: 'join-game-modal-css',
      componentProps: {
         'id':id
      }
    });
    return await modal.present();

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.navCtrl.navigateRoot(currentUrl);

    }
}

