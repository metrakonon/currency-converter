import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header></app-header>
    <app-converter></app-converter>
  `,
  imports: [HeaderComponent, ConverterComponent]
})
export class AppComponent {}
