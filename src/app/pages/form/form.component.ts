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