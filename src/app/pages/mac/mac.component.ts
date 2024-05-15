import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mac',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mac.component.html',
  styleUrls: ['./mac.component.css']
})
export class MacComponent {

  // Inicializamos un array vacío para almacenar los productos Apple
  products: Product[] = [];

  // Establecemos el título de la página y obtenemos los productos desde el servicio
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página
    this.titleService.setTitle('Apple (España) - MacBook');

    // Obtenemos los productos desde el servicio y los almacenamos
    this.products = this.ProductsService.productSignal();

    // Filtramos los productos para incluir solo aquellos de tipo 'Mac'
    this.products = this.products.filter(product => product.type === 'Mac');

    window.scrollTo(0, 0);
  }
}