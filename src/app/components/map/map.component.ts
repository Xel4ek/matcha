import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, LatLngExpression } from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit,OnInit  {
  private map: any;
  @Input() markers!: LatLngExpression[];
  @Input() clickHandler?: Function;
  constructor( ) {
    L.Icon.Default.imagePath = './assets/img/leaflet/';
  }
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.map = L.map('map', {
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    const icon = new L.Icon.Default();
    const latLongs: LatLng[] = [];
    this.markers?.forEach((marker:LatLngExpression) => {
      L.marker(marker, {icon}).addTo(this.map);
      latLongs.push(L.latLng(marker));
    })
    const bounds = L.latLngBounds(latLongs);
    this.map.setView(bounds.getCenter())
    this.map.fitBounds(bounds);
    this.map.on('click', (e: any) => {
      if (typeof this.clickHandler === 'function') {
        this.clickHandler(e);
      }
      // console.log(this.map.getBounds());
    })
  }


}
