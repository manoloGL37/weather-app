import { Component, OnInit, inject } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { WeatherService } from '../../../services/weather.service';
import { City } from '../../../models/weather.model';
import { RightPanelComponent } from '../right-panel/right-panel.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CityForecast } from '../../../models/forecast.model';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [
    LeftPanelComponent,
    RightPanelComponent,
    FormsModule
  ],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.css'
})
export class MainAppComponent implements OnInit {

  city!: City;
  cityForecast!: CityForecast;

  citySearch: string = "";

  icon: string = "";
  patternDaily = /(?=15:00:00)/;

  weatherService = inject(WeatherService);

  constructor(private toastr: ToastrService) {}


  ngOnInit() {
    this.showWeather("Madrid");
    this.showForecast("Madrid");
  }

  showWeather(city: string) {
    this.weatherService.getWeather(city.trim()).subscribe({
      next: (res) => {
        this.city = res;
        console.log(res)
        this.icon = this.getLink();
        this.citySearch = "";
        this.weatherService.notifyCityUpdated();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Error', e.error.message);
      }
    })
  }

  showForecast(city: string) {
    this.weatherService.getForecast(city.trim()).subscribe({
      next: (res) => {
        this.cityForecast = res;
        this.cityForecast.list = this.getForecastDaily();
        this.cityForecast.list.forEach((weather) => {
          weather.weather[0].link = this.getLinkForecast(weather.weather[0].icon);
        })
        console.log(this.cityForecast)
        this.weatherService.notifyCityUpdated();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('Error', e.error.message);
      }
    })
  }

  searchCity() {
    if( this.citySearch != "") {
      this.showWeather(this.citySearch);
      this.showForecast(this.citySearch);
    }
  }

  getLink() {
    let linkIcon = `https://openweathermap.org/img/wn/${this.city.weather[0].icon}@4x.png`;
    return linkIcon;
  }

  getLinkForecast(icon: string) {
    let linkIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return linkIcon;
  }

  getForecastDaily() {
    console.log(this.city)
    return this.cityForecast.list.filter((list: any) => {
      return this.patternDaily.test(list.dt_txt);
    });
  }

}
