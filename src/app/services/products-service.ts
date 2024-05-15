import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Signal para compartir los productos Apple entre componentes hermanos
  productSignal = signal<Product[]>([]);

  // URL de la API REST
  url: string = 'http://localhost:3000/api/products';

  // Inyectamos el servicio HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // Método GET para obtener los productos Apple de la API REST
  getAllProducts() {
    this.http.get<Product[]>(this.url)
      .pipe(catchError((error) => {
        console.error('Error is: ', error);
        return [];
      }))
      .subscribe((products) => {
        // Almacenamos los productos Apple en el array de productos
        this.productSignal.set(products);
      });
  }
}