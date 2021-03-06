import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { error } from 'protractor';
import { JoinGamePage } from 'src/app/modals/join-game/join-game.page';
import { PlayersListPage } from 'src/app/modals/players-list/players-list.page';


import { UpcomingMatchesService } from 'src/app/_services/upcoming-matches.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss'],
})
export class UpcomingComponent implements OnInit {
  @Input() name: string;

  upcomingMatches=[];

  constructor(private _service:UpcomingMatchesService,
    public modalController: ModalController,
    private navCtrl: NavController,
    private router:Router
    ) {

   }

  ngOnInit() {
    console.log(this.name)
    this.getUpComingMatches();
  }
  getUpComingMatches()
  {
   this._service.getMatches(this.name).subscribe(

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
 async joinGame(id,i)
  {
    const modal = await this.modalController.create({
      component: JoinGamePage,
      cssClass: 'join-game-modal-css',
      componentProps: {
        'type': this.upcomingMatches[i].type,
         'id':id,
         'name':this.name
      }
    });
    modal.onDidDismiss().then(mr => {
      this.getUpComingMatches();
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
