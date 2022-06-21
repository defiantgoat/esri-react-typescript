import { useContext } from "react";
import MapContext from "../components/MapContext";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";

const useMapTools = () => {
  const mapViewContext = useContext(MapContext) as any;

  const _findLayer = (id: string): Layer | null => mapViewContext?.map.allLayers.find((layer) => layer.id === id);

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
      const { url, title, type, id } = layerConfig;
      if (type === "FeatureLayer") {
        const featureLayer = new FeatureLayer({
          url,
          id,
          title,
        });

        mapViewContext?.map.add(featureLayer);
      }
  };

  const removeLayer = (id: string) => {};

  const hideLayer = (id: string) => {
    const layer = _findLayer(id);
    if (layer) {
      layer.visible = false;
    }
  };

  const showLayer = (id: string) => {
    const layer = _findLayer(id);
    if (layer) {
      layer.visible = true;
    }
  };

  return {
    changeBasemap,
    addLayer,
    removeLayer,
    hideLayer,
    showLayer,
  };
};

export default useMapTools;
