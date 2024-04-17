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
      image: './assets/images/iphone15-pro.png'
    },
    {
      reference: '53-002',
      name: 'iPhone 15',
      price: 999.99,
      description: 'The iPhone 15 is the most powerful and advanced smartphone ever created by Apple',
      type: 'iPhone',
      offer: true,
      image: './assets/images/iphone15.png'
    },
    {
      reference: '53-003',
      name: 'MacBook Pro M3',
      price: 1999.99,
      description: 'The MacBook Pro M3 is the most powerful and advanced laptop ever created by Apple',
      type: 'Mac',
      offer: false,
      image: './assets/images/macbook-pro-m3.png'
    },
    {
      reference: '53-004',
      name: 'MacBook Air M3',
      price: 999.99,
      description: 'The MacBook Air M3 is the most powerful and advanced laptop ever created by Apple',
      type: 'Mac',
      offer: true,
      image: './assets/images/macbook-air-m3.png'
    },
    {
      reference: '53-005',
      name: 'iPad Pro',
      price: 799.99,
      description: 'The iPad Pro is the most powerful and advanced tablet ever created by Apple',
      type: 'iPad',
      offer: false,
      image: './assets/images/ipad-pro.png'
    },
    {
      reference: '53-006',
      name: 'iPad Air',
      price: 499.99,
      description: 'The iPad Air is the most powerful and advanced tablet ever created by Apple',
      type: 'iPad',
      offer: true,
      image: './assets/images/ipad-air.png'
    },
    {
      reference: '53-007',
      name: 'Apple Watch Ultra 2',
      price: 399.99,
      description: 'The Apple Watch Ultra 2 is the most powerful and advanced smartwatch ever created by Apple',
      type: 'Apple Watch',
      offer: false,
      image: './assets/images/watch-ultra-2.png'
    },
    {
      reference: '53-008',
      name: 'Apple Watch SE',
      price: 199.99,
      description: 'The Apple Watch SE is the most powerful and advanced smartwatch ever created by Apple',
      type: 'Apple Watch',
      offer: true,
      image: './assets/images/watch-se.png'
    },
    {
      reference: '53-009',
      name: 'AirPods 5',
      price: 199.99,
      description: 'The AirPods 5 are the most powerful and advanced wireless earbuds ever created by Apple',
      type: 'AirPods',
      offer: false,
      image: './assets/images/iphone15-pro.png'
    },
    {
      reference: '53-010',
      name: 'AirPods Pro 5',
      price: 299.99,
      description: 'The AirPods Pro 5 are the most powerful and advanced wireless earbuds ever created by Apple',
      type: 'AirPods',
      offer: true,
      image: './assets/images/iphone15-pro.png'
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
    price: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    type: new FormControl('', [Validators.required]),
    offer: new FormControl(false),
    image: new FormControl('', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png)$/i)])
  });

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Admin Dashboard'); }

  // Método para seleccionar un archivo de imagen y obtener su nombre
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.product.image = file.name;
    }
  }

  // Método para eliminar un producto Apple del array
  deleteProduct(index: number) { this.products.splice(index, 1); }

  // Método para implementar la lógica de envío del formulario
  onSubmit() {

    // Comprobamos si el formulario es válido
    if (this.productForm.valid) {

      // Asignamos los valores del formulario al objeto producto
      Object.assign(this.product, this.productForm.value);

      // Eliminamos la ruta del archivo y nos quedamos con el nombre del archivo
      this.product.image = this.product.image.replace(/^.*[\\\/]/, '');

      // Añadimos la ruta de la imagen al objeto de producto
      this.product.image = './assets/images/' + this.product.image;

      // Añadimos el nuevo producto al array de productos
      this.products.push(this.product);

      // Reiniciamos el formulario
      this.productForm.reset();
    }
  }
}