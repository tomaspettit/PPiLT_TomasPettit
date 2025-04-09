//IMPORTS
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonProgressBar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
  standalone: true,
  imports: [IonContent, IonProgressBar, CommonModule, FormsModule]
})
export class LoadingPage implements OnInit {
  public progress = 0; // Start with 0 (zero)

  constructor(private router: Router) { }

  // Redirect to home page after 10 seconds
  ngOnInit() {
    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;

          // Navigate to another page when the progress reaches 100%
          this.router.navigate(['/home']);
        }, 1000);
      }
    }, 100);
  }
}
