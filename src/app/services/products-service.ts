import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Inicializamos el array para almacenar los productos
  products: Product[] = [];

  // Signal para compartir los productos Apple entre componentes hermanos
  productSignal = signal<Product[]>([]);

  // URL de la API REST
  apiURL: string = 'http://localhost:3000/api/products';

  // Inyectamos el servicio HttpClient en el constructor
  constructor(private http: HttpClient) {
    this.getAllProducts();
  }

  // Método GET para obtener todos los productos
  getAllProducts() {
    this.http.get<Product[]>(this.apiURL)
      .pipe(catchError(error => {
        console.error('Error when obtaining the products:', error);
        return [];
      }))
      .subscribe((products) => {
        this.productSignal.set(products);
      });
  }

  // Método POST para crear un producto
  createProduct(product: Product) {
    this.http.post<Product>(this.apiURL, product)
      .pipe(catchError(error => {
        console.error('Error when creating the product:', error);
        return [];
      }))
      .subscribe(() => {
        this.getAllProducts();
      });
  }
}