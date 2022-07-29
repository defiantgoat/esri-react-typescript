import { useContext, useRef, useCallback } from "react";
import MapContext from "../components/MapContext";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import CSVLayer from "@arcgis/core/layers/CSVLayer";
import Layer from "@arcgis/core/layers/Layer";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import Portal from "@arcgis/core/portal/Portal";
import { LayerConfig, ESRI_LAYER_TYPES } from "../config";

const useMapTools = () => {
  console.log("usemaptools");
  const mapViewContext = useContext(MapContext) as any;
  const viewEventHandlers = useRef([]);

  const getMapViewProperty = (property: string): any | null =>
    mapViewContext?.get(property);

  const getMapProperty = (property: string): any | null =>
    mapViewContext?.map.get(property);

  const addEventHandlerToView = useCallback(
    (eventType: string, callback: any) =>
      mapViewContext?.on(eventType, (event) => callback(event, mapViewContext)),
    [mapViewContext]
  );

  const findLayer = useCallback(
    (id: string): Layer | null =>
      mapViewContext?.map.allLayers.find((layer: Layer) => layer.id === id),
    [mapViewContext]
  );

  const setBasemap = useCallback(
    (basemap: string): void => {
      if (mapViewContext) {
        mapViewContext.map.set("basemap", basemap);
      }
    },
    [mapViewContext]
  );

  const addLayer = useCallback(
    async (layerConfig: LayerConfig) => {
      const {
        url,
        title,
        type,
        id,
        renderer,
        sublayers,
        popupTemplate,
        popupEnabled,
        labelingInfo,
        portalId
      } = layerConfig;
      let layer = null as
        | FeatureLayer
        | CSVLayer
        | MapImageLayer
        | GeoJSONLayer
        | null;

      switch (type) {
        case ESRI_LAYER_TYPES.PortalLayer:
          layer = await Layer.fromPortalItem({
            //@ts-ignore
            portalItem: {
              id: portalId as string,
              portal: new Portal({
                url
              })
            }
          }) as FeatureLayer;
          break;
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
          console.error(
            "LayerConfig type property is missing or is an unknown type."
          );
          break;
      }

      if (layer) {
        if (renderer && !(layer instanceof MapImageLayer)) {
          layer.renderer = renderer(mapViewContext?.scale);
        }

        if (sublayers && layer instanceof MapImageLayer) {
          layer.sublayers = sublayers as any;
        }

        if (popupTemplate && !(layer instanceof MapImageLayer)) {
          // layer.popupEnabled = popupEnabled;
          layer.popupTemplate = popupTemplate;
        }

        if (labelingInfo && !(layer instanceof MapImageLayer)) {
          layer.labelingInfo = labelingInfo;
        }

        mapViewContext?.map.add(layer);
      }
    },
    [mapViewContext, findLayer]
  );

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
    addEventHandlerToView,
    setBasemap,
    addLayer,
    removeLayer,
    hideLayer,
    showLayer,
    findLayer,
    setRenderer,
    getMapViewProperty,
    getMapProperty,
  };
};

export default useMapTools;
