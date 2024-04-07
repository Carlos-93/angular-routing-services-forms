import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mac',
  standalone: true,
  imports: [],
  templateUrl: './mac.component.html',
  styleUrl: './mac.component.css'
})
export class MacComponent {

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Our Mac'); }
}