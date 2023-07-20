import { Component } from '@angular/core';
import axios from 'axios';

interface Country {
  capital: string;
  language: string | string[];
  population: number;
  name: string;
  region: string;
  flag: string;
  map: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  search: any = '';
  country: any; // You should have a proper type for country, replace 'any' with the appropriate type.
  loading: boolean = false;
  error: boolean = false;

  isObject(value: any): boolean {
    return typeof value === 'object';
  }

  getLanguageValues(languageObj: any): string[] {
    return Object.values(languageObj);
  }

  async submitCountry() {
    this.country = '';
    this.loading = true;
    this.error = false;
    try {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${this.search}`
      );

      this.country = {
        capital: res.data[0]?.capital,
        language: res.data[0]?.languages,
        population: res.data[0]?.population,
        name: res.data[0]?.name?.common,
        region: res.data[0]?.region,
        flag: res.data[0]?.flags?.png,
        map: res.data[0]?.maps?.googleMaps,
      };
      console.log(this.country);
    } catch (error) {
      console.log(error);
      this.error = true;
    }
    this.loading = false;
  }
}
