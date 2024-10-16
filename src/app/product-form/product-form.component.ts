import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../product-list/product/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Output() addProduct = new EventEmitter<Product>();

  product: Product = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  onSubmit() {
    this.addProduct.emit(this.product);
    this.resetForm();
  }

  resetForm() {
    this.product = {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: ''
    };
  }
}
