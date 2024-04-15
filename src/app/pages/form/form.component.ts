import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Interface para el formulario de productos
export interface Product {
  reference: string;
  name: string;
  price: number;
  description: string;
  type: string;
  offer: boolean;
  image: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // Array de productos con datos de ejemplo
  products: Product[] = [
    {
      reference: 'A1',
      name: 'iPhone 12 Pro Max',
      price: 1099,
      description: 'The iPhone 12 Pro Max is the best iPhone money can buy, with the best cameras, the longest battery life and the largest screen ever on an iPhone.',
      type: 'Smartphone',
      offer: false,
      image: 'iphone-12-pro-max.jpg'
    },
    {
      reference: 'A2',
      name: 'MacBook Pro 13"',
      price: 1299,
      description: 'The MacBook Pro 13-inch is the best Mac laptop for most users, with fast performance, a great Retina display, and a portable size.',
      type: 'Laptop',
      offer: true,
      image: 'macbook-pro-13.jpg'
    },
    {
      reference: 'A3',
      name: 'iPad Pro 12.9"',
      price: 999,
      description: 'The iPad Pro 12.9-inch is the best tablet you can buy, with blazing speed, long battery life, improved cameras and trackpad support.',
      type: 'Tablet',
      offer: false,
      image: 'ipad-pro-12.jpg'
    },
    {
      reference: 'A4',
      name: 'Apple Watch Series 6',
      price: 399,
      description: 'The Apple Watch Series 6 is the best smartwatch Apple has ever made, with an all-new blood oxygen monitor, stronger fitness tracking, and faster charging.',
      type: 'Smartwatch',
      offer: true,
      image: 'apple-watch-6.jpg'
    },
    {
      reference: 'A5',
      name: 'AirPods Pro',
      price: 249,
      description: 'The AirPods Pro are the best wireless earbuds you can buy, with active noise cancellation, a comfortable in-ear design, and sweat and water resistance.',
      type: 'Headphones',
      offer: false,
      image: 'airpods-pro.jpg'
    }

  ];    

  // Inicializamos el objeto de la interfaz con los valores por defecto
  product: Product = {
    reference: '',
    name: '',
    price: 0,
    description: '',
    type: '',
    offer: false,
    image: ''
  };

  // Objeto FormGroup para el formulario de productos
  productForm = new FormGroup({
    
    // Definimos los campos del formulario con sus respectivas validaciones
    reference: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    type: new FormControl('', [Validators.required]),
    offer: new FormControl(false),
    image: new FormControl('', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png)$/i)])
  });

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Admin Dashboard'); }

  // Método para implementar la lógica de envío del formulario
  onSubmit() {

    // Comprobamos si el formulario es válido
    if (this.productForm.valid) {

      // Actualizamos el objeto product con los valores ingresados en el formulario
      Object.assign(this.product, this.productForm.value);

      // Reiniciamos el formulario
      this.productForm.reset();
    }
  }
}