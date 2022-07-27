import React, { useLayoutEffect, useState } from "react";
import EsriMap from "@arcgis/core/Map";
import EsriMapView from "@arcgis/core/views/MapView";
import EsriSceneView from "@arcgis/core/views/SceneView";
import MapContainer from "../MapContainer";
import Toolbar from "../Toolbar";
import MapContext from "../MapContext";
import { MAP_DEFAULTS } from "../../config";
// import { ESRI_API_KEY } from "../../keys";

import useStyles from "./use-styles";

const App = (): JSX.Element => {
  const classes = useStyles();
  const [esriMapView, setEsriMapView] = useState(null as any);
  const [viewType, setViewType] = useState<"2D" | "3D">("2D");

  useLayoutEffect(() => {
    const { BASEMAP, CENTER, ZOOM, UI } = MAP_DEFAULTS;

    const map = new EsriMap({
      basemap: BASEMAP,
      ground: viewType !== "2D" ? "world-elevation" : undefined, //Elevation service
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
      view = new EsriSceneView({
        map,
        container: "mapContainer",
        camera: {
          position: {
            x: CENTER[0],
            y: CENTER[1],
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
      <div className={classes.app}>
        <Toolbar />
        <MapContainer />
      </div>
    </MapContext.Provider>
  );
};

export default App;
