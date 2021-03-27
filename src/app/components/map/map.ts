import { LatLngExpression } from "leaflet";

export interface Map {
}

export interface CustomMarker {
  latlng: LatLngExpression,
  popup?: string | null,
  color?: string,
}
