import { Component, Input, OnInit, inject } from '@angular/core';
import { City } from '../../../models/weather.model';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent implements OnInit {
  
  @Input({required: true}) city!: City;
  @Input({required: true}) icon!: string;
  
  linkBase:string = "";

  ngOnInit(): void {
    this.getLink();
  }


  getLink() {
    this.linkBase = `https://openweathermap.org/img/wn/${this.city.weather[0].icon}@4x.png`;
  }

}
