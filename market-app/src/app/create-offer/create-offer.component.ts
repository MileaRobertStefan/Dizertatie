import { Component, OnInit } from '@angular/core';
import { EMPTY_TYPE, Product } from '../types/types';
import { ProductService } from '../services/products.service';
import { catchError, map, tap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {
  currencies: string[] = ['EUR', 'USD', 'GBP', 'AUD', 'CAD'];
  conditions: string[] = ['Good', 'New', 'Used', 'Damaged'];

  product: Product = EMPTY_TYPE.EMPTY_PRODUCT;
  photoUrl: string = "";
  photoUrls: string[] = [];


  constructor(
    private readonly productService: ProductService,
    private readonly snackService: SnackService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.addProduct(this.product).pipe(
      tap(response => {
        this.snackService.info("Offer posted!");
        return response;
      }),
      catchError(error => {
        this.snackService.error("An error has occurred!");
        return throwError(error);
      })
    ).subscribe();
    
    console.log('Submitting product', this.product, this.photoUrl);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.product.photos = [...this.product.photos, reader.result as string];
    };
  }

  addPhotoUrl(): void {
    if (this.photoUrl) {
      this.product.photos = [...this.product.photos, this.photoUrl];
      this.photoUrl = '';
    }
  }

  removePhotoUrl(index: number) {
    this.product.photos.splice(index, 1);
  }
}
