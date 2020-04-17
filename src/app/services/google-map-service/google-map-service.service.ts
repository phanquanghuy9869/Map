import { Injectable, ElementRef } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, filter, switchMap } from 'rxjs/operators';
import { MarkerOption } from 'src/app/models/utilities';

declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {
  map: any;
  mapOptions: any;
  address: string;
  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private _httpClient: HttpClient) { }

  async getCurrentPosition(): Promise<Geoposition> {
    return await this.geolocation.getCurrentPosition();
  }

  async startMap(mapElement: ElementRef, resp: Geoposition = null) {
    await this.loadMapOption(resp);
    await this.initMap(mapElement);
  }

  async loadMapOption(resp: Geoposition = null) {
    if (resp == null) resp = await this.getCurrentPosition();
    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    this.mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
  }

  async initMap(mapElement: ElementRef) {
    this.map = new google.maps.Map(mapElement.nativeElement, this.mapOptions);

    this.map.addListener('tilesloaded', async () => {
      console.log('accuracy', this.map);
      this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());

      const resp = await this.getCurrentPosition();
      // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.createCustomerMarker(resp.coords.latitude, resp.coords.longitude);
    });
  }

  private createCustomerMarker(lat, lng) {
    const pos = {
      lat: lat,
      lng: lng
    };

    const icon = {
      url: 'assets/icon/cop.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };

    const marker = new google.maps.Marker({
      position: pos, //marker position
      map: this.map, //map already created
      title: 'Hello World!',
      // icon: icon //custom image
    });

    const contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      '<img src="assets/icon/user.png" width="200">' +
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>';

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });

    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
  }

  public addMarker(lat: number, lng: number) : any {    
    const pos = {
      lat: lat,
      lng: lng
    };

    const marker = new google.maps.Marker({
      position: pos, //marker position
      map: this.map, //map already created
      title: 'Hello World!',
      // icon: icon //custom image
    });

    return marker;
  }

  public addCustomMarker(options: MarkerOption) {
    const pos = {
      lat: options.lat,
      lng: options.lng
    };

    let icon = null;
    if (options.iconOption!= null && options.iconOption.iconUrl != null) {
      icon = {
        url: options.iconOption.iconUrl, // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };
    }

    const marker = new google.maps.Marker({
      position: pos, //marker position
      map: this.map, //map already created
      title: 'Hello World!',
      // icon: icon //custom image
    });

    const contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      '<img src="assets/icon/user.png" width="200">' +
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>';

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });

    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    // not working, at least in browser

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        console.log("address: ", this.address);
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
        const rs = this.getGeoCodefromGoogleAPI(lattitude, longitude);
        console.log(rs);
      });
  }

  getGeoCodefromGoogleAPI(lat, lng): Promise<any> {
    var latlng = lat + ", " + lng;
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlng + "&sensor=false&key=";
    return this._httpClient.get(url)
      // .pipe(map(res => res.json()))
      .toPromise();
  }
}
