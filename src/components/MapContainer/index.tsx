import React, { useEffect, useRef } from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import { MAP_LAYERS, LAYERS_CONFIG } from "../../config";


interface MapContainerProps {
  children?: JSX.Element | JSX.Element[];
}

const MapContainer: React.FC<MapContainerProps> = ({
  children,
}): JSX.Element => {
  const classes = useStyles();
  const { addLayer } = useMapTools();

  useEffect(() => {
    MAP_LAYERS.forEach((layerId) => {
      const config = LAYERS_CONFIG[layerId] || null;
      if (config) {
        addLayer(config);
      }
    });
  }, [addLayer, MAP_LAYERS]);

  return (
    <div id="mapContainer" className={classes.map}>
      {children}
    </div>
  );
};

export default MapContainer;
