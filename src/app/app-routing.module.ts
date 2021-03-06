import { NgModule } from '@angular/core';
import { ActivatedRoute, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'gametype-listing',
    loadChildren: () => import('./gametype-listing/gametype-listing.module').then( m => m.GametypeListingPageModule),


  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'my-matches',
    loadChildren: () => import('./my-matches/my-matches.module').then( m => m.MyMatchesPageModule)
  },
  {
    path: 'my-wallet',
    loadChildren: () => import('./my-wallet/my-wallet.module').then( m => m.MyWalletPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'join-game',
    loadChildren: () => import('./modals/join-game/join-game.module').then( m => m.JoinGamePageModule)
  },
  {
    path: 'players-list',
    loadChildren: () => import('./modals/players-list/players-list.module').then( m => m.PlayersListPageModule)
  },
  {
    path: 'room-credentials',
    loadChildren: () => import('./modals/room-credentials/room-credentials.module').then( m => m.RoomCredentialsPageModule)
  },
  {
    path: 'view-result',
    loadChildren: () => import('./modals/view-result/view-result.module').then( m => m.ViewResultPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./modals/withdraw/withdraw.module').then( m => m.WithdrawPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
