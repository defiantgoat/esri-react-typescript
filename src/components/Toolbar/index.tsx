import React, { useContext } from "react";
import MapContext from "../MapContext";
import useStyles from "./use-styles";

const ESRI_BASEMAPS = [
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
  "streets-relief-vector"
];

const Toolbar = (): JSX.Element => {
  const classes = useStyles();

  const mapViewContext = useContext(MapContext) as any;

  const handleBasemapChange = (basemap: string) => {
    if (mapViewContext) {
      mapViewContext.map.set("basemap", basemap);
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>Esri-act</div>
      <div className={classes.basemapButtons}>
        {
          ESRI_BASEMAPS.map((basemap) => (
            <button
              onClick={() => handleBasemapChange(basemap)}
            >
              {basemap.toUpperCase()}
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Toolbar;