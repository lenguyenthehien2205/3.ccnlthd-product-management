import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly STORAGE_KEY = 'products';
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const storedProducts = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (storedProducts.length > 0) {
      return of(storedProducts);
    } else {
      return this.http.get<Product[]>(this.apiUrl).pipe(
        tap(products => {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
        })
      );
    }
  }

  addProduct(product: Product): Observable<Product> {
    const products = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    product.id = this.generateId(products);
    products.push(product);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return of(product);
  }

  deleteProduct(id: number): Observable<any> {
    const products = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const updatedProducts = products.filter((p: Product) => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProducts));
    return of(null);
  }

  private generateId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(p => p.id || 0)) + 1 : 1;
  }
  updateProduct(product: Product): Observable<Product> {
    const products = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    const index = products.findIndex((p: Product) => p.id === product.id);
    if (index !== -1) {
      products[index] = product;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    }
    return of(product);
  }
}