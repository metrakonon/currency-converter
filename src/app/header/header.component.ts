// src/app/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [HttpClientModule]
})
export class HeaderComponent implements OnInit {
  usdRate: number = 0;
  eurRate: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.http.get('https://v6.exchangerate-api.com/v6/d11772025d72cda9c165c6aa/latest/UAH').subscribe(
      (data: any) => {
        if (data && data.conversion_rates) {
          this.usdRate = data.conversion_rates.USD;
          this.eurRate = data.conversion_rates.EUR;
        } else {
          console.error('Invalid data format', data);
        }
      },
      (error) => {
        console.error('Error fetching exchange rates', error);
      }
    );
  }
}
