import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-unavailable',
  standalone: true,
  templateUrl: './service-unavailable.component.html',
  styleUrls: ['./service-unavailable.component.css']
})
export class ServiceUnavailableComponent {

  @Input()
  serviceName = 'Service';

  reload(): void {
    window.location.reload();
  }
}