import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { LatLng } from 'leaflet';
import { CustomMarker } from '@components/map/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy, OnChanges {
  updateBoundsAfterGetData = false;
  @Input() markers!: { [user: string]: CustomMarker };
  @Output() updateCoordinate = new EventEmitter<any>();
  private map: L.Map | null = null;
  private mapMarkers: L.Marker[] = [];
  @ViewChild('map') private mapElement!: ElementRef<HTMLElement>;

  constructor() {
    L.Icon.Default.imagePath = './assets/img/leaflet/';
  }

  ngAfterViewInit(): void {
    this.map = L.map(this.mapElement.nativeElement);
    this.map.on('click', (e: any) => {
      this.updateCoordinate.emit(e);
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.updateBounds();
  }

  getBounds(): L.LatLngBounds | undefined {
    return this.map?.getBounds();
  }

  setZoom(zoom: number): L.Map | undefined {
    return this.map?.setZoom(zoom);
  }

  ngOnDestroy(): void {
    this.map?.off();
    this.map?.remove();
    this.map = null;
  }

  addMarkers(): L.LatLng[] {
    this.mapMarkers.map((marker) => {
      this.map?.removeLayer(marker);
    });
    this.mapMarkers = [];
    const icon = new L.Icon.Default();
    const latLongs: LatLng[] = [];
    Object.values(this.markers).map(({ latlng, popup }) => {
      if (this.map) {
        const point = L.marker(latlng, { icon }).addTo(this.map);
        if (popup) {
          point.bindPopup('<h3>' + popup + '</h3>').openPopup();
        }
        this.mapMarkers.push(point);
        latLongs.push(L.latLng(latlng));
      }
    });
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

  private updateBounds(): void {
    const latLongs = this.addMarkers();
    if (!latLongs || !latLongs.length) {
      return;
    }
    const bounds = L.latLngBounds(latLongs);
    this.map?.setView(bounds.getCenter(), 15);
    if (Object.keys(this.markers).length > 1) {
      this.map?.fitBounds(bounds);
    }
  }
}
