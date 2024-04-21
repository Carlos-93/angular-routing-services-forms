import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-airpods',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airpods.component.html',
  styleUrls: ['./airpods.component.css']
})
export class AirpodsComponent {

  // Inicializamos el array para almacenar productos Apple de tipo AirPods
  products: Product[] = [];

  // Inyectamos el servicio Title y ProductsService para usar en el componente
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página usando el servicio Title
    this.titleService.setTitle('Apple (España) - Airpods');

    // Obtenemos todos los productos y almacenamos los resultados en 'products'
    this.products = [...this.ProductsService.productSignal()];

    // Filtramos los productos para incluir solo aquellos del tipo 'AirPods'
    this.products = this.products.filter(product => product.type === 'AirPods');
  }
}