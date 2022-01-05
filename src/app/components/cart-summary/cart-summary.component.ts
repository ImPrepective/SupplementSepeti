import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems: CartItem[]=[];

  constructor(private cartService: CartService, 
    private toastrService:ToastrService,
    ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }
  getCartLocal(){
    this.cartItems = JSON.parse(localStorage.getItem("cart"));
  }
   removeFromCart(product:Product){
    this.cartService.removeFromCart(product);
     console.log(this.cartService.list())
     this.toastrService.error("Silindi",product.productName + " sepetten silindi.")
   }

   updateToLocalStorage(){
    if(localStorage.hasOwnProperty("cart")){
      localStorage.removeItem("cart");
    }
    localStorage.setItem("cart",JSON.stringify(CartItems));
  }
}


