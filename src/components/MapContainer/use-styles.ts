import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  map: {
    flexGrow: 1,
    backgroundColor: "#eee",
    "& #mapContainer": {
      width: "100%",
      height: "100%",
    },
  },
});

export default useStyles;
