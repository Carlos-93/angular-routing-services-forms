import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Inyectamos el servicio Title para usar en el componente
  constructor(private titleService: Title) { }

  // Establecemos el título de la página usando el servicio Title
  ngOnInit() { this.titleService.setTitle('Apple (España) - Inicio'); }
}