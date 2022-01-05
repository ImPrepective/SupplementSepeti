import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CartItems } from 'src/app/models/cartItems';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-info',
  templateUrl: './cart-info.component.html',
  styleUrls: ['./cart-info.component.css']
})
export class CartInfoComponent implements OnInit {

  cartItems:CartItem[] =[];
  products:Product[] =[];
  constructor(private cartService:CartService,
    private toastrService:ToastrService,
    private productService:ProductService) { }

  ngOnInit(): void {
    this.getCart();
    this.getProducts();
  }

   removeFromCart(product:Product){
     this.cartService.removeFromCart(product);
     this.toastrService.error("Silindi",product.productName + " sepetten silindi.")
   }
   updateToLocalStorage(){
    localStorage.removeItem("cart")
    localStorage.setItem("cart",JSON.stringify(CartItems));
  }
  getCart() {
    console.log(this.cartItems);
      this.cartItems = JSON.parse(localStorage.getItem("cart"));
  }

  getProducts(){
    this.productService.getProducts().subscribe(response =>{
      this.products = response.data;
    })

  }
  completeToOrder(){
    this.products.forEach(product => {
      console.log(1)
      this.cartItems.forEach(cartItem =>{
        console.log(2)
        if(product.productId === cartItem.product.productId){
          console.log(3)
          if(product.unitsInStock > cartItem.quantity){
            product.unitsInStock -= cartItem.quantity;
            this.productService.update(product).subscribe(data => {
              console.log(data);
              this.toastrService.success("Urun eklendi","basarili");
            })
            localStorage.removeItem("cart")
          }
          else if(product.unitsInStock === cartItem.quantity){
            product.unitsInStock = 0;
            console.log(5)
            this.productService.delete(product);
            localStorage.removeItem("cart")
          }
          else{
            console.log(6)
            this.toastrService.error("yeterli stok yok");
            cartItem.quantity = product.unitsInStock;
          }
        }
      })
    })
  }

}
