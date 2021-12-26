import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  sidebar: {
    backgroundColor: "lightblue",
    flexBasis: "33%",
    maxWidth: "300px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "1rem",
    borderRight: "5px solid #fff",
  },
  title: {
    textAlign: "center",
    fontSize: "1.9em",
    fontWeight: 600,
    color: "darkblue",
  },
  basemapButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    "& button": {
      borderRadius: "5px",
      border: "none",
      backgroundColor: "aliceblue",
      color: "darkblue",
      fontSize: "1.1em",
      cursor: "pointer",
      fontWeight: 200,
      padding: ".5em",
    },
    "& button:hover": {
      backgroundColor: "darkblue",
      color: "aliceblue"
    }
  },
});

export default useStyles;
