import { Component, Input } from '@angular/core';
import { ForecastListComponent } from '../forecast-list/forecast-list.component';
import { City } from '../../../models/weather.model';
import { CityForecast } from '../../../models/forecast.model';
import { WindHumidityComponent } from '../wind-humidity/wind-humidity.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [
    ForecastListComponent,
    WindHumidityComponent
  ],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {

  @Input({required: true}) city!: CityForecast;
  @Input({required: true}) cityWindHumidity!: City;

  ngOnInit(){
    console.log(this.city)
  }
}
