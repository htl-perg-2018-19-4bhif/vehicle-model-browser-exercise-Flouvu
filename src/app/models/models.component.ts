import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IFiltered {
  id: number;
  year: number;
  make: string;
  model: string;
  hasDetails: number;
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})

export class ModelsComponent implements OnInit {
  years: number[];
  makes: string[];
  ergebnis: IFiltered[];
  year: number;
  make: string;
  value: number;
  offset = 0;
  numElements = 10;
  nextBut = false;

  constructor(private http: HttpClient) {
    this.fillYears();
    this.fillModels();
  }

  ngOnInit() {
  }

  async fillYears() {
    this.years = await this.http.get<number[]>('https://vehicle-data.azurewebsites.net/api/years').toPromise();

  }

  async fillModels() {
    this.makes = await this.http.get<string[]>('https://vehicle-data.azurewebsites.net/api/makes').toPromise();
  }

  async refreshList() {
    this.offset = 0;
    this.loadResults();
  }

  async loadResults() {
    this.numElements = parseInt(this.numElements + '');
    if (!this.make && !this.year) {
      this.ergebnis = await this.http.get<IFiltered[]>(`https://vehicle-data.azurewebsites.net/api/models?offset=${this.offset}&fetch=${this.numElements + 1}`).toPromise();
    } else if (!this.make) {
      this.ergebnis = await this.http.get<IFiltered[]>(`https://vehicle-data.azurewebsites.net/api/models?year=${this.year}&offset=${this.offset}&fetch=${this.numElements + 1}`).toPromise();
    } else if (!this.year) {
      this.ergebnis = await this.http.get<IFiltered[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}&offset=${this.offset}&fetch=${this.numElements + 1}`).toPromise();
    } else {
      this.ergebnis = await this.http.get<IFiltered[]>(`https://vehicle-data.azurewebsites.net/api/models?make=${this.make}&year=${this.year}&offset=${this.offset}&fetch=${this.numElements + 1}`).toPromise();
    }

    if (this.ergebnis.length === this.numElements + 1) {
      this.ergebnis.pop();
      this.nextBut = false;
    } else {
      this.nextBut = true;
    }
  }

  async previousTen() {
    this.offset -= this.numElements;
    this.loadResults();
  }

  async nextTen() {
    this.offset += this.numElements;
    this.loadResults();
  }
}
