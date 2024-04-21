import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  // Propiedad para el logo del footer
  logo: string = "/assets/images/apple-footer.webp";

  // Propiedad para el año actual de la página
  year: number = new Date().getFullYear();

  // Propiedad para el nombre del sitio web
  username: string = "Carlos Araujo Galván™";

  // Propiedad para el texto de derechos de autor
  copyright: string = "Todos los derechos reservados.";

  // Array de objetos con los enlaces de recursos
  resourcesLinks = [
    { name: "Flowbite", url: "https://flowbite.com/" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/" }
  ];

  // Array de objetos con los enlaces de seguimiento
  trackingLinks = [
    { name: "Github", url: "https://github.com/themesberg/flowbite" },
    { name: "Discord", url: "https://discord.gg/4eeurUVvTy" }
  ];

  // Array de objetos con los enlaces legales
  legalLinks = [
    { name: "Privacy Policy", url: "#" },
    { name: "Terms & Conditions", url: "#" }
  ];

  // Array de objetos con los enlaces de mis redes sociales
  socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/carlos.araujo.bcn", icon: "/assets/images/facebook.png" },
    { name: "Instagram", url: "https://www.instagram.com/carloos_93/", icon: "/assets/images/instagram.png" },
    { name: "Github", url: "https://github.com/Carlos-93", icon: "/assets/images/github.png" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/carlos-araujo-galvan/", icon: "/assets/images/linkedin.png" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UCdJ7371WOCb_XfPEv-Cm3Yw", icon: "/assets/images/youtube.png" }
  ];
}