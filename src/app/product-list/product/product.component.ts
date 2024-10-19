import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product?: Product;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Product>();

  onDelete() {
    this.delete.emit(this.product?.id);
  }

  onEdit() {
    this.edit.emit(this.product);
  }
}