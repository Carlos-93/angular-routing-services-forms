import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Almacenamos el estado de éxito del modal
  success: boolean = false;

  // Almacenamos en products el array de productos Apple ubicado en el servicio
  products = this.ProductsService.products;

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

  // Configuramos el formulario con validaciones para cada campo
  productForm = new FormGroup({
    reference: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
    type: new FormControl('', [Validators.required]),
    offer: new FormControl(false),
    image: new FormControl('', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png)$/i)])
  });

  // Inyectamos el servicio Title y ProductsService para usar en el componente
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit(): void {
    // Establecemos el título de la página usando el servicio Title
    this.titleService.setTitle('Apple (UK) - Admin Dashboard');
    // Obtenemos todos los productos y almacenamos los resultados en 'products'
    this.products = [...this.ProductsService.shareData()];
  }

  // Método para seleccionar un archivo de imagen y obtener su nombre
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.product.image = file.name;
    }
  }

  // Método para eliminar un producto Apple del array
  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.ProductsService.shareData.set(this.products);
  }

  // Método para cerrar el modal de éxito transcurridos 3 segundos
  closeModal() {
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }

  onSubmit() {
    // Verificamos si el formulario es válido antes de enviar los datos
    if (this.productForm.valid) {
      // Asignamos los valores del formulario al objeto producto
      Object.assign(this.product, this.productForm.value);
      // Eliminamos la ruta del archivo y nos quedamos con el nombre del archivo
      this.product.image = this.product.image.replace(/^.*[\\\/]/, '');
      // Añadimos la ruta de la imagen al objeto de producto
      this.product.image = './assets/images/' + this.product.image;
      // Añadimos el nuevo producto al array de productos
      this.products.push(this.product);
      // Enviamos los datos al servicio
      this.ProductsService.shareData.set(this.products);
      // Mostramos el modal de éxito
      this.success = true;
      // Cerramos el modal de éxito transcurridos 3 segundos
      this.closeModal();
      // Reiniciamos el formulario
      this.productForm.reset();
    }
  }
}