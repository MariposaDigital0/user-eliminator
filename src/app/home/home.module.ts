import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { OngoingComponent } from '../components/ongoing/ongoing.component';
import { UpcomingComponent } from '../components/upcoming/upcoming.component';
import { ResultComponent } from '../components/result/result.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SuperTabsModule
  ],
  declarations: [HomePage,OngoingComponent,UpcomingComponent,ResultComponent]
})
export class HomePageModule {}
