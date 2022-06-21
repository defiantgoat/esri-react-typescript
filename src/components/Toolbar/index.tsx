import React from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import {ESRI_BASEMAPS} from "../../config";


const Toolbar = (): JSX.Element => {
  const classes = useStyles();
  const {changeBasemap} = useMapTools();

  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>EsriAct</div>
      <div className={classes.basemapButtons}>
        {ESRI_BASEMAPS.map((basemap) => (
          <button
            key={`button-${basemap}`}
            onClick={() => changeBasemap(basemap)}
          >
            {basemap.toUpperCase().replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
