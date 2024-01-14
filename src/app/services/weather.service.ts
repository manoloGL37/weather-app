import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private cityUpdatedSource = new Subject<void>();

  cityUpdated$ = this.cityUpdatedSource.asObservable();

  notifyCityUpdated() {
    this.cityUpdatedSource.next();
  }

  httpClient = inject(HttpClient);
  apiKey = '130c3b69d785440aa943fdc374331d8d';

  constructor() { 

  }

  getWeather(city: string): Observable<any> {
    return this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${this.apiKey}`);
  }

  getForecast(city: string) {
    return this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${this.apiKey}`);
  }
}
