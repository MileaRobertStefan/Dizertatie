import { Injectable } from '@angular/core';
import { Product } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Array<Product & { quantity: number }> = [];

  addItem(item: Product) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  updateItem(index: number, quantity: number) {
    this.items[index].quantity = quantity;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}