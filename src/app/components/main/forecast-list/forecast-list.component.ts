import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { ForecastCardComponent } from '../forecast-card/forecast-card.component';
import { City, CityForecast, Coord } from '../../../models/forecast.model';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'app-forecast-list',
  standalone: true,
  imports: [ForecastCardComponent],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.css',
})
export class ForecastListComponent implements OnInit {
  @Input({ required: true }) city!: CityForecast;

  weatherService = inject(WeatherService);

  // city!: City;

  patternDaily = /(?=15:00:00)/;

  constructor() {
    // this.weatherService.cityUpdated$.subscribe(() => {
    //   this.getForecast(this.coords.lat, this.coords.lon);
    // });
  }

  ngOnInit(): void {
    // this.getForecast(this.coords.lat, this.coords.lon);
    this.getForecast();
  }

  ngOnChange(changes: SimpleChanges) {
    if (changes['city']) {
      // this.getForecast(this.coords.lat, this.coords.lon);
    }
  }

  // getForecast(lat: number, lon: number) {
  //   console.log("Lat: " + lat + ", Lon: " + lon)
  //   this.weatherService.getForecast(lat, lon).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.city = res;
  //       this.city.list = this.city.list.filter((list: any) => {
  //         return this.patternDaily.test(list.dt_txt);
  //       });
  //       console.log(this.city)
  //     }
  //   })

  // }
  getForecast() {
    console.log(this.city)
    this.city.list = this.city.list.filter((list: any) => {
      return this.patternDaily.test(list.dt_txt);
    });
  }
}
