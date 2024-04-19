import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Array de objetos de productos Apple
  products: Product[] = [
    {
      reference: '53-001',
      name: 'iPhone 15 Pro Max',
      price: 1299.99,
      description: 'The iPhone 15 Pro Max is the most powerful and advanced smartphone ever created by Apple',
      type: 'iPhone',
      offer: false,
      image: './assets/images/iphone15-pro.png'
    },
    {
      reference: '53-002',
      name: 'iPhone 15',
      price: 999.99,
      description: 'The iPhone 15 is the most powerful and advanced smartphone ever created by Apple',
      type: 'iPhone',
      offer: true,
      image: './assets/images/iphone15.png'
    },
    {
      reference: '53-003',
      name: 'MacBook Pro M3',
      price: 1999.99,
      description: 'The MacBook Pro M3 is the most powerful and advanced laptop ever created by Apple',
      type: 'Mac',
      offer: false,
      image: './assets/images/macbook-pro-m3.png'
    },
    {
      reference: '53-004',
      name: 'MacBook Air M3',
      price: 999.99,
      description: 'The MacBook Air M3 is the most powerful and advanced laptop ever created by Apple',
      type: 'Mac',
      offer: true,
      image: './assets/images/macbook-air-m3.png'
    },
    {
      reference: '53-005',
      name: 'iPad Pro',
      price: 799.99,
      description: 'The iPad Pro is the most powerful and advanced tablet ever created by Apple',
      type: 'iPad',
      offer: false,
      image: './assets/images/ipad-pro.png'
    },
    {
      reference: '53-006',
      name: 'iPad Air',
      price: 499.99,
      description: 'The iPad Air is the most powerful and advanced tablet ever created by Apple',
      type: 'iPad',
      offer: true,
      image: './assets/images/ipad-air.png'
    },
    {
      reference: '53-007',
      name: 'Apple Watch Ultra 2',
      price: 399.99,
      description: 'The Apple Watch Ultra 2 is the most powerful and advanced smartwatch ever created by Apple',
      type: 'Apple Watch',
      offer: false,
      image: './assets/images/watch-ultra-2.png'
    },
    {
      reference: '53-008',
      name: 'Apple Watch SE',
      price: 199.99,
      description: 'The Apple Watch SE is the most powerful and advanced smartwatch ever created by Apple',
      type: 'Apple Watch',
      offer: true,
      image: './assets/images/watch-se.png'
    },
    {
      reference: '53-009',
      name: 'AirPods Pro 2ª Gen',
      price: 199.99,
      description: 'The AirPods Pro 2ª Gen are the most powerful and advanced wireless earbuds ever created by Apple',
      type: 'AirPods',
      offer: false,
      image: './assets/images/airpods-pro-2gen.png'
    },
    {
      reference: '53-010',
      name: 'AirPods 3ª Gen',
      price: 299.99,
      description: 'The AirPods 3ª Gen are the most powerful and advanced wireless earbuds ever created by Apple',
      type: 'AirPods',
      offer: true,
      image: './assets/images/airpods-3gen.png'
    }
  ];

  // Signal para compartir los productos Apple entre componentes hermanos
  shareData = signal<Product[]>(this.products);

  constructor() { }
}