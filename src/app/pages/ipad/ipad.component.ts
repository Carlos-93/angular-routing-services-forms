import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products-service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ipad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ipad.component.html',
  styleUrls: ['./ipad.component.css']
})
export class IpadComponent {

  // Recogemos el array de productos desde el servicio
  products = this.ProductsService.products;

  // Establecemos el título de la página y obtenemos los productos desde el servicio
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página
    this.titleService.setTitle('Apple (España) - iPad');

    // Filtramos los productos para incluir solo aquellos de tipo 'iPad'
    this.products = this.products.filter(product => product.type === 'iPad');

    window.scrollTo(0, 0);
  }
}