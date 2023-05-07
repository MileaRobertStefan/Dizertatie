import { Component, OnInit, Input } from '@angular/core';
import { EMPTY_TYPE, Product } from '../types/types';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  
  @Input() product: Product = EMPTY_TYPE.EMPTY_PRODUCT;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addItem(this.product);
  }

}
