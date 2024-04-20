import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showMenu = false;
  isActiveListener = false;

  // Método para alternar la visibilidad del menú hamburguesa
  toggleNavbar() {
    this.showMenu = !this.showMenu;
    this.isActiveListener = this.showMenu;
  }

  // Método para cerrar el menú hamburguesa al hacer clic fuera de él
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    // Si el menú no está activo, no ejecutamos la lógica de cierre
    if (!this.isActiveListener) return;

    const isClickedInsideMenu = this.isClickedInside(event, 'mobile-menu');
    const isClickedInsideToggle = this.isClickedInside(event, 'menu-toggle');

    if (!isClickedInsideMenu && !isClickedInsideToggle) {
      this.showMenu = false;
      this.isActiveListener = false;
    }
  }

  // Método para determinar si el clic se realizó dentro de un elemento específico
  private isClickedInside(event: MouseEvent, elementId: string): boolean {
    const element = document.getElementById(elementId);
    return element ? element.contains(event.target as Node) : false;
  }
}