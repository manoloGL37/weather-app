import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  httpClient = inject(HttpClient);
  baseUrl = 'https://open-weather13.p.rapidapi.com/city';

  constructor() { 

  }

  getWeather(city: string): Observable<any> {
    return this.httpClient.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=130c3b69d785440aa943fdc374331d8d`);
  }
}
