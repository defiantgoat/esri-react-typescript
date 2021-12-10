import React from "react";
import useStyles from "./use-styles";

interface MapContainerProps {
  children?: JSX.Element | JSX.Element[];
}

const MapContainer: React.FC<MapContainerProps> = ({
  children,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <div id="mapContainer" className={classes.map}>
      {children}
    </div>
  );
};

export default MapContainer;
