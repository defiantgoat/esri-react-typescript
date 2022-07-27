import {
  simpleFill,
  simpleLine,
  cimSymbol,
  heatmap,
  uniqueValue,
  dotDensity,
  pieChart,
} from "./renderers";

import LayerList from "@arcgis/core/widgets/LayerList";
import MapView from "@arcgis/core/views/MapView";
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";

type EsriLayerType =
  | "FeatureLayer"
  | "MapImageLayer"
  | "CVSLayer"
  | "GeoJSONLayer"
  | "OGCFeatureLayer"
  | "StreamLayer"
  | "WFSLayer";

export interface LayerConfig {
  url: string;
  id: string;
  type: EsriLayerType;
  title?: string;
  renderer?: any;
  sublayers?: { id: number; renderer?: any }[];
  visible?: boolean;
  popupTemplate?: any;
  popupEnabled?: boolean;
  labelingInfo?: any[]
}

type LayersConfig = Record<string, LayerConfig>;

export const ESRI_LAYER_TYPES: Record<string, EsriLayerType> = {
  FeatureLayer: "FeatureLayer",
  MapImageLayer: "MapImageLayer",
  CVSLayer: "CVSLayer",
  GeoJSONLayer: "GeoJSONLayer",
  OGCFeatureLayer: "OGCFeatureLayer",
  StreamLayer: "StreamLayer",
  WFSLayer: "WFSLayer",
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
  UI: [
    [() => "zoom", "top-right"],
    [(view) => new LayerList({view}), "bottom-right"],
    [(view) => new AreaMeasurement2D({view}), "top-left"],
    [(view) => new BasemapGallery({view}), "top-right"]
  ] as Array<[(view: MapView | undefined) => string | any, string]>
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
  MvTrailsArrows: "mv_trails_arrows",
  MvBusStops: "mv_pois",
  Earthquakes: "earthquakes",
  Population: "population",
};

export const populationPieChart = () =>
  pieChart(
    {
      attributes: [
        {
          field: "B03002_003E",
          color: "#f23c3f",
          label: "White (non-Hispanic)",
        },
        {
          field: "B03002_012E",
          color: "#e8ca0d",
          label: "Hispanic",
        },
        {
          field: "B03002_004E",
          color: "#00b6f1",
          label: "Black or African American",
        },
        {
          field: "B03002_006E",
          color: "#32ef94",
          label: "Asian",
        },
        {
          field: "B03002_005E",
          color: "#ff7fe9",
          label: "American Indian/Alaskan Native",
        },
        {
          field: "B03002_007E",
          color: "#e2c4a5",
          label: "Pacific Islander/Hawaiian Native",
        },
        {
          field: "B03002_008E",
          color: "#ff6a00",
          label: "Other race",
        },
        {
          field: "B03002_009E",
          color: "#96f7ef",
          label: "Two or more races",
        },
      ],
    },
    {
      backgroundFillSymbol: {
        // polygon fill behind pie chart
        color: [127, 127, 127, 0.5],
        outline: {
          width: 1,
          color: [255, 255, 255, 1],
        },
      },
      visualVariables: [
        {
          type: "size", // size visual variable based on population represented in each pie
          valueExpression:
            "Sum([$feature.B03002_003E,$feature.B03002_012E,$feature.B03002_004E,$feature.B03002_006E,$feature.B03002_005E,$feature.B03002_007E,$feature.B03002_008E,$feature.B03002_009E])",
          stops: [
            {
              value: 0, // features where < 15% of the pop is in poverty
              size: 20, // will be assigned a marker with this size in pts
            },
            {
              value: 16000, // features where > 35% of the pop is in poverty
              size: 80, // will be assigned a marker with this size in pts
            },
          ],
        },
      ],
    }
  );

export const populationDotDensity = (referenceScale: number) =>
  dotDensity(
    {
      referenceScale,
      attributes: [
        {
          field: "B03002_003E",
          color: "#f23c3f",
          label: "White (non-Hispanic)",
        },
        {
          field: "B03002_012E",
          color: "#e8ca0d",
          label: "Hispanic",
        },
        {
          field: "B03002_004E",
          color: "#00b6f1",
          label: "Black or African American",
        },
        {
          field: "B03002_006E",
          color: "#32ef94",
          label: "Asian",
        },
        {
          field: "B03002_005E",
          color: "#ff7fe9",
          label: "American Indian/Alaskan Native",
        },
        {
          field: "B03002_007E",
          color: "#e2c4a5",
          label: "Pacific Islander/Hawaiian Native",
        },
        {
          field: "B03002_008E",
          color: "#ff6a00",
          label: "Other race",
        },
        {
          field: "B03002_009E",
          color: "#96f7ef",
          label: "Two or more races",
        },
      ],
      dotValue: 100,
    },
    {
      dotSize: 3,
    }
  );

