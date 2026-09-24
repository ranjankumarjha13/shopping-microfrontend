import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { loadRemoteModule }
  from '@angular-architects/native-federation';

import { LoginComponent }
  from './login/login.component';

import { LayoutComponent }
  from './layout/layout.component';

import { authGuard }
  from './guards/auth.guard';

const routes: Routes = [

  /*
   * LOGIN
   * No ShopEase header
   * No Shopping / Cart navigation
   */
  {
    path: 'login',
    component: LoginComponent
  },

  /*
   * AUTHENTICATED APPLICATION
   */
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],

    children: [

      /*
       * Default authenticated page
       */
      {
        path: '',
        redirectTo: 'shopping',
        pathMatch: 'full'
      },

      /*
       * SHOPPING MICROFRONTEND
       */
      {
        path: 'shopping',

        loadComponent: () =>
          loadRemoteModule(
            'shopping-mfe',
            './Products'
          )
          .then(
            m => m.ProductsComponent
          )
          .catch(error => {

            console.error(
              'Shopping MFE unavailable:',
              error
            );

            return import(
              './service-unavailable/service-unavailable.component'
            )
            .then(
              m => m.ServiceUnavailableComponent
            );
          })
      },

      /*
       * CART MICROFRONTEND
       */
      {
        path: 'cart',

        loadComponent: () =>
          loadRemoteModule(
            'cart-microfrontend',
            './Component'
          )
          .then(
            m => m.App
          )
          .catch(error => {

            console.error(
              'Cart MFE unavailable:',
              error
            );

            return import(
              './service-unavailable/service-unavailable.component'
            )
            .then(
              m => m.ServiceUnavailableComponent
            );
          })
      }
    ]
  },

  /*
   * Unknown URL
   */
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}