import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
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
    reference: new FormControl('', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20), this.checkUniqueReference()] }),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    price: new FormControl(0, [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
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

  // Método para que la referencia del producto empiece por un número
  checkUniqueReference(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const reference = control.value;
      if (reference && !/^[0-9]/.test(reference)) {
        return { 'uniqueReference': { value: control.value } };
      }
      return null;
    };
  }

  // Método para comprobar si la referencia del producto ya existe
  checkReference() {
    const reference = this.productForm.get('reference')?.value;
    const product = this.products.find(product => product.reference === reference);
    if (product) {
      this.productForm.setValue({
        reference: product.reference,
        name: product.name,
        price: product.price,
        description: product.description,
        type: product.type,
        offer: product.offer,
        image: product.image
      });
    }
  }

  // Método para filtrar el producto Apple que introduzcamos en el input de búsqueda con id 'search'
  searchProduct(event: any) {
    // Obtenemos el valor del input de búsqueda
    const search = event.target.value.toLowerCase();
    // Filtramos los productos Apple por nombre o referencia
    this.products = this.ProductsService.shareData().filter((product: Product) => {
      return product.name.toLowerCase().includes(search) || product.reference.toLowerCase().includes(search);
    });
  }

  // Método para ordenar los productos Apple por precio, nombre o oferta
  sortProducts(event: any) {
    // Obtenemos el valor del select de ordenación
    const value = event.target.value;
    // Obtenemos los productos una vez
    const products = this.ProductsService.shareData();
    // Ordenamos los productos según el valor seleccionado en el select
    switch (value) {
      case 'Referencia':
        this.products = products.sort((a, b) => a.reference.localeCompare(b.reference));
        break;
      case 'Precio Ascendente':
        this.products = products.sort((a, b) => a.price - b.price);
        break;
      case 'Precio Descendente':
        this.products = products.sort((a, b) => b.price - a.price);
        break;
      case 'Nombre Ascendente':
        this.products = products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Nombre Descendente':
        this.products = products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Productos en Oferta':
        this.products = products.filter(p => p.offer).concat(products.filter(p => !p.offer));
        break;
    }
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