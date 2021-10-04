import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { cartItems } from 'src/model/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem: cartItems[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  storage: Storage = sessionStorage;
  host :string = "http://localhost:8080";
  constructor() {
    if (this.storage.getItem('cartItems')) {
      this.cartItem = JSON.parse(this.storage.getItem('cartItems') as string);
      console.log(this.cartItem);
      this.calculateTotalPrice();
    }
   }

  addToCart(theCartItem: cartItems){
    //check already item in the cart 
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: cartItems | undefined;
    
    if(this.cartItem.length > 0){
      existingCartItem = this.cartItem.find( tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined)
    } 

    if(alreadyExistsInCart){

      existingCartItem!.quantity++;
      
    }else {

      this.cartItem.push(theCartItem);
      
    }

    this.calculateTotalPrice();
  }

  persistCartItem() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItem)); 
  }

  calculateTotalPrice() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItem){

      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
 
    }

    console.log(`Total price: ${totalPriceValue}, Total quantity: ${totalQuantityValue}`);
    
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    
    this.persistCartItem();
  }

  decrementQuantity(cartItem: cartItems){
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
  
    }else {
      this.calculateTotalPrice();
    }
  }



  remove(cartItem: cartItems){
    const itemIndex = this.cartItem
                          .findIndex(
                            tempCartItem => tempCartItem.id === cartItem.id
                          );

    if (itemIndex > -1) {
      this.cartItem.splice(itemIndex, 1);
    
      this.calculateTotalPrice();
    }
  }
  
}
