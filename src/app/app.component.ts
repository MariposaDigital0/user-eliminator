import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  navigate : any;
  constructor() {
    this.sideMenu();
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/tabs",
        icon  : "home"
      },

      {
        title : "Profile",
        url   : "/profile",
        icon  : "person-circle-outline"
      },

      {
        title : "Reffer & Earn",
        url   : "/my-matches",
        icon:  "pricetags-outline"
      },
      {
        title : "Terms & Conditions",
        url   : "/my-matches",
        icon:  "clipboard-outline"
      },
      {
        title : "Contact US",
        url   : "/my-matches",
        icon:  "call-outline"
      },
      {
        title : "About US",
        url   : "/my-matches",
        icon:  "information-circle-outline"
      }
    ]
  }

}
