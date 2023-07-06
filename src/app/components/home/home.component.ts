import { Component, Input, OnInit } from '@angular/core';
import { ApiConnectionService } from '../../services/api-connection-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() inputValue: any;
  public credentialObj = {};

  constructor(private ConnectionService: ApiConnectionService) {}

  ngOnInit(): void {

}
}