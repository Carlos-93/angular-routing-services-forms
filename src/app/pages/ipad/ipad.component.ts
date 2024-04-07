import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ipad',
  standalone: true,
  imports: [],
  templateUrl: './ipad.component.html',
  styleUrl: './ipad.component.css'
})
export class IpadComponent {

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Our iPad'); }
}