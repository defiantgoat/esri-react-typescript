import { useContext } from "react";
import MapContext from "../components/MapContext";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const useMapTools = () => {
  const mapViewContext = useContext(MapContext) as any;

  const changeBasemap = (basemap: string): void => {
    if (mapViewContext) {
      mapViewContext.map.set("basemap", basemap);
    }
  };

  const addLayer = (layerConfig: {
    url: string;
    title: string;
    type: string;
    id: string;
  }) => {
    if (mapViewContext) {
      const { url, title, type, id } = layerConfig;

      if (type === "FeatureLayer") {
        const featureLayer = new FeatureLayer({
          url,
          id,
          title,
        });
        mapViewContext.map.add(featureLayer);
      }
    }
  };

  const removeLayer = (id: string) => {};

  const hideLayer = (id: string) => {};

  const showLayer = (id: string) => {};

  return {
    changeBasemap,
    addLayer,
    removeLayer,
    hideLayer,
    showLayer,
  };
};

export default useMapTools;
