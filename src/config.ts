type EsriLayerType = "FeatureLayer"
| "MapImageLayer"
| "CVSLayer"
| "GeoJSONLayer"
| "OGCFeatureLayer"
| "StreamLayer"
| "WFSLayer"

export interface LayerConfig {
  url: string;
  id: string;
  type: EsriLayerType;
  title?: string;
  renderer?: any;
  sublayers?: { id: number; renderer?: any }[];
  visible?: boolean;
}

type LayersConfig = Record<string, LayerConfig>;

export const ESRI_LAYER_TYPES: Record<string, EsriLayerType> =  {
  FeatureLayer: "FeatureLayer",
  MapImageLayer: "MapImageLayer",
  CVSLayer: "CVSLayer",
  GeoJSONLayer: "GeoJSONLayer",
  OGCFeatureLayer: "OGCFeatureLayer",
  StreamLayer: "StreamLayer",
  WFSLayer: "WFSLayer"
};

export const MAP_DEFAULTS = {
  CENTER: [-77.091, 38.8816], // Arlington, VA
  ZOOM: 12,
  BASEMAP: "dark-gray-vector"
}