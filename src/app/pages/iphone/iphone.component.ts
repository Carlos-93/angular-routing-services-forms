import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-iphone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.css']
})
export class IphoneComponent {

  products: Product[] = [];

  // Establecemos el título de la página y obtenemos los productos desde el servicio
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página
    this.titleService.setTitle('Apple (España) - iPhone');

    // Obtenemos los productos desde el servicio y los almacenamos
    this.products = this.ProductsService.productSignal();

    // Filtramos los productos para incluir solo aquellos de tipo 'iPhone'
    this.products = this.products.filter(product => product.type === 'iPhone');

    window.scrollTo(0, 0);
  }
}