export const LAYERS_CONFIG: LayersConfig = {
  [LAYER_IDS.Population]: {
    url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/ACS_Population_by_Race_and_Hispanic_Origin_Boundaries/FeatureServer/2",
    id: LAYER_IDS.Population,
    title: "Population | Dot Density or Pie Chart",
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: populationPieChart,
    // popupEnabled: true,
    popupTemplate: {
      title: "ExpressionContent",
      expressionInfos: [
        {
          name: "sum",
          title: "Sum",
          expression:
            "Sum([$feature.B03002_003E,$feature.B03002_012E,$feature.B03002_004E,$feature.B03002_006E,$feature.B03002_005E,$feature.B03002_007E,$feature.B03002_008E,$feature.B03002_009E])",
        },
        {
          name: "max",
          title: "Max",
          expression:
            "Max([$feature.B03002_003E,$feature.B03002_012E,$feature.B03002_004E,$feature.B03002_006E,$feature.B03002_005E,$feature.B03002_007E,$feature.B03002_008E,$feature.B03002_009E])",
        },
        {
          name: "min",
          title: "Min",
          expression:
            "Min([$feature.B03002_003E,$feature.B03002_012E,$feature.B03002_004E,$feature.B03002_006E,$feature.B03002_005E,$feature.B03002_007E,$feature.B03002_008E,$feature.B03002_009E])",
        },
      ],
      content: `<p>Sum: {expression/sum}</p>
      <p>Max: {expression/max}</p>
      <p>Min: {expression/min}</p>
      <li>White (non-Hispanic): {B03002_003E}</li>
      <li>Hispanic: {B03002_012E}</li>
      <li>Black or African American: {B03002_004E}</li>
      <li>Asian: {B03002_006E}</li>
      <li>American Indian/Alaskan Native: {B03002_005E}</li>
      <li>Pacific Islander/Hawaiian Native: {B03002_007E}</li>
      <li>Other race: {B03002_008E}</li>
      <li>Two or more races: {B03002_009E}</li>`,
    },
  },
  [LAYER_IDS.Earthquakes]: {
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",
    id: LAYER_IDS.Earthquakes,
    type: ESRI_LAYER_TYPES.CVSLayer,
    title: "Earthquakes | Heatmap",
    renderer: () =>
      heatmap({
        field: "mag",
        colorStops: [
          { color: "rgba(63, 40, 102, 0)", ratio: 0 },
          { color: "#472b77", ratio: 0.08 },
          { color: "#4e2d87", ratio: 0.16 },
          { color: "#563098", ratio: 0.24 },
          { color: "#5d32a8", ratio: 0.32 },
          { color: "#6735be", ratio: 0.4 },
          { color: "#7139d4", ratio: 0.48 },
          { color: "#7b3ce9", ratio: 0.56 },
          { color: "#853fff", ratio: 0.64 },
          { color: "#a46fbf", ratio: 0.72 },
          { color: "#c29f80", ratio: 0.8 },
          { color: "#e0cf40", ratio: 0.88 },
          { color: "#ffff00", ratio: 1 },
        ],
        maxDensity: 0.01,
        minDensity: 0,
      }),
  },
  [LAYER_IDS.SeattleDemographics]: {
    url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Puget_Sound_BG_demographics/FeatureServer/0",
    title: "Seattle Demographcs | Class Breaks",
    id: LAYER_IDS.SeattleDemographics,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: () => ({
      type: "class-breaks",
      field: "COL_DEG",
      normalizationField: "EDUCBASECY",
      defaultSymbol: {
        type: "simple-fill",
        color: "black",
        style: "backward-diagonal",
        outline: {
          width: 0.5,
          color: [50, 50, 50, 0.6],
        },
      },
      defaultLabel: "no data",
      classBreakInfos: [
        {
          minValue: 0,
          maxValue: 0.3499,
          symbol: CLASS_BREAKS_SEATTLE.Less35.symbol,
          label: "< 35%", // label for symbol in legend
        },
        {
          minValue: 0.35,
          maxValue: 0.4999,
          symbol: CLASS_BREAKS_SEATTLE.Less50.symbol,
          label: "35 - 50%", // label for symbol in legend
        },
        {
          minValue: 0.5,
          maxValue: 0.7499,
          symbol: CLASS_BREAKS_SEATTLE.More50.symbol,
          label: "50 - 75%", // label for symbol in legend
        },
        {
          minValue: 0.75,
          maxValue: 1.0,
          symbol: CLASS_BREAKS_SEATTLE.More75.symbol,
          label: "> 75%", // label for symbol in legend
        },
      ],
    }),
  },
  [LAYER_IDS.MvConservationAreas]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/TrailsMV_Open_Space_Data_pv/FeatureServer/0",
    title: "Conservation Areas",
    id: LAYER_IDS.MvConservationAreas,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    // renderer: () =>
    //   ({
    //     type: "simple",
    //     symbol: {
    //       type: "picture-fill",
    //       url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
    //       width: "14px",
    //       height: "14px",
    //       outline: {
    //         style: "solid"
    //       },
    //     }
    //   }),
      renderer: () =>
      ({
        type: "simple",
        symbol: {
          type: "simple-fill",
          style: "diagonal-cross",
          color: [25, 100, 25, 0.4],
          outline: {
            color: [25, 100, 25, 0.4],

          },
        }
      }),
    // popupEnabled: true,
    popupTemplate: {
      title: "Custom Popup",
      outFields: ["*"],
      content: [
        {
          type: "custom",
          creator: (event) =>
            new Promise((resolve, reject) =>
              resolve(event.graphic?.attributes)
            ).then((data: Record<string, any> | null) => {
              console.log(event, data);
              return `<p>${data?.OPENSPACE_POLY_MVC_Prop_ID}</p>`;
            }),
        },
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "OPENSPACE_POLY_MVC_Prop_ID",
              label: "Prop ID",
            },
          ],
        },
      ],
    },
    // popupTemplate: {
    //   title: "Conservation Areas",
    //   content: "<p>{tbl_info4_ICP_APPORGID}</p>",
    // },
  },
  [LAYER_IDS.MvTrailsArrows]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/BPAC_Trails/FeatureServer/1",
    title: "Trails",
    id: LAYER_IDS.MvTrails,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: () => ({
      type: "simple",
      symbol: {
        type: "simple-line",
        color: "blue",
        width: 1.4,
        marker: {
          style: "arrow",
          color: "white",
          placement: "end"
        }
      }
    })
  },
  [LAYER_IDS.MvTrails]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/BPAC_Trails/FeatureServer/1",
    title: "Trails",
    id: LAYER_IDS.MvTrails,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    renderer: () =>
      uniqueValue({
        field: "Surface",
        uniqueValueInfos: [
          {
            value: 2,
            symbol: simpleLine({ strokeColor: "blue", strokeWidth: "8px" })
              .symbol,
          },
          {
            value: 3,
            symbol: simpleLine({ strokeColor: "gold", strokeWidth: "9px" })
              .symbol,
          },
          {
            value: 9,
            symbol: simpleLine({ strokeColor: "orange", strokeWidth: "9px" })
              .symbol,
          },
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
        renderer: () =>
          simpleFill({
            fill: [0, 255, 255, 0.1],
            strokeColor: [0, 255, 255, 0.5],
            strokeWidth: 5,
          }),
      },
      {
        id: 3,
        renderer: () =>
          simpleFill({
            fill: [255, 255, 0, 1],
            strokeColor: [22, 66, 255, 0.5],
            strokeWidth: 3,
          }),
      },
      {
        id: 0,
        renderer: () => ({
          type: "simple",
          symbol: {
            type: "simple-marker",
            style: "square",
            color: "orange",
            size: "8px",  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
              color: [ 255, 255, 0 ],
              width: 1  // points
            }
        }}),
      },
    ],
  },
  [LAYER_IDS.MvBusStops]: {
    url: "https://services1.arcgis.com/FNsEJ848HT5uDOHD/ArcGIS/rest/services/BusStops/FeatureServer/0",
    title: "Bus Stops",
    id: LAYER_IDS.MvBusStops,
    type: ESRI_LAYER_TYPES.FeatureLayer,
    // renderer: () => cimSymbol(),
    // renderer: () => ({
    //   type: "simple",
    //   symbol: {
    //     type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    //     url: "https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png",
    //     width: "64px",
    //     height: "64px"
    // }}),
    // renderer: () => ({
    //   type: "simple",
    //   symbol: {
    //     type: "simple-marker",
    //     style: "square",
    //     color: "blue",
    //     size: "8px",  // pixels
    //     outline: {  // autocasts as new SimpleLineSymbol()
    //       color: [ 255, 255, 0 ],
    //       width: 1  // points
    //     }
    // }}),
    renderer: () => ({
      type: "simple",
      symbol: {
        type: "web-style",
        name: "bus-station",
        styleName: "Esri2DPointSymbolsStyle"
    }}),
    labelingInfo: [
      {
        minScale: 10000,
        maxScale: 100,
        symbol: {
          type: "text",
          color: "gold",
          font: { family: 'Orbitron', style: 'normal', weight: 'bold', size: 12 }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
          expression: "$feature.NAME"
        }
      }
    ]
  },
};

export const MAP_LAYERS: string[] = [
  // LAYER_IDS.SeattleDemographics,
  LAYER_IDS.CensusBlocks,
  LAYER_IDS.MvConservationAreas,
  // LAYER_IDS.MvTrails,
  LAYER_IDS.MvBusStops,
  // LAYER_IDS.Population,
  LAYER_IDS.MvTrailsArrows,
  // LAYER_IDS.Earthquakes
];
