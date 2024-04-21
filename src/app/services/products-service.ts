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
      description: 'El iPhone 15 Pro Max es el smartphone más potente y avanzado jamás creado por Apple',
      type: 'iPhone',
      offer: false,
      image: './assets/images/iphone15-pro.png'
    },
    {
      reference: '53-002',
      name: 'iPhone 15',
      price: 999.99,
      description: 'El iPhone 15 es el smartphone más potente y avanzado jamás creado por Apple',
      type: 'iPhone',
      offer: true,
      image: './assets/images/iphone15.png'
    },
    {
      reference: '53-003',
      name: 'iPhone 15 Plus',
      price: 1099.99,
      description: 'El iPhone 15 Plus es el smartphone más potente y avanzado jamás creado por Apple',
      type: 'iPhone',
      offer: false,
      image: './assets/images/iphone15-plus.png'
    },
    {
      reference: '53-004',
      name: 'MacBook Pro M3',
      price: 1999.99,
      description: 'El MacBook Pro M3 es el portátil más potente y avanzado jamás creado por Apple',
      type: 'Mac',
      offer: false,
      image: './assets/images/macbook-pro-m3.png'
    },
    {
      reference: '53-005',
      name: 'MacBook Air M3',
      price: 999.99,
      description: 'El MacBook Air M3 es el portátil más potente y avanzado jamás creado por Apple',
      type: 'Mac',
      offer: true,
      image: './assets/images/macbook-air-m3.png'
    },
    {
      reference: '53-006',
      name: 'MacBook Pro M2',
      price: 1499.99,
      description: 'El MacBook Pro M2 es el portátil más potente y avanzado jamás creado por Apple',
      type: 'Mac',
      offer: false,
      image: './assets/images/macbook-pro-m2.png'
    },
    {
      reference: '53-007',
      name: 'iPad Pro',
      price: 799.99,
      description: 'El iPad Pro es la tablet más potente y avanzada jamás creada por Apple',
      type: 'iPad',
      offer: false,
      image: './assets/images/ipad-pro.png'
    },
    {
      reference: '53-008',
      name: 'iPad Air',
      price: 499.99,
      description: 'El iPad Air es la tablet más potente y avanzada jamás creada por Apple',
      type: 'iPad',
      offer: true,
      image: './assets/images/ipad-air.png'
    },
    {
      reference: '53-009',
      name: 'iPad Mini',
      price: 399.99,
      description: 'El iPad Mini es la tablet compacta más potente y avanzada jamás creada por Apple',
      type: 'iPad',
      offer: false,
      image: './assets/images/ipad-mini.png'
    },
    {
      reference: '53-010',
      name: 'Apple Watch Ultra 2',
      price: 399.99,
      description: 'El Apple Watch Ultra 2 es el smartwatch más potente y avanzado jamás creado por Apple',
      type: 'Apple Watch',
      offer: false,
      image: './assets/images/watch-ultra-2.png'
    },
    {
      reference: '53-011',
      name: 'Apple Watch SE',
      price: 199.99,
      description: 'El Apple Watch SE es el smartwatch más potente y avanzado jamás creado por Apple',
      type: 'Apple Watch',
      offer: true,
      image: './assets/images/watch-se.png'
    },
    {
      reference: '53-012',
      name: 'Apple Watch Series 7',
      price: 499.99,
      description: 'El Apple Watch Series 7 es el smartwatch más avanzado y con más funcionalidades jamás creado por Apple',
      type: 'Apple Watch',
      offer: false,
      image: './assets/images/watch-series7.png'
    },
    {
      reference: '53-013',
      name: 'AirPods Pro 2ª Gen',
      price: 199.99,
      description: 'Los AirPods Pro 2ª Gen son los auriculares inalámbricos más potentes y avanzados jamás creados por Apple',
      type: 'AirPods',
      offer: false,
      image: './assets/images/airpods-pro-2gen.png'
    },
    {
      reference: '53-014',
      name: 'AirPods 3ª Gen',
      price: 299.99,
      description: 'Los AirPods 3ª Gen son los auriculares inalámbricos más potentes y avanzados jamás creados por Apple',
      type: 'AirPods',
      offer: true,
      image: './assets/images/airpods-3gen.png'
    },
    {
      reference: '53-015',
      name: 'AirPods Max',
      price: 549.99,
      description: 'Los AirPods Max son los auriculares de diadema más avanzados y con mejor calidad de sonido jamás creados por Apple',
      type: 'AirPods',
      offer: false,
      image: './assets/images/airpods-max.png'
    }
  ];

  // Signal para compartir los productos Apple entre componentes hermanos
  shareData = signal<Product[]>(this.products);

  constructor() { }
}