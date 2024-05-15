import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Array vacío para almacenar los productos Apple
  products: Product[] = [];

  // Signal para compartir los productos Apple entre componentes hermanos
  productSignal = signal<Product[]>([]);

  // Inyectamos el servicio HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // Método para obtener los productos Apple
  getProducts() {
    this.http.get<Product[]>('http://localhost:3000/api/products').subscribe((products) => {
      this.productSignal.set(products);
    });
  }
}