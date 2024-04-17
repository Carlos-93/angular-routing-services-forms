import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../../services/products-service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-iphone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './iphone.component.html',
  styleUrl: './iphone.component.css'
})
export class IphoneComponent {

  // Inicializamos el array de productos Apple
  products: Product[] = [];

  // Injectamos el servicio Title y ProductsService en el constructor
  constructor(private titleService: Title, private ProductsService: ProductsService) { }

  ngOnInit() {
    // Modificamos el title de la página utilizando el servicio Title
    this.titleService.setTitle('Apple (UK) - Ours iPhones');

    // 
    this.products = [...this.ProductsService.shareData()];

    // Filtramos los productos de tipo iPhone utilizando el método filter
    this.products = this.products.filter(product => product.type === 'iPhone');

  }
}