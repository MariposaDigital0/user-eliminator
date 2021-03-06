import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomCredentialsPage } from './room-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: RoomCredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomCredentialsPageRoutingModule {}
