import { Component, OnInit, inject } from '@angular/core';
import { LeftPanelComponent } from '../left-panel/left-panel.component';
import { WeatherService } from '../../../services/weather.service';
import { City } from '../../../models/weather.model';
import { RightPanelComponent } from '../right-panel/right-panel.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  citySearch: string = "";

  icon: string = "";

  weatherService = inject(WeatherService);

  constructor(private toastr: ToastrService) {}


  ngOnInit() {
    this.showWeather("Madrid");
  }

  showWeather(city: string) {
    this.weatherService.getWeather(city.trim()).subscribe({
      next: (res) => {
        console.log(res);
        this.city = res;
        this.icon = this.getLink();
        this.citySearch = "";
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
    }
  }

  getLink() {
    let linkIcon = `https://openweathermap.org/img/wn/${this.city.weather[0].icon}@4x.png`;
    return linkIcon;
  }

}
