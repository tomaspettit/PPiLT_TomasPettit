// IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonIcon, ToastController } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, personOutline, logInOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonIcon]
})
export class LoginPage implements OnInit{

  // Disabled Log In Button
  loginDisabled: boolean = true;

  // Input Variables
  email: string = '';
  password: string = '';

  // Storage Variables
  myEmail: string = '';
  myPassword: string = '';

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add Icons
    addIcons({logoInstagram, logoFacebook, logoGithub, personOutline, logInOutline, alertCircleOutline, checkmarkCircleOutline});
  }

  // Create Storage
  async ngOnInit() : Promise<void>{
    await this.storage.create();
  }

  // Both Email & Password will be showing on console log after creating your account
  async ionViewWillEnter(){
    this.myEmail = await this.storage.get('email');
    this.myPassword = await this.storage.get('password');
    console.log("Login: " + this.myEmail + " " + this.myPassword);
  }

  // Check if all the inputs has been placed, that way the Log In Button will no longer disable
  onInputChangedForLogin(){
    if(this.email.includes('@') && (this.email.endsWith(".com") || this.email.endsWith(".ie")) && this.password.length > 6){
      // All inputs placed
      this.loginDisabled = false;
    }
    else{
      // NOT all of them are in placed
      this.loginDisabled = true;
    }
  }

  // Log In Button => after the button is no longer disable
  async onLogin(){
    if(this.email == this.myEmail && this.password == this.myPassword){
      // Succeed Log In
      const toast = await this.toastController.create({
        message: 'Login successful!',
        duration: 3000,
        icon: checkmarkCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
      this.router.navigate(['/order']); // Navigate to Order
    }
    else{
      // Invalid account
      const toast = await this.toastController.create({
        message: 'Login failed!',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
    }
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
