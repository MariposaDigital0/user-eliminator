import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GametypeListingPage } from './gametype-listing.page';

const routes: Routes = [
  {
    path: '',
    component: GametypeListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GametypeListingPageRoutingModule {}
