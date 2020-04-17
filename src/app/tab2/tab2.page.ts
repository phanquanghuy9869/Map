import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMapService } from '../services/google-map-service/google-map-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit, OnInit {
  @ViewChild('Map', { static: false }) mapElement: ElementRef;
  filter: any = {};

  constructor(private _gMapService: GoogleMapService) {
    console.log(this.filter);
  }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    this._gMapService.startMap(this.mapElement);
  }
}
