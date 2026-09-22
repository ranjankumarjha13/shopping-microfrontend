import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'shopping',
    pathMatch: 'full'
  },

  {
    path: 'shopping',
    loadComponent: () =>
      loadRemoteModule('shopping-mfe', './Products')
        .then(m => m.ProductsComponent)
        .catch(error => {
          console.error('Shopping MFE unavailable:', error);

          return import('./service-unavailable/service-unavailable.component')
            .then(m => m.ServiceUnavailableComponent);
        })
  },

  {
    path: 'cart',
    loadComponent: () =>
      loadRemoteModule('cart-microfrontend', './Component')
        .then(m => m.App)
        .catch(error => {
          console.error('Cart MFE unavailable:', error);

          return import('./service-unavailable/service-unavailable.component')
            .then(m => m.ServiceUnavailableComponent);
        })
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}