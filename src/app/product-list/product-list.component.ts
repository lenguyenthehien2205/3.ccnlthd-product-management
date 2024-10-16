import { Component, OnInit } from '@angular/core';
import { Product } from './product/product.model';
import { ProductService } from './product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    );
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe(
      (newProduct) => {
        this.products.push(newProduct);
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm:', error);
      }
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== id);
      },
      (error) => {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
    );
  }
}