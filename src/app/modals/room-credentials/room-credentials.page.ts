import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OngoingComponent } from 'src/app/components/ongoing/ongoing.component';
import { AlertService } from 'src/app/_services/alert.service';
import { OngoingMatchesService } from 'src/app/_services/ongoing-matches.service';
import { UpcomingMatchesService } from 'src/app/_services/upcoming-matches.service';

@Component({
  selector: 'app-room-credentials',
  templateUrl: './room-credentials.page.html',
  styleUrls: ['./room-credentials.page.scss'],
})
export class RoomCredentialsPage implements OnInit {
  @Input() id: any;
  roomDeatils:any={};
  constructor(
    private modalCtrl:ModalController,
    private _service:OngoingMatchesService,
    private alertService:AlertService,
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
    this._service.getRoomCredentials(this.id).subscribe(
      data=>
      {
        if(data.message=="You have't join this match")
        {
          this.alertService.errorToast(data.message)
          this.dismiss();
        }
        else
        this.roomDeatils=data;
      },
      error=>
      {
        console.log(error);
      }
    )
  }
}
