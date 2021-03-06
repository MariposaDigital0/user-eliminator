import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UpcomingMatchesService } from 'src/app/_services/upcoming-matches.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.page.html',
  styleUrls: ['./players-list.page.scss'],
})
export class PlayersListPage implements OnInit {
  @Input() id: any;
  players=[];
  constructor(
    private modalCtrl:ModalController,
    private _service:UpcomingMatchesService
  ) { }

  ngOnInit() {
    this.getPlayers();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  getPlayers()
  {
    this._service.getPlayerList(this.id).subscribe(
      data=>
      {
        console.log(data)
        this.players=data;
      },
      error=>
      {
        console.log(error);
      }
    )
  }
}
