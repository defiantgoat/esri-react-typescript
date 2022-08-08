import React from "react";
import MapContainer from "../MapContainer";
import Toolbar from "../Toolbar";
import useStyles from "./use-styles";

const App = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Toolbar />
      <MapContainer />
    </div>
  );
};

export default App;
