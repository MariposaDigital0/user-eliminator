import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { TabsPage } from './tabs.page';
import {HomePageModule} from '../home/home.module'
import { HomePage } from '../home/home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'gametype-listing',
        children: [
          {
            path: '',
            loadChildren: '../gametype-listing/gametype-listing.module#GametypeListingPageModule'
          },

          {
            path: 'home/:name',

            loadChildren: '../home/home.module#HomePageModule'
          },



      ]
      },

      {
        path: 'my-matches',
        children: [
          {
            path: '',
            loadChildren: '../my-matches/my-matches.module#MyMatchesPageModule'
          }
        ]
      },
      {
        path: 'my-wallet',
        children: [
          {
            path: '',
            loadChildren: '../my-wallet/my-wallet.module#MyWalletPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/gametype-listing',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/gametype-listing',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
