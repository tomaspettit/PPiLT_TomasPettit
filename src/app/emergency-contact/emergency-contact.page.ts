// IMPORTS
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonInput, IonTextarea, ToastController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoInstagram, logoFacebook, logoGithub, sendOutline, arrowBackOutline, checkmarkCircleOutline, alertCircleOutline} from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.page.html',
  styleUrls: ['./emergency-contact.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonButton,
    IonInput, IonTextarea
  ]
})
export class EmergencyContactPage implements OnInit{

  // Disabled Submit Button
  disabledECBtn: boolean = true;

  // Input variables
  name:string='';
  email:string='';
  phoneNo:string='';
  explain:string='';

  // Storage variables
  myName:string='';
  myEmail:string='';
  myPhoneNo:string='';

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add Icons
    addIcons({logoInstagram, logoFacebook, logoGithub, sendOutline, arrowBackOutline, alertCircleOutline, checkmarkCircleOutline}); 
  }

  // Create Storage
  async ngOnInit() : Promise<void>{
    await this.storage.create();
  }

  // Name, email & phone no. will be showing on console log after creating your account
  async ionViewWillEnter(){
    this.myName = await this.storage.get('name');
    this.myEmail = await this.storage.get('email');
    this.myPhoneNo = await this.storage.get('phone');
    console.log(this.myName + " " + this.myEmail + " " + this.myPhoneNo);
  }

  // Check if all the inputs has been placed, that way the Submit (send) Button will no longer disable
  formEC(){
    if(this.name.length > 6 && this.email.includes('@') && this.phoneNo.length > 8){
      this.disabledECBtn = false;
    }else{
      this.disabledECBtn = true;
    }
  }

  // Submit Button => after the button is no longer disable
  async submitEmergencyContact(){
    if(this.name != this.myName || this.email != this.myEmail || this.phoneNo != this.myPhoneNo){
      
      // Invalid Emergency Contact Send
      const toast = await this.toastController.create({
        message: 'Invalid Emergency Contact Send. Please, you must create your account by signing up',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();

    }else{

      // Succeed Emergency Contact Send
      const toast = await this.toastController.create({
        message: 'Emergency Contact has been send. Thank you',
        duration: 3000,
        icon: checkmarkCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
      this.router.navigate(['/order']);
    }
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
