import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ipad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ipad.component.html',
  styleUrls: ['./ipad.component.css']
})
export class IpadComponent {

  // Inicializamos el array para almacenar productos Apple de tipo iPad
  products: Product[] = [];

  // Inyectamos el servicio Title y ProductsService para usar en el componente
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Establecemos el título de la página usando el servicio Title
    this.titleService.setTitle('Apple (España) - iPad');

    // Obtenemos todos los productos y almacenamos los resultados en 'products'
    this.products = [...this.ProductsService.shareData()];

    // Filtramos los productos para incluir solo aquellos del tipo 'iPad'
    this.products = this.products.filter(product => product.type === 'iPad');
  }
}