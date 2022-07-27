import React, { useCallback } from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import { ESRI_BASEMAPS, LAYER_IDS, populationDotDensity } from "../../config";
import { simpleLine } from "../../renderers";

const Toolbar = (): JSX.Element => {
  const classes = useStyles();
  const { setBasemap, hideLayer, setRenderer, getMapViewProperty } =
    useMapTools();

  const dottedLine = useCallback(
    () =>
      simpleLine({
        strokeColor: [200, 200, 200, 1],
        strokeWidth: "3px",
        strokeStyle: "short-dot",
      }),
    [simpleLine]
  );

  const dotDensityCallback = useCallback(() => {
    return populationDotDensity(getMapViewProperty("scale"));
  }, [populationDotDensity, getMapViewProperty]);

  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>TrailsMV</div>
      <div className={classes.basemapButtons}>
        {ESRI_BASEMAPS.map((basemap) => (
          <button
            key={`button-${basemap}`}
            onClick={() => {
              setBasemap(basemap);
              hideLayer("pois");
            }}
          >
            {basemap.toUpperCase().replace(/-/g, " ")}
          </button>
        ))}
        <button
          onClick={() => {
            setRenderer(LAYER_IDS.MvTrails, dottedLine());
          }}
        >
          Update Trails Renderer
        </button>
        <button
          onClick={() => {
            setRenderer(LAYER_IDS.Population, dotDensityCallback());
          }}
        >
          Update Population Renderer
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
