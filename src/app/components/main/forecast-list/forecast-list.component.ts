import { Component, Input, OnInit, inject } from '@angular/core';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';
import { City, Coord } from '../../../models/forecast.model';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [
    ForecastCardComponent
  ],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.css'
})
export class ForecastListComponent implements OnInit {

  @Input({required: true}) coords!: Coord;

  weatherService = inject(WeatherService);

  city!: City;

  patternDaily = /(?=15:00:00)/;

  constructor() {
    this.weatherService.cityUpdated$.subscribe(() => {
      this.getForecast();
    });
  }

  ngOnInit(): void {
    this.getForecast()
  }


  getForecast() {
    this.weatherService.getForecast(this.coords.lat, this.coords.lon).subscribe({
      next: (res) => {
        this.city = res;
        this.city.list = this.city.list.filter((list: any) => {
          return this.patternDaily.test(list.dt_txt)
        });
      }
    })

  }

}
