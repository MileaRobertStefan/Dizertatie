import { Component, OnInit } from '@angular/core';
import { Product } from '../types/types';
import { C } from '../types/const';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
  ) {

  }

  products: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe( data => this.products = data);
    console.log(this.products)
  }

  addToCart(product: Product) {
    console.log(`Product ${product.id} added to cart`);
    // TODO: Implement cart functionality
  }

}
