import React, {useCallback} from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import { ESRI_BASEMAPS, LAYER_IDS } from "../../config";
import { simpleLine } from "../../renderers";

const Toolbar = (): JSX.Element => {
  const classes = useStyles();
  const { changeBasemap, hideLayer, setRenderer } = useMapTools();

  const dottedLine = useCallback(() => simpleLine({
    strokeColor: [222, 111, 88, 1],
    strokeWidth: "3px",
    strokeStyle: "short-dot",
 }), [simpleLine]);
 
  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>TrailsMV</div>
      <div className={classes.basemapButtons}>
        {ESRI_BASEMAPS.map((basemap) => (
          <button
            key={`button-${basemap}`}
            onClick={() => {
              changeBasemap(basemap);
              hideLayer("pois");
            }}
          >
            {basemap.toUpperCase().replace(/-/g, " ")}
          </button>
        ))}
        <button onClick={() => {
          setRenderer(LAYER_IDS.MvTrails, dottedLine())
        }}>Update Trails Renderer</button>
      </div>
    </div>
  );
};

export default Toolbar;
