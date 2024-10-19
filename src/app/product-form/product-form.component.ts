import { Component, EventEmitter, Output, ViewChild, ElementRef, SimpleChanges, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product-list/product/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnChanges{
  @Input() product: Product | null = null;
  @Output() addOrUpdateProduct = new EventEmitter<Product>();
  @Output() cancelEdit = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  productForm: FormGroup;
  selectedFile: File | null = null;
  imageError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      image: ['']
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (this.productForm.valid && !this.imageError) {
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const product: Product = {
            ...this.productForm.value,
            image: e.target.result
          };
          this.addOrUpdateProduct.emit(product);
          this.resetForm();
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.addOrUpdateProduct.emit(this.productForm.value);
        this.resetForm();
      }
    }
  }
  resetForm() {
    this.productForm.reset({
      id: null,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: ''
    });
    this.selectedFile = null;
    this.imageError = null;
    this.cancelEdit.emit();
  }

  get title() { return this.productForm.get('title'); }
  get price() { return this.productForm.get('price'); }
  get description() { return this.productForm.get('description'); }
  get category() { return this.productForm.get('category'); }
}