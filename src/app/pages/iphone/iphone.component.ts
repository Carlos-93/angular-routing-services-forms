import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-iphone',
  standalone: true,
  imports: [],
  templateUrl: './iphone.component.html',
  styleUrl: './iphone.component.css'
})
export class IphoneComponent {

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Our iPhone'); }
}