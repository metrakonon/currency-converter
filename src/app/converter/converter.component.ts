// src/app/converter/converter.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-converter',
  standalone: true,
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  imports: [HttpClientModule, FormsModule, CommonModule]
})
export class ConverterComponent implements OnInit {
  currencies: string[] = ['UAH', 'USD', 'EUR'];
  rates: { [key: string]: number } = {};
  amount1: number = 1;
  amount2: number = 1;
  currency1: string = 'UAH';
  currency2: string = 'USD';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.http.get('https://v6.exchangerate-api.com/v6/d11772025d72cda9c165c6aa/latest/UAH').subscribe(
      (data: any) => {
        if (data && data.conversion_rates) {
          this.rates = data.conversion_rates;
          this.convertCurrency1();
        } else {
          console.error('Invalid data format', data);
        }
      },
      (error) => {
        console.error('Error fetching exchange rates', error);
      }
    );
  }

  convertCurrency1() {
    if (this.currency1 && this.currency2 && this.rates[this.currency1] && this.rates[this.currency2]) {
      this.amount2 = parseFloat(((this.amount1 * this.rates[this.currency2]) / this.rates[this.currency1]).toFixed(2));
    }
  }

  convertCurrency2() {
    if (this.currency1 && this.currency2 && this.rates[this.currency1] && this.rates[this.currency2]) {
      this.amount1 = parseFloat(((this.amount2 * this.rates[this.currency1]) / this.rates[this.currency2]).toFixed(2));
    }
  }
}
