import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-airpods',
  standalone: true,
  imports: [],
  templateUrl: './airpods.component.html',
  styleUrl: './airpods.component.css'
})
export class AirpodsComponent {

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Our AirPods'); }
}