import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, LatLngExpression } from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy  {
  private map?: L.Map;
  @Input() markers!: LatLngExpression[];
  @ViewChild('map') private mapElement!: ElementRef<HTMLElement>;
  @Output() updateCoordinate = new EventEmitter<any>();
  constructor( ) {
    L.Icon.Default.imagePath = './assets/img/leaflet/';
  }

  ngAfterViewInit(): void {
    this.map = L.map(this.mapElement.nativeElement);
    this.map.on('click', (e: any) => {
      this.updateCoordinate.emit(e);
    })
    this.map.whenReady(() => {
      if (this.map!.getZoom() > 16) {
        this.map?.setZoom(16);
      }
    })
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    const icon = new L.Icon.Default();
    const latLongs: LatLng[] = [];
    this.markers?.forEach((marker:LatLngExpression) => {
      L.marker(marker, {icon}).addTo(this.map!);
      latLongs.push(L.latLng(marker));
    })
    const bounds = L.latLngBounds(latLongs);
    this.map.setView(bounds.getCenter(), 19)
    this.map.fitBounds(bounds);

  }
  getBounds() {
    return this.map?.getBounds();
  }
  ngOnDestroy(): void {
    this.map?.off();
    this.map?.remove();
  }
}
