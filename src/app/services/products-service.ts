import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Inicializamos el array de productos Apple
  products: Product[] = [];

  // Signal para compartir los productos Apple entre componentes hermanos
  productSignal = signal<Product[]>([]);

  // URL de la API REST
  apiURL: string = 'http://localhost:3000/api/products';

  // Inyectamos el servicio HttpClient en el constructor
  constructor(private http: HttpClient) { }

  getAllProducts() {
    this.http.get<Product[]>(this.apiURL).subscribe((products) => {
      this.productSignal.set(products);
    })
  }
}