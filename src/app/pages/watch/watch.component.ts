import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {

  // Injectamos el servicio Title en el constructor
  constructor(private titleService: Title) { }

  // Cambiamos el título de la página en el método ngOnInit
  ngOnInit() { this.titleService.setTitle('Apple (UK) - Our Watch'); }
}