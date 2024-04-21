import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductsService } from '../../services/products-service';
import { PopupComponent } from '../../components/popup/popup.component';
import { Product } from '../../interfaces/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PopupComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productForm: FormGroup;
  products = this.ProductsService.products;
  isEditing: boolean = false;
  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(private titleService: Title, private ProductsService: ProductsService) {
    this.productForm = new FormGroup({
      reference: new FormControl('', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20), this.uniqueReference()] }),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      price: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      type: new FormControl('', [Validators.required]),
      offer: new FormControl(false),
      image: new FormControl('', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png)$/i)])
    });
  }

  product: Product = {
    reference: '', name: '', price: 0, description: '', type: '', offer: false, image: ''
  };

  // Método para que la referencia del producto empiece por un número (Validador personalizado)
  uniqueReference(): ValidatorFn {
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
    const reference = this.productForm.value.reference;
    const product = this.products.find(product => product.reference === reference);
    if (product) {
      this.isEditing = true;
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

  ngOnInit(): void {
    this.titleService.setTitle('Apple (UK) - Admin Dashboard');
    this.products = this.ProductsService.shareData();
  }

  onSubmit() {
    // Verificamos si el formulario es válido antes de enviar los datos
    if (this.productForm.valid) {
      // Verificamos si estamos editando un producto o añadiendo uno nuevo
      if (this.isEditing) {
        const index = this.products.findIndex(product => product.reference === this.productForm.value.reference);
        this.products[index] = this.productForm.value;
      } else {
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
      }
      // Mostramos el popup
      this.showPopup = true;
      // Mostramos el mensaje en el popup dependiendo si estamos editando o añadiendo un producto
      this.popupMessage = this.isEditing ? 'Producto editado correctamente' : 'Producto añadido correctamente';
      // Cerramos el popup después de 3 segundos
      setTimeout(() => {
        this.showPopup = false;
      }, 3000);
      // Reiniciamos el formulario y el estado de edición
      this.isEditing = false;
      this.productForm.reset();
    }
  }
}