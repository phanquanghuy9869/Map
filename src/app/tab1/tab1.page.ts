import { Component, ElementRef, NgZone, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { GoogleMapService } from '../services/google-map-service/google-map-service.service';
// import { google } from 'google-maps';
declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit, OnInit {
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
