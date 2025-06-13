import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { createMuiIcon } from "./CustomIcon";

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  city: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ latitude, longitude, city }) => {
  const position: LatLngExpression = [latitude, longitude];

  const locationIconComponent = (
    <LocationOnIcon sx={{ fontSize: 40, color: "#d32f2f" }} /> // A nice Material red
  );

  // 2. Pass the component to our helper function to create the Leaflet icon.
  const customMarkerIcon = createMuiIcon(locationIconComponent, [40, 40]);

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customMarkerIcon}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapDisplay;
