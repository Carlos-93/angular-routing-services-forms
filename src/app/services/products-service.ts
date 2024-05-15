import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Array vacío para almacenar los productos Apple
  products: Product[] = [];
  
  // Signal para compartir los productos Apple entre componentes hermanos
  productSignal = signal<Product[]>([]);

  // URL de la API REST
  url: string = 'http://localhost:3000/api/products';

  // Inyectamos el servicio HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // Método GET para obtener los productos Apple de la API REST
  getProducts() {
    this.http.get<Product[]>(this.url)
      .pipe(catchError((error) => {
        console.error('Error is: ', error);
        return [];
      }))
      .subscribe((products) => {
        // Actualizamos el signal con los productos obtenidos
        this.productSignal.set(products);
      });
  }

  // Método GET para obtener un producto por referencia
  getProduct(reference: string) {
    return this.http.get<Product>(`${this.url}/${reference}`);
  }

  // Método POST para crear un producto
  createProduct(product: Product) {
    return this.http.post<Product>(this.url, product);
  }

  // Método PUT para actualizar un producto
  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.url}/${product.reference}`, product);
  }

  // Método DELETE para eliminar un producto
  deleteProduct(reference: string) {
    return this.http.delete<Product>(`${this.url}/${reference}`);
  }
}