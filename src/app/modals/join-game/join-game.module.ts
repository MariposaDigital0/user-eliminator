import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinGamePageRoutingModule } from './join-game-routing.module';

import { JoinGamePage } from './join-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JoinGamePageRoutingModule
  ],
  declarations: [JoinGamePage]
})
export class JoinGamePageModule {}
