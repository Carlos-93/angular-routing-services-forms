import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @Input() message: string = '';

  constructor() { }
}