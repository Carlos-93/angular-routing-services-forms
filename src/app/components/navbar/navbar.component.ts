import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // Almacenamos el estado de la visibilidad del menú
  public menuVisible = false;

  // Método para cambiar el estado de la visibilidad del menú
  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }
}