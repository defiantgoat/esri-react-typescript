import EsriMapView from "@arcgis/core/views/MapView";

import { createContext } from "react";

const MapContext = createContext(null as typeof EsriMapView | null);
MapContext.displayName = "EsriMapContext";

export default MapContext;
