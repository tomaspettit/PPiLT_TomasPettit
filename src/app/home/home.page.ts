//IMPORTS
import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/angular/standalone';
import { IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, personOutline, logInOutline} from 'ionicons/icons';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [RouterLinkWithHref, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon],
})
export class HomePage {
  constructor() {
    // Add Icons
    addIcons({logoInstagram, logoFacebook, logoGithub, personOutline, logInOutline});
  }
  
  // Browser websites
  onInstagram(){
    Browser.open({ url: 'https://www.instagram.com/' });
  }

  onFacebook(){
    Browser.open({ url: 'https://www.facebook.com/login.php/' });
  }

  onGitHub(){
    Browser.open({ url: 'https://github.com/login/' });
  }
}
