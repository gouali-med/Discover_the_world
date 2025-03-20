import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface Country {
  name: string;
  population: number;
  region: string;
  capital: string[];
  flags: { svg: string };
  cca3: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(countries => countries.map(c => ({
        name: c.name.common,
        population: c.population,
        region: c.region,
        capital: c.capital || [],
        flags: c.flags,
        cca3: c.cca3
      })))
    );
  }

  getRegions(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`).pipe(
      map(countries => [...new Set(countries.map(c => c.region))])
    );
  }
}