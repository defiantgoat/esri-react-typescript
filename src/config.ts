import { simpleFill, simpleLine, cimSymbol, heatmap, uniqueValue, dotDensity } from "./renderers";

type EsriLayer = "FeatureLayer"
| "MapImageLayer"
| "CVSLayer"
| "GeoJSONLayer"
| "OGCFeatureLayer"
| "StreamLayer"
| "WFSLayer"

export interface LayerConfig {
  url: string;
  title: string;
  id: string;
  type: EsriLayer;
  renderer?: any;
  sublayers?: { id: number; renderer?: any }[];
  visible?: boolean;
}

type LayersConfig = Record<string, LayerConfig>;

export const ESRI_LAYER_TYPES: Record<string, EsriLayer> =  {
  FeatureLayer: "FeatureLayer",
  MapImageLayer: "MapImageLayer",
  CVSLayer: "CVSLayer",
  GeoJSONLayer: "GeoJSONLayer",
  OGCFeatureLayer: "OGCFeatureLayer",
  StreamLayer: "StreamLayer",
  WFSLayer: "WFSLayer"
};

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

export const MAP_DEFAULTS = {
  CENTER: [-70.6396642, 41.3899984], // Arlington, VA
  ZOOM: 11,
  BASEMAP: ESRI_BASEMAPS[5],
};

const CLASS_BREAKS_SEATTLE = {
  Less35: simpleFill({
    fill: "#fffcd4",
    strokeWidth: 0.2,
    strokeColor: [255, 255, 255, 0.5],
  }),
  Less50: simpleFill({
    fill: "#b1cdc2",
    strokeWidth: 0.2,
    strokeColor: [255, 255, 255, 0.5],
  }),
  More50: simpleFill({
    fill: "#38627a",
    strokeWidth: 0.2,
    strokeColor: [255, 255, 255, 0.5],
  }),
  More75: simpleFill({
    fill: "#0d2644",
    strokeWidth: 0.2,
    strokeColor: [255, 255, 255, 0.5],
  }),
};

export const LAYER_IDS = {
  SeattleDemographics: "seattle_demographics",
  CensusBlocks: "census_blocks",
  MvConservationAreas: "mv_conservation_areas",
  MvTrails: "mv_trails",
  MvBusStops: "mv_pois",
  Earthquakes: "earthquakes",
  Population: "population"
};

