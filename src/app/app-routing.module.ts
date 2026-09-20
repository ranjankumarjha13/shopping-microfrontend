
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

const routes: Routes = [

  {
    path: 'shopping',
    loadComponent: () =>
      loadRemoteModule('shopping-mfe', './Products')
        .then(m => m.ProductsComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
      loadRemoteModule('cart-microfrontend', './Component')
        .then(m => m.App)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

