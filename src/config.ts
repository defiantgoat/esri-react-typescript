export const MAP_DEFAULTS = {
  CENTER: [-70.6396642, 41.3899984], // Arlington, VA
  ZOOM: 11,
  BASEMAP: "dark-gray-vector",
};


export interface LayerConfig {
  url: string;
  title: string;
  id: string;
  type: "FeatureLayer" | "MapImageLayer" | "CVSLayer" | "GeoJSONLayer" | "OGCFeatureLayer" | "StreamLayer" | "WFSLayer";
  renderer?: any;
  sublayers?: {id: number, renderer?: any;}[]
}

export const MAP_LAYERS: LayerConfig[] = [
  {
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
    title: "Census Blocks",
    id: "census_blocks_map",
    type: "MapImageLayer",
    sublayers: [{
      id: 2,
      renderer: {
        type: "simple",
        symbol: {
          "type": "simple-fill",
          color: [255, 0, 255, 0.1],
          outline: null
        }
      }
    },
    {
      id: 0,
      renderer: {
        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
        style: "square",
        color: "blue",
        size: "8px",  // pixels
        outline: {  // autocasts as new SimpleLineSymbol()
          color: [ 255, 255, 0 ],
          width: 3  // points
        }
      }
    }
  ]
  },
  {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/TrailsMV_Open_Space_Data_pv/FeatureServer/0",
    title: "Cons Areas",
    id: "conservation_areas",
    type: "FeatureLayer",
  },
  {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/Walking_Trails_-_TrailsMVApp_view/FeatureServer/0",
    title: "Trails",
    id: "trails",
    type: "FeatureLayer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-line",
        color: "#555",
        width: "3px",
        style: "short-dot"
      }
    }
  },
  {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/TrailsMV_POIs_pv/FeatureServer/0",
    title: "POIs",
    id: "pois",
    type: "FeatureLayer",
  },
];

export const ESRI_BASEMAPS = [
  "satellite",
  "hybrid",
  "oceans",
  "osm",
  "terrain",
  "dark-gray-vector",
  "gray-vector",
  "streets-vector",
  "streets-night-vector",
  "streets-navigation-vector",
  "topo-vector",
  "streets-relief-vector",
];
