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
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Array de objetos de productos Apple
  products: Product[] = [
    {
      reference: '53-001',
      name: 'iPhone 15 Pro Max',
      price: 1299.99,
      description: 'The iPhone 15 Pro Max is the most powerful and advanced smartphone ever created by Apple',
      type: 'iPhone',
      offer: false,
      image: './assets/images/iphone-15-pro-max.png'
    },
    {
      reference: '53-002',
      name: 'iPhone 15',
      price: 999.99,
      description: 'The iPhone 15 is the most powerful and advanced smartphone ever created by Apple',
      type: 'iPhone',
      offer: true,
      image: './assets/images/iphone-15.png'
    },
    {
      reference: '53-003',
      name: 'MacBook Pro M3',
      price: 1999.99,
      description: 'The MacBook Pro M3 is the most powerful and advanced laptop ever created by Apple',
      type: 'Mac',
      offer: false,
      image: 'macbookprom3.jpg'
    },
    {
      reference: '53-004',
      name: 'MacBook Air M3',
      price: 999.99,
      description: 'The MacBook Air M3 is the most powerful and advanced laptop ever created by Apple',
      type: 'Mac',
      offer: true,
      image: 'macbookairm3.jpg'
    },
    {
      reference: '53-005',
      name: 'iPad Pro 15',
      price: 799.99,
      description: 'The iPad Pro 15 is the most powerful and advanced tablet ever created by Apple',
      type: 'iPad',
      offer: false,
      image: 'ipadpro15.jpg'
    },
    {
      reference: '53-006',
      name: 'iPad 15',
      price: 499.99,
      description: 'The iPad 15 is the most powerful and advanced tablet ever created by Apple',
      type: 'iPad',
      offer: true,
      image: 'ipad15.jpg'
    },
    {
      reference: '53-007',
      name: 'Apple Watch 15',
      price: 399.99,
      description: 'The Apple Watch 15 is the most powerful and advanced smartwatch ever created by Apple',
      type: 'Apple Watch',
      offer: false,
      image: 'applewatch15.jpg'
    },
    {
      reference: '53-008',
      name: 'Apple Watch SE 15',
      price: 199.99,
      description: 'The Apple Watch SE 15 is the most powerful and advanced smartwatch ever created by Apple',
      type: 'Apple Watch',
      offer: true,
      image: 'applewatchse15.jpg'
    },
    {
      reference: '53-009',
      name: 'AirPods 5',
      price: 199.99,
      description: 'The AirPods 5 are the most powerful and advanced wireless earbuds ever created by Apple',
      type: 'AirPods',
      offer: false,
      image: 'airpods5.jpg'
    },
    {
      reference: '53-010',
      name: 'AirPods Pro 5',
      price: 299.99,
      description: 'The AirPods Pro 5 are the most powerful and advanced wireless earbuds ever created by Apple',
      type: 'AirPods',
      offer: true,
      image: 'airpodspro5.jpg'
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