export const LAYERS_CONFIG: LayersConfig = {
  [LAYER_IDS.Population]: {
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Population_by_Race_and_Hispanic_Origin_Boundaries/FeatureServer/2",
    id: LAYER_IDS.Population,
    title: "Population",
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: (referenceScale: number) => dotDensity({
      referenceScale, 
      attributes: [
        {
          field: "B03002_003E",
          color: "#f23c3f",
          label: "White (non-Hispanic)"
        },
        {
          field: "B03002_012E",
          color: "#e8ca0d",
          label: "Hispanic"
        },
        {
          field: "B03002_004E",
          color: "#00b6f1",
          label: "Black or African American"
        },
        {
          field: "B03002_006E",
          color: "#32ef94",
          label: "Asian"
        },
        {
          field: "B03002_005E",
          color: "#ff7fe9",
          label: "American Indian/Alaskan Native"
        },
        {
          field: "B03002_007E",
          color: "#e2c4a5",
          label: "Pacific Islander/Hawaiian Native"
        },
        {
          field: "B03002_008E",
          color: "#ff6a00",
          label: "Other race"
        },
        {
          field: "B03002_009E",
          color: "#96f7ef",
          label: "Two or more races"
        }
      ],
      dotValue: 100
    })
  },
  [LAYER_IDS.Earthquakes]: {
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",
    id: LAYER_IDS.Earthquakes,
    type: ESRI_LAYER_TYPES.CVSLayer,
    title: "Earthquakes",
    renderer: () => heatmap({
      field: "mag",
      colorStops: [
      { color: "rgba(63, 40, 102, 0)", ratio: 0 },
      { color: "#472b77", ratio: 0.08 },
      { color: "#4e2d87", ratio: 0.16 },
      { color: "#563098", ratio: 0.24 },
      { color: "#5d32a8", ratio: 0.32 },
      { color: "#6735be", ratio: 0.40 },
      { color: "#7139d4", ratio: 0.48 },
      { color: "#7b3ce9", ratio: 0.56 },
      { color: "#853fff", ratio: 0.64 },
      { color: "#a46fbf", ratio: 0.72 },
      { color: "#c29f80", ratio: 0.80 },
      { color: "#e0cf40", ratio: 0.88 },
      { color: "#ffff00", ratio: 1 }
    ],
    maxDensity: 0.01,
    minDensity: 0})
  },
  [LAYER_IDS.SeattleDemographics]: {
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Puget_Sound_BG_demographics/FeatureServer/0",
    title: "Seattle Demographcs",
    id: LAYER_IDS.SeattleDemographics,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: () => ({
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [255, 0, 255, 1],
        outline: {
          color: [255, 255, 0],
          width: 1, // points
        },
      },
    }),
  },
  [LAYER_IDS.MvConservationAreas]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/TrailsMV_Open_Space_Data_pv/FeatureServer/0",
    title: "Conservation Areas",
    id: LAYER_IDS.MvConservationAreas,
    type: ESRI_LAYER_TYPES.FeatureLayer,
  },
  [LAYER_IDS.MvTrails]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/BPAC_Trails/FeatureServer/1",
    title: "Trails",
    id: LAYER_IDS.MvTrails,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: () => uniqueValue({
      field: "Surface",
      uniqueValueInfos: [
        {
          value: 2,
          symbol: simpleLine({strokeColor: "blue", strokeWidth: "8px"}).symbol
        },
        {
          value: 3,
          symbol: simpleLine({strokeColor: "gold", strokeWidth: "9px"}).symbol
        },
        {
          value: 9,
          symbol: simpleLine({strokeColor: "orange", strokeWidth: "9px"}).symbol
        }
      ],
      // visualVariables: [
      //   {
      //     type: "opacity",
      //     field: "Prop_ID",
      //     stops: [
      //       {value: 1, opacity: 0.1},
      //       {value: 50, opacity: 0.5},
      //       {value: 99, opacity: 0.9}
      //     ]
      //   }
      // ]
    }),
    // renderer: simpleLine({
    //   strokeColor: [222, 111, 88, 1],
    //   strokeWidth: "3px",
    //   strokeStyle: "short-dot",
    // }),
  },
  [LAYER_IDS.CensusBlocks]: {
    url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
    title: "Census Blocks",
    id: LAYER_IDS.CensusBlocks,
    type: ESRI_LAYER_TYPES.MapImageLayer,
    sublayers: [
      {
        id: 2,
        renderer: () => simpleFill({
          fill: [0, 255, 255, 0.1],
          strokeColor: [0, 255, 255, 0.5],
          strokeWidth: 5,
        }),
      },
      {
        id: 1,
        renderer: () => simpleFill({
          fill: [255, 255, 0, 0],
          strokeColor: [22, 66, 255, 0.5],
          strokeWidth: 3,
        }),
      },
      {
        id: 0,
      },
    ],
  },
  [LAYER_IDS.MvBusStops]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/BusStops/FeatureServer/0",
    title: "Bus Stops",
    id: LAYER_IDS.MvBusStops,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: () => cimSymbol(),
  },
};

export const MAP_LAYERS: string[] = [
  LAYER_IDS.Population,
  // LAYER_IDS.SeattleDemographics,
  // LAYER_IDS.CensusBlocks,
  LAYER_IDS.MvConservationAreas,
  LAYER_IDS.MvTrails,
  LAYER_IDS.MvBusStops,
  // LAYER_IDS.Earthquakes
];
