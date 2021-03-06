import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoomCredentialsPage } from 'src/app/modals/room-credentials/room-credentials.page';
import { OngoingMatchesService } from 'src/app/_services/ongoing-matches.service';

@Component({
  selector: 'app-ongoing',
  templateUrl: './ongoing.component.html',
  styleUrls: ['./ongoing.component.scss'],
})
export class OngoingComponent implements OnInit {
  @Input() name: string;
  upcomingMatches=[];
  roomDeatils:any={};

  constructor(private _service:OngoingMatchesService,public modalController: ModalController) {

   }

  ngOnInit() {
    console.log(this.name)
    this.getUpOngoingMatches();
  }
  getUpOngoingMatches()
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
  getPlayers(id)
  {
    this._service.getRoomCredentials(id).subscribe(
      data=>
      {
        console.log(data)
        this.roomDeatils=data;
      },
      error=>
      {
        console.log(error);
      }
    )
  }
}
