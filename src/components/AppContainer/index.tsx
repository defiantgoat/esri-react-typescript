import React, { useLayoutEffect, useState } from "react";
import EsriMap from "@arcgis/core/Map";
import EsriMapView from "@arcgis/core/views/MapView";
import EsriSceneView from "@arcgis/core/views/SceneView";
import MapContext from "../MapContext";
import { MAP_DEFAULTS } from "../../config";
// import { ESRI_API_KEY } from "../../keys";
import App from "../App";


const AppContainer = (): JSX.Element => {
  const [esriMapView, setEsriMapView] = useState(null as any);
  const [viewType, setViewType] = useState<"2D" | "3D">("2D");

  useLayoutEffect(() => {
    const { BASEMAP, CENTER, ZOOM, UI } = MAP_DEFAULTS;
    
    const map = new EsriMap({
      basemap: BASEMAP,
      ground: "world-elevation"
    });

    let view = null as any;

    if (viewType === "2D") {
      view = new EsriMapView({
        map,
        container: "mapContainer",
        center: CENTER,
        zoom: ZOOM,
        popup: {
          autoOpenEnabled: false,
        },
        ui: {
          components: []
        },
      });
    } else {
      const [x, y] = CENTER;
      view = new EsriSceneView({
        map,
        container: "mapContainer",
        camera: {
          position: {
            x,
            y,
            z: 2000,
          },
          tilt: 74,
        },
      });
    }

    UI.forEach(([widget, position]) => view.ui.add(widget(view), position));
    
    setEsriMapView(view);
  }, [viewType]);

  return (
    <MapContext.Provider value={esriMapView}>
      <App />
    </MapContext.Provider>
  );
};

export default AppContainer;
