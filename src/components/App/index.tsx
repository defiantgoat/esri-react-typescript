import React, { useLayoutEffect, useState } from "react";
import EsriMap from "@arcgis/core/Map";
import EsriMapView from "@arcgis/core/views/MapView";
import MapContainer from "../MapContainer";
import Toolbar from "../Toolbar";
import MapContext from "../MapContext";
import { MAP_DEFAULTS } from "../../config";
// import { ESRI_API_KEY } from "../../keys";

import useStyles from "./use-styles";

const App = (): JSX.Element => {
  const classes = useStyles();
  const [esriMapView, setEsriMapView] = useState(null as any);

  useLayoutEffect(() => {
    const { BASEMAP, CENTER, ZOOM } = MAP_DEFAULTS;

    const map = new EsriMap({
      basemap: BASEMAP,
    });

    const view = new EsriMapView({
      map,
      container: "mapContainer",
      center: CENTER,
      zoom: ZOOM,
      ui: {
        components: ["zoom"],
      },
    });

    setEsriMapView(view);
  }, []);

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
