import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-macbook',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './macbook.component.html',
  styleUrls: ['./macbook.component.css']
})
export class MacbookComponent {

  // Recogemos el array de productos desde el servicio
  products = this.ProductsService.products;

  // Establecemos el título de la página y obtenemos los productos desde el servicio
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página
    this.titleService.setTitle('Apple (España) - MacBook');

    // Obtenemos los productos Apple desde el servicio
    this.products = this.ProductsService.productSignal();

    // Filtramos los productos para incluir solo aquellos de tipo 'Mac'
    this.products = this.products.filter(product => product.type === 'MacBook');

    window.scrollTo(0, 0);
  }
}