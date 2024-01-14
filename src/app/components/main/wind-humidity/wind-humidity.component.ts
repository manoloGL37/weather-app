import { Component, Input } from '@angular/core';
import { City } from '../../../models/weather.model';

@Component({
  selector: 'app-wind-humidity',
  standalone: true,
  imports: [],
  templateUrl: './wind-humidity.component.html',
  styleUrl: './wind-humidity.component.css'
})
export class WindHumidityComponent {

  @Input({required: true}) city!: City;

}
