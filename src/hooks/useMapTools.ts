import { useContext } from "react";
import MapContext from "../components/MapContext";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import CSVLayer from "@arcgis/core/layers/CSVLayer";
import Layer from "@arcgis/core/layers/Layer";
import { LayerConfig, ESRI_LAYER_TYPES } from "../config";
import Renderer from "@arcgis/core/renderers/Renderer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

const useMapTools = () => {
  const mapViewContext = useContext(MapContext) as any;

  const findLayer = (id: string): Layer | null =>
    mapViewContext?.map.allLayers.find((layer: Layer) => layer.id === id);

  const changeBasemap = (basemap: string): void => {
    if (mapViewContext) {
      mapViewContext.map.set("basemap", basemap);
    }
  };

  const addLayer = (layerConfig: LayerConfig) => {
    const { url, title, type, id, renderer, sublayers } = layerConfig;
    let layer = null as FeatureLayer | CSVLayer | MapImageLayer | GeoJSONLayer | null;

    switch (type) {
      case ESRI_LAYER_TYPES.FeatureLayer:
        layer = new FeatureLayer({
          url,
          id,
          title,
        });

        break;

      case ESRI_LAYER_TYPES.MapImageLayer:
        layer = new MapImageLayer({
          url,
          id,
          title,
        });

        break;

      case ESRI_LAYER_TYPES.CVSLayer:
        layer = new CSVLayer({ url, id, title });
        break;

      default:
        break;
    }

    if (layer) {
      if (renderer && !(layer instanceof MapImageLayer)) {
        layer.renderer = renderer(mapViewContext?.scale);
      }

      if (sublayers && layer instanceof MapImageLayer) {
        layer.sublayers = sublayers as any;
      }

      mapViewContext?.map.add(layer);
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

  const setRenderer = (id: string, renderer: Renderer) => {
    const layer = findLayer(id) as FeatureLayer;
    if (layer) {
      layer.renderer = renderer;
    }
  };

  return {
    changeBasemap,
    addLayer,
    removeLayer,
    hideLayer,
    showLayer,
    findLayer,
    setRenderer
  };
};

export default useMapTools;
