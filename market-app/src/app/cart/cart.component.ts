import { Component, OnInit } from '@angular/core';
import { Product } from '../types/types';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: (Product & { quantity: number })[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeFromCart(index: number): void {
    this.cartService.removeItem(index);
  }

  updateQuantity(index: number, quantity: number): void {
    this.cartService.updateItem(index, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
}
