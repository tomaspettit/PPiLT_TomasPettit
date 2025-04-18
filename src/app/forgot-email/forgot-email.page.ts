//IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonInput, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { personOutline, logInOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-email',
  templateUrl: './forgot-email.page.html',
  styleUrls: ['./forgot-email.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonIcon, IonButton, IonInput
  ]
})
export class ForgotEmailPage implements OnInit {

  // Input variables
  newEmail: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Storage variables
  myEmail: string = '';
  myPassword: string = '';

  // Disabled Sign Up Button
  disabledSignUpBtn:boolean=true;

  constructor(private storage: Storage, private router: Router, private toastController: ToastController) { 
    // Add Icons
    addIcons({personOutline, logInOutline, alertCircleOutline, checkmarkCircleOutline});
  }

  // Create Storage
  async ngOnInit() : Promise<void>{
    await this.storage.create();
  }

  // Both email & password will be showing on console log after creating your account
  async ionViewWillEnter(){
    this.myEmail = await this.storage.get('email');
    this.myPassword = await this.storage.get('password');
    console.log("Forgot Email: " + this.myEmail + " " + this.myPassword);
  }

  // Check if all the inputs has been placed, that way the Sign Up Button will no longer disable
  onInputChangedForFE(){
    if(this.newEmail.includes('@') && (this.newEmail.endsWith(".ie") || this.newEmail.endsWith(".com")) && this.password.length > 6){
      this.disabledSignUpBtn = false;
    }
    else{
      this.disabledSignUpBtn = true;
    }
  }

  // Submit Button => after the button is no longer disable
  async forgotEmailSubmit(){
    if(this.newEmail != this.myEmail && this.password == this.myPassword && this.password == this.confirmPassword){
      
       // Both Email & Password Success
      this.storage.set('email', this.newEmail); // Set a new email

      const toast = await this.toastController.create({
        message: 'New Email successful',
        duration: 3000,
        icon: checkmarkCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
      this.removeFEData(); // Clear the inputs after the user has clicked on the Sign Up Button

      this.router.navigate(['/login']); // Navigate to Login

    }else if(this.password != this.myPassword && this.password != this.confirmPassword){

      // Incorrect Password or not the same as the confirm Password
      const toast = await this.toastController.create({
        message: 'Password failed!',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
    }
    else{

      // Incorrect Email
      const toast = await this.toastController.create({
        message: 'New Email failed!',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
    }
  }

  // Clear the inputs after the user has clicked on the Sign Up Button
  removeFEData(){
    this.newEmail = '';
    this.password = '';
    this.confirmPassword = '';
  }
}

