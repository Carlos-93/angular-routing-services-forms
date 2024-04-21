import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent {

  // Inicializamos el array para almacenar productos Apple de tipo Apple Watch
  products: Product[] = [];

  // Inyectamos el servicio Title y ProductsService para usar en el componente
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página usando el servicio Title
    this.titleService.setTitle('Apple (España) - Apple Watch');

    // Obtenemos todos los productos y almacenamos los resultados en 'products'
    this.products = [...this.ProductsService.shareData()];

    // Filtramos los productos para incluir solo aquellos del tipo 'Apple Watch'
    this.products = this.products.filter(product => product.type === 'Apple Watch');
  }
}