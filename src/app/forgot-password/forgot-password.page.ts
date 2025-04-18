//IMPORTS
import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonInput, ToastController } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { personOutline, logInOutline, alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton,
    IonIcon, IonInput
  ]
})
export class ForgotPasswordPage implements OnInit {
  
  // Input variables
  email: string = '';
  newPassword: string = '';
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
    console.log("Forgot Password: " + this.myEmail + " " + this.myPassword);
  }

  // Check if all the inputs has been placed, that way the Sign Up Button will no longer disable
  onInputChangedForFP(){
    if(this.email.includes('@') && (this.email.endsWith(".ie") || this.email.endsWith(".com")) && this.newPassword.length > 6){
      this.disabledSignUpBtn = false;
    }
    else{
      this.disabledSignUpBtn = true;
    }
  }

  // Submit Button => after the button is no longer disable
  async forgotPasswordSubmit(){
    if(this.email == this.myEmail && this.newPassword != this.myPassword && this.newPassword == this.confirmPassword){
      
      // Both Email & Password Success
      console.log('New Password successful');
      this.storage.set('password', this.newPassword); // Set a new password

      const toast = await this.toastController.create({
        message: 'New Password successful',
        duration: 3000,
        icon: checkmarkCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();
      this.removeFPData(); // Remove the data from the input fields

      this.router.navigate(['/login']); // Navigate to Login
      
    }else if(this.email != this.myEmail){
      
      // Incorrect Email
      const toast = await this.toastController.create({
        message: 'Invalid Email!',
        duration: 3000,
        icon: alertCircleOutline,
        swipeGesture:"vertical",
        position:"bottom",
      });
      await toast.present();

    }
    else{

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
  }

  // Remove Forgot Password Data
  removeFPData(){
    this.email = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
