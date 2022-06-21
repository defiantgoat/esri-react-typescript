export const MAP_DEFAULTS = {
  CENTER: [-70.6396642, 41.3899984], // Arlington, VA
  ZOOM: 11,
  BASEMAP: "dark-gray-vector",
};

export const MAP_LAYERS = [
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
