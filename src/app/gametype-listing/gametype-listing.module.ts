import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GametypeListingPageRoutingModule } from './gametype-listing-routing.module';

import { GametypeListingPage } from './gametype-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GametypeListingPageRoutingModule
  ],
  declarations: [GametypeListingPage]
})
export class GametypeListingPageModule {}
