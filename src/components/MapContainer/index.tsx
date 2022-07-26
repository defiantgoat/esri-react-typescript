import React, { useEffect } from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import { MAP_LAYERS, LAYERS_CONFIG } from "../../config";
import MapView from "@arcgis/core/views/MapView";
import * as locator from "@arcgis/core/rest/locator"

interface MapContainerProps {
  children?: JSX.Element | JSX.Element[];
}

const MapContainer: React.FC<MapContainerProps> = ({
  children,
}): JSX.Element => {
  const classes = useStyles();
  const { addLayer, addEventHandlerToView } = useMapTools();

  useEffect(() => {
    MAP_LAYERS.forEach((layerId) => {
      const config = LAYERS_CONFIG[layerId] || null;
      console.log(config, layerId);
      if (config) {
        addLayer(config);
      }
    });
  }, [addLayer, MAP_LAYERS]);

  useEffect(() => {
    addEventHandlerToView("click", (event: any, view: MapView) => {
      console.log("handler 1")
      view.popup.open({
        title: "Point",
        location: event.mapPoint
      });
      locator.locationToAddress("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",{location: event.mapPoint})
      .then((response) => {
        view.popup.content = response.address;
      })
      .catch(() => {
        view.popup.content = "No addy found"
      })
    });
    addEventHandlerToView("click", (event: any, view: MapView) => {
      console.log(event, view);
    });
  }, [addEventHandlerToView])

  return (
    <div id="mapContainer" className={classes.map}>
      {children}
    </div>
  );
};

export default MapContainer;
