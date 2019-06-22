import React from "react";
import { compose } from "recompose";
import GoogleMapsWrapper from "../GoogleMaps/GoogleMapsWrapper";

const LocationSelector = ({
  markers,
  height,
  onDrag,
  width,
  position,
  showLabels,
  currentLocation,
  isDarkMode
}) => (
  <div>
    <GoogleMapsWrapper
      zoom={11}
      markers={markers}
      height={height}
      width={width}
      position={position}
      onMarkerDrag={onDrag}
      markersDraggable={true}
      showLabels={showLabels}
      currentLocation={currentLocation}
      isDarkMode={isDarkMode}
    />
  </div>
);

export default compose()(LocationSelector);
