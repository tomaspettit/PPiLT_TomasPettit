// IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonTextarea, IonIcon,
  ToastController
 } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { personOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput,
    IonTextarea, IonIcon
  ]
})
export class SignupPage implements OnInit{

  // Disabled Sign Up Button
  signUpDisabled: boolean = true;

  // Input Variables
  name: string = '';
  email: string = '';
  password: string = '';
  dob: string = '';
  phone: string = '';
  address: string = '';
  eircode: string = '';

  // Storage Same email
  myEmail:string='';

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add Icons
    addIcons({personOutline, alertCircleOutline, checkmarkCircleOutline});
  }

  // Create Storage
  async ngOnInit() : Promise<void>{
    await this.storage.create();
  }

  // Email will be showing on console log after creating your account
  async ionViewWillEnter(){
    this.myEmail = await this.storage.get('email');
    console.log("Sign Up: " + this.myEmail);
  }

  // Check if all the inputs has been placed, that way the Sign Up Button will no longer disable
  onInputChanged(){
    const name = this.name.length >= 4;
    const email = this.email.includes("@") && (this.email.endsWith(".ie") || this.email.endsWith(".com"));
    const password = this.password.length >= 6;
    const dob = this.dob.length >= 6;
    const phone = this.phone.length >= 5;
    const address = this.address.length >= 8;
    const eircode = this.eircode.length >= 5;
    const allInputs = name && email && password && dob && phone && address && eircode;
    if(allInputs){

      // All inputs placed
      this.signUpDisabled = false;

    }
    else{

      // NOT all of them are in placed
      this.signUpDisabled = true;

    }
  }

  // Sign Up Button => after the button is no longer disable
  async onSignUp(){
    if(this.email == this.myEmail){

      // Same Email
      const toast = await this.toastController.create({
        message: 'Same Email. Try a different Email',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
      this.email = '';

    }else{

      // Sign Up Complete
    //Set storage to all variables of your account
    this.storage.set('name', this.name);
    this.storage.set('email', this.email);
    this.storage.set('password', this.password);
    this.storage.set('dob', this.dob);
    this.storage.set('phone', this.phone);
    this.storage.set('address', this.address);
    this.storage.set('eircode', this.eircode);

    const toast = await this.toastController.create({
      message: 'Sign Up Success',
      duration: 3000,
      icon: checkmarkCircleOutline,
      swipeGesture:"vertical",
      position:"bottom",
    });
    await toast.present();

    this.router.navigate(['/login']); // Navigate to Log In
    this.removeAllData(); // Remove All Data

    }
  }

  // Remove all data after you go back or complete your account
  removeAllData(){
    this.address = '';
    this.email='';
    this.dob='';
    this.eircode='';
    this.name='';
    this.phone='';
    this.password='';
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
