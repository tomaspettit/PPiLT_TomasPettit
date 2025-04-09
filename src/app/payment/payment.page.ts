// IMPORTS
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonIcon, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cardOutline, logoInstagram, logoFacebook, logoGithub, checkmarkCircleOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage-angular';

// Credit Card
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { MaskitoDirective } from '@maskito/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
    IonButton, IonInput, IonIcon, MaskitoDirective]
})
export class PaymentPage implements OnInit {

  // Input variables
  cardNo: string = '';
  expiryDate: string = '';
  CVV: string = '';

  // Storage total price
  totalPrice: number = 0;

  // Disabled Pay Button
  paymentDisabled: boolean = true;

  constructor(private router: Router, private storage: Storage, private toastController: ToastController) { 
    // Add Icons
    addIcons({ arrowBackOutline, cardOutline, logoInstagram, logoFacebook, logoGithub, checkmarkCircleOutline });
  }

  // Create Storage
  async ngOnInit() : Promise<void>{
    await this.storage.create();
  }

  // Total Price will be showing on console log after adding the price for each cart
  async ionViewWillEnter(){
    await this.storage.create();
    this.totalPrice = await this.storage.get('price');
    console.log("€" +this.totalPrice);
  }

  // Check if all the inputs has been placed, that way the Pay Button will no longer disable
  onInputChangedForPayement() {
    const isCardNoValid = this.cardNo.replace(/\s+/g, '').length === 16; // Ensure card number is 16 digits
    const isExpiryValid = this.expiryDate.length === 5 && /^[0-1][0-9]\/[0-9]{2}$/.test(this.expiryDate); // MM/YY format
    const isCVVValid = this.CVV.length === 3; // CVV is 3 digits
  
    // Pay Button no longer disable
    this.paymentDisabled = !(isCardNoValid && isExpiryValid && isCVVValid);
  }

  // Card Number
  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
    ],
  };

  //Expiry Date => mm/yy
  readonly expiryMask: MaskitoOptions = {
    mask:[
      /\d/, /\d/, // MM (2-digit month)
    '/',        // Separator
    /\d/, /\d/  // YY (2-digit year)
    ],
  }

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  // Pay Button => after setting up your credit card
  async clickForPayment(){
    const toast = await this.toastController.create({
      message: 'Paid € ' + this.totalPrice + ". Have a nice day!",
      duration: 3000,
      icon: checkmarkCircleOutline,
      swipeGesture:"vertical",
      position:"bottom",
    });
    await toast.present();
    await this.storage.remove('price'); // Remove the price from storage after payment
    this.router.navigate(['/order']);
  }

  //Back Button
  async backButton(){
    await this.router.navigate(['/order']);
    await this.storage.remove('price'); // Remove the price from storage when going back
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
