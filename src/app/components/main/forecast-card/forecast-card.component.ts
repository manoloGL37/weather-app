import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { List } from '../../../models/forecast.model';
import { WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.css',
})
export class ForecastCardComponent implements OnInit {
  @Input({ required: true }) weather!: List;

  dias: any = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  linkBase = '';
  day!: any;

  // constructor(private weatherService: WeatherService) {
  //   this.weatherService.cityUpdated$.subscribe(() => {
  //     this.updateData();
  //   });
  // }

  ngOnInit() {
    this.updateData();
  }

  ngOnChange(changes: SimpleChanges) {
    if (changes['weather']) {
      console.log('Ha cambiado');
      this.updateData();
    }
  }

  updateData() {
    this.getDate();
  }

  getLink() {
    this.linkBase = `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
    console.log(this.linkBase);
  }

  getDate() {
    let date = new Date(this.weather.dt_txt);
    this.day = date.getDay();
    this.day = this.dias[this.day];
  }
}
