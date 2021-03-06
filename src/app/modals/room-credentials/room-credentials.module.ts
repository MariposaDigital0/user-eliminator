import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomCredentialsPageRoutingModule } from './room-credentials-routing.module';

import { RoomCredentialsPage } from './room-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomCredentialsPageRoutingModule
  ],
  declarations: [RoomCredentialsPage]
})
export class RoomCredentialsPageModule {}
