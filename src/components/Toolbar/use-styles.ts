import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  sidebar: {
    backgroundColor: '#ccc',
    flexBasis: '33%',
    maxWidth: "300px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: ".5rem"
  },
  title: {
    textAlign: 'center'
  },
  basemapButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }
});

export default useStyles;