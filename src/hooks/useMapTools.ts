import { useContext } from "react";
import MapContext from "../components/MapContext";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import CSVLayer from "@arcgis/core/layers/CSVLayer";
import Layer from "@arcgis/core/layers/Layer";
import { LayerConfig, ESRI_LAYER_TYPES } from "../config";

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
    const { url, title, type, id, renderer, sublayers, visible } = layerConfig;

    switch (type) {
      case ESRI_LAYER_TYPES.FeatureLayer:
        const featureLayer = new FeatureLayer({
          url,
          id,
          title,
        });

        if (renderer) {
          featureLayer.renderer = renderer;
        }

        mapViewContext?.map.add(featureLayer);
        break;

      case ESRI_LAYER_TYPES.MapImageLayer:
        const mapImageLayer = new MapImageLayer({
          url,
          id,
          title,
        });

        if (sublayers) {
          mapImageLayer.sublayers = sublayers as any;
        }

        mapViewContext?.map.add(mapImageLayer);
        break;

      case ESRI_LAYER_TYPES.CVSLayer:
        const csvLayer = new CSVLayer({ url, id, title });
        if (renderer) {
          console.log(renderer)
          csvLayer.renderer = renderer;
        }
        mapViewContext?.map.add(csvLayer);

      default:
        break;
    }

    // if (type === "FeatureLayer") {
    //   const featureLayer = new FeatureLayer({
    //     url,
    //     id,
    //     title,
    //   });

    //   if (renderer) {
    //     featureLayer.renderer = renderer;
    //   }

    //   mapViewContext?.map.add(featureLayer);
    // }
    // if (type === "MapImageLayer") {
    //   const mapImageLayer = new MapImageLayer({
    //     url,
    //     id,
    //     title,
    //   });

    //   if (sublayers) {
    //     mapImageLayer.sublayers = sublayers as any;
    //   }

    //   mapViewContext?.map.add(mapImageLayer);
    // }
    // if (type === "CVSLayer") {

    // }
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

  const setRenderer = (id: string, renderer: any) => {
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
