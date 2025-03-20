import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CountryService, Country } from './services/country.service'; // Fixed import path
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  regions: string[] = [];
  searchTerm = '';
  selectedRegion = '';
  loading = true;
  error = '';

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load countries. Please try again later.';
        this.loading = false;
      }
    });

    this.countryService.getRegions().subscribe(regions => {
      this.regions = regions;
    });
  }

  applyFilters() {
    this.filteredCountries = this.countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRegion = this.selectedRegion ? country.region === this.selectedRegion : true;
      return matchesSearch && matchesRegion;
    });
  }
}