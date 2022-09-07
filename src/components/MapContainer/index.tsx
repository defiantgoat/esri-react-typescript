import React, { useEffect, useRef, useContext } from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import { MAP_LAYERS, LAYERS_CONFIG } from "../../config";
import MapContext from "../MapContext";

interface MapContainerProps {
  children?: JSX.Element | JSX.Element[];
}

const MapContainer: React.FC<MapContainerProps> = ({
  children,
}): JSX.Element => {
  const classes = useStyles();
  const { addLayer } = useMapTools();
  const addedLayersRef = useRef([] as string[]);
  const mapViewContext = useContext(MapContext) as any;

  useEffect(() => {
    const addLayerAsync = async (config: any) => {
      if (addedLayersRef.current.includes(config.id)) {
        return;
      }

      addedLayersRef.current.push(config.id);
      await addLayer(config);
    };

    if (mapViewContext) {
      for (const layer of MAP_LAYERS) {
        const config = LAYERS_CONFIG[layer] || null;
        if (config) {
          addLayerAsync(config);
        }
      }
    }

  }, [addLayer, MAP_LAYERS, mapViewContext]);

  return (
    <div id="mapContainer" className={classes.map}>
      {children}
    </div>
  );
};

export default MapContainer;
