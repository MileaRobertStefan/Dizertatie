import { Injectable } from '@angular/core';
import { CartItem, Product } from '../types/types';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  items: Array<CartItem> = [];

  constructor() {
    const storedItems = sessionStorage.getItem('cartItems');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  async addItem(item: Product) {
    console.log("hello world")
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  updateItem(index: number, quantity: number) {
    this.items[index].quantity = quantity;
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    sessionStorage.setItem('cartItems', JSON.stringify(this.items));
    return this.items;
  }

  getTotal() {
    const total = this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    return total.toFixed(2);
  }
}
