import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";
import { simpleFill, simpleLine, cimPlayground } from "./renderers";

export const MAP_DEFAULTS = {
  CENTER: [-70.6396642, 41.3899984], // Arlington, VA
  ZOOM: 11,
  BASEMAP: "dark-gray-vector",
};

export interface LayerConfig {
  url: string;
  title: string;
  id: string;
  type:
    | "FeatureLayer"
    | "MapImageLayer"
    | "CVSLayer"
    | "GeoJSONLayer"
    | "OGCFeatureLayer"
    | "StreamLayer"
    | "WFSLayer";
  renderer?: any;
  sublayers?: { id: number; renderer?: any }[];
  visible?: boolean;
}

type LayersConfig = Record<string, LayerConfig>;

const CLASS_BREAKS_SEATTLE = {
  Less35: simpleFill({
    fill: "#fffcd4",
    strokeWidth: 0.2,
    strokeColor: [255, 255, 255, 0.5]
  }),
  Less50: {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#b1cdc2",
    style: "solid",
    outline: {
      width: 0.2,
      color: [255, 255, 255, 0.5],
    },
  },
  More50: {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#38627a",
    style: "solid",
    outline: {
      width: 0.2,
      color: [255, 255, 255, 0.5],
    },
  },
  More75: {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: "#0d2644",
    style: "solid",
    outline: {
      width: 0.2,
      color: [255, 255, 255, 0.5],
    },
  },
};

const LAYER_IDS = {
  SeattleDemographics: "seattle_demographics",
  CensusBlocks: "census_blocks",
  MvConservationAreas: "mv_conservation_areas",
  MvTrails: "mv_trails",
  MvPois: "mv_pois",
};

export const LAYERS_CONFIG: LayersConfig = {
  [LAYER_IDS.SeattleDemographics]: {
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Puget_Sound_BG_demographics/FeatureServer/0",
    title: "Seattle Demographcs",
    id: LAYER_IDS.SeattleDemographics,
    type: "FeatureLayer",
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [255, 0, 255, 1],
        outline: {
          color: [255, 255, 0],
          width: 1, // points
        },
      },
    },
  },
  [LAYER_IDS.MvConservationAreas]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/TrailsMV_Open_Space_Data_pv/FeatureServer/0",
    title: "Conservation Areas",
    id: LAYER_IDS.MvConservationAreas,
    type: "FeatureLayer",
  },
  [LAYER_IDS.MvTrails]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/Walking_Trails_-_TrailsMVApp_view/FeatureServer/0",
    title: "Trails",
    id: LAYER_IDS.MvTrails,
    type: "FeatureLayer",
    renderer: simpleLine({
      strokeColor: [222, 111, 88, 1],
      strokeWidth: "3px",
      strokeStyle: "short-dot"
    })
  },
  [LAYER_IDS.CensusBlocks]: {
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
    title: "Census Blocks",
    id: LAYER_IDS.CensusBlocks,
    type: "MapImageLayer",
    sublayers: [
      {
        id: 2,
        renderer: simpleFill({
          fill: [0, 255, 255, 0.1],
          strokeColor: [0, 255, 255, 0.5],
          strokeWidth: 5,
        }),
      },
      {
        id: 1,
        renderer: simpleFill({
          fill: [255, 255, 0, 0],
          strokeColor: [22, 66, 255, 0.5],
          strokeWidth: 3
        })
      },
      {
        id: 0,
      },
    ],
  },
  [LAYER_IDS.MvPois]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/TrailsMV_POIs_pv/FeatureServer/0",
    title: "POIs",
    id: LAYER_IDS.MvPois,
    type: "FeatureLayer",
    renderer: {
      type: "simple",
      symbol: new CIMSymbol({
        data: cimPlayground({fill:[0, 0, 0, 255]}),
      }),
    },
  },
};

export const MAP_LAYERS: string[] = [
  LAYER_IDS.SeattleDemographics,
  LAYER_IDS.CensusBlocks,
  LAYER_IDS.MvConservationAreas,
  LAYER_IDS.MvTrails,
  LAYER_IDS.MvPois,
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
