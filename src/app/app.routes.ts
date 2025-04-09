import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full',
  },
  {
    path: 'loading',
    loadComponent: () => import('./loading/loading.page').then( m => m.LoadingPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'emergency-contact',
    loadComponent: () => import('./emergency-contact/emergency-contact.page').then( m => m.EmergencyContactPage)
  },
  {
    path: 'order',
    loadComponent: () => import('./order/order.page').then( m => m.OrderPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then( m => m.PaymentPage)
  },
  {
    path: 'forgot-email',
    loadComponent: () => import('./forgot-email/forgot-email.page').then( m => m.ForgotEmailPage)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password.page').then( m => m.ForgotPasswordPage)
  },
];
