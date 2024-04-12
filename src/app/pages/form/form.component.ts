import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Interface para el formulario de productos
export interface product {
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

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Admin Dashboard'); }

  // Inicializamos el objeto de la interfaz con los valores por defecto
  product: product = {
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
    // Campos del formulario con sus respectivas validaciones
    reference: new FormControl('', [Validators.required, Validators.minLength(1)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    type: new FormControl('', [Validators.required]),
    offer: new FormControl(false),
    image: new FormControl('', [Validators.required])
  });

  // Método para implementar la lógica de envío del formulario
  onSubmit() {

    if (this.productForm.valid) {
      // Si el formulario es válido, guardamos los datos en el objeto product
      this.product.reference = this.productForm.value.reference ? this.productForm.value.reference : '';
      this.product.name = this.productForm.value.name ? this.productForm.value.name : '';
      this.product.price = this.productForm.value.price ? Number(this.productForm.value.price) : 0;
      this.product.description = this.productForm.value.description ? this.productForm.value.description : '';
      this.product.type = this.productForm.value.type ? this.productForm.value.type : '';
      this.product.offer = this.productForm.value.offer ? Boolean(this.productForm.value.offer) : false;
      this.product.image = this.productForm.value.image ? this.productForm.value.image : '';

      // Reiniciamos el formulario
      this.productForm.reset();
    }
  }
}