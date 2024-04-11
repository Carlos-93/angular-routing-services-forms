import { Component, OnInit } from '@angular/core';
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
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Admin Dashboard'); }

  // Creamos un objeto del tipo de la inteface para guardar los datos en él y lo inicializamos
  product: Product = {
    reference: '',
    name: '',
    price: 0,
    description: '',
    type: '',
    offer: false,
    image: ''
  };

  // Formulario para insertar un nuevo producto
  ProductForm = new FormGroup({
    reference: new FormControl('', [Validators.required, Validators.minLength(1)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    type: new FormControl('', [Validators.required]),
    offer: new FormControl(''),
    image: new FormControl('', [Validators.required])
  });

  // Método para implementar la lógica de envío del formulario
  onSubmit() {

    // Si el formulario es válido, guardamos los datos en el objeto product
    if (this.ProductForm.valid) {
      this.product.reference = this.ProductForm.value.reference ? this.ProductForm.value.reference : '';
      this.product.name = this.ProductForm.value.name ? this.ProductForm.value.name : '';
      this.product.price = this.ProductForm.value.price ? Number(this.ProductForm.value.price) : 0;
      this.product.description = this.ProductForm.value.description ? this.ProductForm.value.description : '';
      this.product.type = this.ProductForm.value.type ? this.ProductForm.value.type : '';
      this.product.offer = this.ProductForm.value.offer ? Boolean(this.ProductForm.value.offer) : false;
      this.product.image = this.ProductForm.value.image ? this.ProductForm.value.image : '';

      // Reiniciamos el formulario
      this.ProductForm.reset();
    }
  }
}