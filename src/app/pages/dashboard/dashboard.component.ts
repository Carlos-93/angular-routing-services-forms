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

  // Establecemos el título de la página y configuramos el formulario de productos Apple con validaciones
  constructor(private titleService: Title, private ProductsService: ProductsService) {
    this.productForm = new FormGroup({
      reference: new FormControl('', { validators: [Validators.required, Validators.minLength(1), Validators.maxLength(20), this.referenceStartNumber()] }),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      price: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
      type: new FormControl('', [Validators.required]),
      offer: new FormControl(false),
      image: new FormControl('', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png)$/i)])
    });
  }

  // Inicializamos el objeto producto con valores por defecto
  product: Product = {
    reference: '', name: '', price: 0, description: '', type: '', offer: false, image: ''
  };

  referenceStartNumber(): ValidatorFn {
    // Método para comprobar si la referencia del producto introducido empieza por un número
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Obtenemos la referencia del producto
      const reference = control.value;
      // Si la referencia no empieza por un número, devolvemos un error
      if (reference && !/^[0-9]/.test(reference)) {
        return { 'uniqueReference': { value: control.value } };
      }
      return null;
    };
  }

  searchProduct(event: any) {
    // Método para buscar productos Apple en el array de productos
    const search = event.target.value.toLowerCase();
    // Filtramos los productos Apple por nombre o referencia
    this.products = this.ProductsService.productSignal().filter((product: Product) => {
      return product.name.toLowerCase().includes(search) || product.reference.toLowerCase().includes(search);
    });
  }

  sortProducts(event: any) {
    // Método para ordenar los productos Apple por precio, nombre o oferta
    const value = event.target.value;
    // Ordenamos los productos Apple según el valor seleccionado
    switch (value) {
      case 'Referencia':
        this.products = [...this.products].sort((a, b) => a.reference.localeCompare(b.reference));
        break;
      case 'Precio Ascendente':
        this.products = [...this.products].sort((a, b) => a.price - b.price);
        break;
      case 'Precio Descendente':
        this.products = [...this.products].sort((a, b) => b.price - a.price);
        break;
      case 'Nombre Ascendente':
        this.products = [...this.products].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Nombre Descendente':
        this.products = [...this.products].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Dispositivos en Oferta':
        this.products = [...this.products].filter(p => p.offer).concat(this.products.filter(p => !p.offer));
        break;
    }
  }

  selectImage(event: any) {
    // Método para seleccionar un archivo de imagen y obtener su nombre
    if (event.target.files.length > 0) {
      // Obtenemos el archivo seleccionado
      const file = event.target.files[0];
      // Añadimos el nombre del archivo al input de imagen
      this.product.image = file.name;
    }
  }

  deleteProduct(index: number) {
    // Método para eliminar un producto Apple del array de productos
    this.products.splice(index, 1);
    // Enviamos la eliminación del producto al servicio
    this.ProductsService.productSignal.set(this.products);
  }

  ngOnInit(): void {
    // Establecemos el título de la página
    this.titleService.setTitle('Apple (España) - Panel de Control');
    // Obtenemos los productos Apple a través de la API
    this.ProductsService.getProducts();
    // Obtenemos los productos Apple del servicio
    this.products = this.ProductsService.productSignal();
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Verificamos si estamos editando un producto o añadiendo uno nuevo
      if (this.isEditing) {
        this.updateProduct();
      } else {
        this.addNewProduct();
      }
      this.showPopup = true;
      // Mostramos un mensaje de confirmación en el popup
      this.popupMessage = this.isEditing ? 'Producto editado correctamente' : 'Producto añadido correctamente';
      // El popup se ocultará automáticamente después de 3 segundos
      setTimeout(() => { this.showPopup = false; }, 3000);
      // Reiniciamos el estado de edición y el formulario
      this.isEditing = false;
      this.productForm.reset();
    }
  }

  addNewProduct() {
    // Creamos un nuevo producto Apple con los datos del formulario
    const newProduct: Product = this.createProductForm();
    // Eliminamos la ruta del archivo y nos quedamos con el nombre del archivo
    newProduct.image = newProduct.image.replace(/^.*[\\\/]/, '');
    // Añadimos la ruta de la imagen al objeto de producto
    newProduct.image = './assets/images/' + newProduct.image;
    // Añadimos el nuevo producto al servicio
    this.ProductsService.createProduct(newProduct);
    // Enviamos el array de productos al servicio
    this.ProductsService.productSignal.set(this.products);
  }

  updateProduct() {
    // Creamos un producto Apple con los datos del formulario
    const updateProduct: Product = this.createProductForm();
    // Eliminamos la ruta del archivo y nos quedamos con el nombre del archivo
    updateProduct.image = updateProduct.image.replace(/^.*[\\\/]/, '');
    // Añadimos la ruta de la imagen al objeto de producto
    updateProduct.image = './assets/images/' + updateProduct.image;
    // Obtenemos el índice del producto a actualizar
    const index = this.products.findIndex(product => product.reference === updateProduct.reference);
    // Actualizamos el producto en el array de productos
    this.products[index] = updateProduct;
    // Enviamos el producto actualizado al servicio
    this.ProductsService.productSignal.set(this.products);
  }

  createProductForm(): Product {
    // Método para crear un objeto producto con los datos del formulario
    return {
      reference: this.productForm.value.reference ? this.productForm.value.reference : '',
      name: this.productForm.value.name ? this.productForm.value.name : '',
      price: this.productForm.value.price ? this.productForm.value.price : 0,
      description: this.productForm.value.description ? this.productForm.value.description : '',
      type: this.productForm.value.type ? this.productForm.value.type : '',
      offer: this.productForm.value.offer ? this.productForm.value.offer : false,
      image: this.productForm.value.image ? this.productForm.value.image : ''
    }
  }

  searchReference() {
    // Buscamos la referencia del producto en el array de productos
    const reference = this.productForm.value.reference;
    // Comprobamos si la referencia ya existe en el array de productos
    const product = this.products.find(product => product.reference === reference);
    // Si la referencia ya existe, completamos el formulario con los datos de ese producto
    if (product) {
      this.isEditing = true;
      this.autocompleteForm(product);
    }
  }

  autocompleteForm(product: Product) {
    // Método para autocompletar el formulario con los datos del producto seleccionado
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