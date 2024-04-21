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

  // Inicializamos el array para almacenar productos Apple de tipo Mac
  products: Product[] = [];

  // Inyectamos el servicio Title y ProductsService para usar en el componente
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página usando el servicio Title
    this.titleService.setTitle('Apple (España) - MacBook');

    // Obtenemos todos los productos y almacenamos los resultados en 'products'
    this.products = [...this.ProductsService.shareData()];

    // Filtramos los productos para incluir solo aquellos del tipo 'Mac'
    this.products = this.products.filter(product => product.type === 'Mac');
  }
}