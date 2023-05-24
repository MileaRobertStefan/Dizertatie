import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types/types';


@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
  
    private apiUrl = 'http://localhost:3001/api/v1/products';
  
    constructor(private http: HttpClient) {}
  
    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.apiUrl);
    }
   
    getProductById(id: number): Observable<Product> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Product>(url);
    }
  
    addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product);
    }
  
    updateProduct(product: Product): Observable<Product> {
      const url = `${this.apiUrl}/${product.id}`;
      return this.http.put<Product>(url, product);
    }
  
    deleteProduct(id: number): Observable<Product> {
      const url = `${this.apiUrl}/${id}`;
      console.log(url)
      return this.http.delete<Product>(url);
    }
  }