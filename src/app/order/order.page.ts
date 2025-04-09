// IMPORTS
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, 
  IonCardContent, IonCardTitle, IonButton, IonIcon
 } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, logoInstagram, logoFacebook, logoGithub, personOutline, logOutOutline, mailOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage-angular';

import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [RouterLinkWithHref, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, 
    IonCardHeader, IonCardContent, IonCardTitle, IonButton, IonIcon
  ]
})

export class OrderPage implements OnInit {

  // Storage Name
  myName: string = '';
  
  // Cart Variables
  carts: any[]=[];
  results: any[] = [];

  // Total Price Variables
  totalPrice: number = 0; // Initialize total price as 0

  constructor(private cs: CartService, private storage: Storage, private router: Router) {
    // Add Icons
    addIcons({addOutline, logoInstagram, logoFacebook, logoGithub, personOutline, logOutOutline, mailOutline})
  }

  // Create Storage
  async ionViewWillEnter(){
    await this.storage.create();
    this.myName = await this.storage.get('name');
  }

  ngOnInit() {
    // Fetch the carts data when the component initializes
    this.cs.GetCartData().subscribe(data => {
      this.carts = data.record.cart;
      console.log('Carts:', this.carts);
      this.results = [...this.carts];
      console.log(this.carts); // Check the fetched data in the console
    }, error => {
      console.error('Error fetching data', error);
    });
  }

  // Function to add item price to total
  addToCart(cart: any) {
    this.totalPrice += cart.newPrice; // Add the item's price to the total price
    console.log('Total Price: €', this.totalPrice); // Check the updated total in the console
  }

  // Function to reset total price back to 0
  resetTotal() {
    this.totalPrice = 0; // Reset the total price to 0
  }

  // Checkout Link for navigating to payment page
  async navigateToPayment(){
    await this.storage.set("price", this.totalPrice);
    await this.router.navigate(['/payment']);
    this.totalPrice = 0; // Reset the total price after navigation
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
