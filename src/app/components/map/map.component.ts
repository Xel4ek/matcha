import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import * as L from 'leaflet';
import { LatLng, LatLngExpression } from "leaflet";
import { CustomMarker } from "@components/map/map";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges  {
  private map?: L.Map;
  private mapMarkers: L.Marker[] = [];
  updateBoundsAfterGetData = false;
  @Input() markers!: { [user:string]: CustomMarker  };
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
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
    this.updateBounds();
  }
  getBounds() {
    return this.map?.getBounds();
  }
  setZoom(zoom: number) {
    return this.map?.setZoom(zoom);
  }
  ngOnDestroy(): void {
    this.map?.off();
    this.map?.remove();
  }
  private updateBounds() {
    const latLongs = this.addMarkers();
    const bounds = L.latLngBounds(latLongs);
    this.map?.setView(bounds.getCenter(), 15)
    if (Object.keys(this.markers).length > 1) {
      this.map?.fitBounds(bounds);
    }
  }
  addMarkers() {
    this.mapMarkers.map(marker => {
      this.map?.removeLayer(marker);
    })
    this.mapMarkers = [];
    const icon = new L.Icon.Default();
    const latLongs: LatLng[] = [];
    Object.entries(this.markers).map(([key, {latlng, popup}]) => {
      const point = L.marker(latlng, {icon}).addTo(this.map!);
      if(popup)
        point.bindPopup('<h3>' + popup + '</h3>').openPopup();
      this.mapMarkers.push(point);
      latLongs.push(L.latLng(latlng));
    })
    return latLongs;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && changes.markers) {
        this.addMarkers();
    }
    if (this.updateBoundsAfterGetData) {
      this.updateBoundsAfterGetData = false;
      this.updateBounds();
    }
  }
}
