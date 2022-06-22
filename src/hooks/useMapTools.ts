import { useContext } from "react";
import MapContext from "../components/MapContext";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Layer from "@arcgis/core/layers/Layer";
import Renderer from "@arcgis/core/renderers/Renderer";
import { LayerConfig } from "../config";

const useMapTools = () => {
  const mapViewContext = useContext(MapContext) as any;

  const findLayer = (id: string): Layer | null => mapViewContext?.map.allLayers.find((layer: Layer) => layer.id === id);

  const changeBasemap = (basemap: string): void => {
    if (mapViewContext) {
      mapViewContext.map.set("basemap", basemap);
    }
  };

  const addLayer = (layerConfig: LayerConfig) => {
      const { url, title, type, id, renderer, sublayers } = layerConfig;
      if (type === "FeatureLayer") {
        const featureLayer = new FeatureLayer({
          url,
          id,
          title,
        });

        if (renderer) {
          featureLayer.renderer = renderer;
        }

        mapViewContext?.map.add(featureLayer);
      }
      if (type === "MapImageLayer") {
        const mapImageLayer = new MapImageLayer({
          url,
          id,
          title,
        });

        if (sublayers) {
          mapImageLayer.sublayers = sublayers as any;
        }

        mapViewContext?.map.add(mapImageLayer);
      }
  };

  const removeLayer = (id: string) => {};

  const hideLayer = (id: string) => {
    const layer = findLayer(id);
    if (layer) {
      layer.visible = false;
    }
  };

  const showLayer = (id: string) => {
    const layer = findLayer(id);
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
    findLayer
  };
};

export default useMapTools;
