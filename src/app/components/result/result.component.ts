import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ViewResultPage } from 'src/app/modals/view-result/view-result.page';
import { ResultService } from 'src/app/_services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  @Input() name: string;
  upcomingMatches=[];

  constructor(private _service:ResultService,
    public modalController: ModalController,
    private navCtrl: NavController,
    private router:Router
    ) {

   }

  ngOnInit() {
    console.log(this.name)
    this.getMatches();
  }
  getMatches()
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

  async ViewResult(id)
  {
    const modal = await this.modalController.create({
      component: ViewResultPage,
      cssClass: 'join-game-modal-css',
      componentProps: {
         'id':id
      }
    });
    return await modal.present();

  }

}
