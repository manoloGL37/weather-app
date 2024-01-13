import { Component, Input } from '@angular/core';
import { ForecastListComponent } from '../forecast-list/forecast-list.component';
import { City } from '../../../models/weather.model';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [
    ForecastListComponent
  ],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {

  @Input({required: true}) city!: City;

}
