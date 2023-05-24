import { Component, OnInit, Input } from '@angular/core';
import { EMPTY_TYPE, Product } from '../types/types';
import { CartService } from '../services/cart.service';
import { SnackService } from '../services/snack.service';
import { ProductService } from '../services/products.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product = EMPTY_TYPE.EMPTY_PRODUCT;

  constructor(private cartService: CartService,
    private readonly snackService: SnackService,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  async addToCart() {
    await this.cartService.addItem(this.product);
    this.snackService.info("Item added to cart!");
  }

  async delete(){
    console.log(this.product);
    this.productService.deleteProduct(this.product.id).pipe(
      tap(() => {
        this.snackService.info("Item removed!");
        location.reload();
      })
    ).toPromise();
  }

}
