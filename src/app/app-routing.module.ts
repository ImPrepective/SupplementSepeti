import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartInfoComponent } from './components/cart-info/cart-info.component';
import { LoginComponent } from './components/login/login.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ProductAddGuard } from './guards/product-add.guard';
import { ProductService } from './services/product.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProductComponent },
  {path: 'products',component: ProductComponent},
  {path: 'products/category/:categoryId',component: ProductComponent},
  {path:'products/add',component:ProductAddComponent,canActivate:[ProductAddGuard]},
  {path:'login',component:LoginComponent},
  {path:'userInfo',component:UserInfoComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',component:CartInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
