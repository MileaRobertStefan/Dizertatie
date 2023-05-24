import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: "registration",
  component: RegisterComponent
},
{
  path: "new_offer",
  component: CreateOfferComponent
},
{
  path: "cart",
  component: CartComponent
},
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
