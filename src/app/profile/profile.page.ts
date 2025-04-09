// IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, arrowBackOutline, logOutOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonIcon, IonButton, IonCard, IonCardContent
  ]
})
export class ProfilePage implements OnInit {

  // Storage variables
  myName:string='';
  myDOB:string='';
  myEmail:string='';
  myPhoneNo:string='';
  myAddress:string='';
  myEircode:string='';

  constructor(private storage: Storage) { 
    // Add Icons
    addIcons({logoInstagram, logoFacebook, logoGithub, arrowBackOutline, logOutOutline});
  }

  // Create Storage
  async ngOnInit() : Promise<void>{
    await this.storage.create();
  }

  // All the storage variables will be showing on console log after creating your account
  async ionViewWillEnter(){
    this.myName = await this.storage.get('name');
    this.myEmail = await this.storage.get('email');
    this.myDOB = await this.storage.get('dob');
    this.myPhoneNo = await this.storage.get('phone');
    this.myAddress = await this.storage.get('address');
    this.myEircode = await this.storage.get('eircode');
  }


  // Browser websites
  async onInstagram(){
    await Browser.open({url: 'https://www.instagram.com'});
  }

  async onFacebook(){
    await Browser.open({url: 'https://www.facebook.com'});
  }

  async onGitHub(){
    await Browser.open({url: 'https://www.github.com'});
  }
}
