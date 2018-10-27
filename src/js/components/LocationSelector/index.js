import React from "react";
import { compose } from "recompose";
import GoogleMapsWrapper from "../GoogleMaps/GoogleMapsWrapper";

const LocationSelector = ({ markers, height, onDrag, width, position }) => (
	<div>
		<GoogleMapsWrapper
			markers={markers}
			height={height}
			width={width}
			position={position}
			onMarkerDrag={onDrag}
			markersDraggable={true}
		/>
	</div>
);

export default compose(
)(LocationSelector);