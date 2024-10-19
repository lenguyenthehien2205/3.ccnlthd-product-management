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
  editingProduct: Product | null = null;

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

  addOrUpdateProduct(product: Product) {
    if (product.id) {
      this.productService.updateProduct(product).subscribe(
        (updatedProduct) => {
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.editingProduct = null;
        },
        (error) => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
      );
    } else {
      this.productService.addProduct(product).subscribe(
        (newProduct) => {
          this.products.push(newProduct);
        },
        (error) => {
          console.error('Lỗi khi thêm sản phẩm:', error);
        }
      );
    }
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

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }
}