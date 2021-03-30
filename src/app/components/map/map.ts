import { LatLngExpression } from 'leaflet';

export interface CustomMarker {
  latlng: LatLngExpression;
  popup?: string | null;
  color?: string;
}
