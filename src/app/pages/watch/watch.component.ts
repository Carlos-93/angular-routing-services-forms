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

  // Inicializamos un array vacío para almacenar los productos Apple
  products: Product[] = [];

  // Establecemos el título de la página y obtenemos los productos desde el servicio
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página
    this.titleService.setTitle('Apple (España) - Apple Watch');

    // Obtenemos los productos desde el servicio y los almacenamos
    this.products = this.ProductsService.productSignal();

    // Filtramos los productos para incluir solo aquellos de tipo 'Apple Watch'
    this.products = this.products.filter(product => product.type === 'Apple Watch');

    window.scrollTo(0, 0);
  }
}