import React, { useCallback, useEffect, useRef } from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import { ESRI_BASEMAPS, LAYER_IDS, populationDotDensity } from "../../config";
import { simpleLine } from "../../renderers";
import MapView from "@arcgis/core/views/MapView";

const Toolbar = (): JSX.Element => {
  const classes = useStyles();
  const { setBasemap, hideLayer, setRenderer, getMapViewProperty, addEventHandlerToView, addWatchHandlerToView, queryLayerViewFeatures, queryLayerFeatures } =
    useMapTools();
  const viewHandlers = useRef({} as any);

  const dottedLine = useCallback(
    () =>
      simpleLine({
        strokeColor: [200, 200, 200, 1],
        strokeWidth: "3px",
        strokeStyle: "short-dot",
      }),
    [simpleLine]
  );

  const dotDensityCallback = useCallback(() => {
    return populationDotDensity(getMapViewProperty("scale"));
  }, [populationDotDensity, getMapViewProperty]);

  const handleRemove = (eventName: string) => {
    if (viewHandlers.current[eventName]) {
      viewHandlers.current[eventName].remove();
      delete viewHandlers.current[eventName];
    }
  }
  useEffect(() => {
    // addEventHandlerToView("click", (event: any, view: MapView) => {
    //   console.log("handler 1")
    //   view.popup.open({
    //     title: "Point",
    //     location: event.mapPoint
    //   });
    //   locator.locationToAddress("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",{location: event.mapPoint})
    //   .then((response) => {
    //     view.popup.content = response.address;
    //   })
    //   .catch(() => {
    //     view.popup.content = "No addy found"
    //   });
    // });
    
    const viewOnClick = addEventHandlerToView("click", (event: any, view: MapView) => {
      view.hitTest(event.screenPoint).then(({ results }) => {
        const features: any[] = results.filter(
          ({ type, layer }) => layer.type === "feature" && type === "graphic"
        );
        console.log(features);
        const graphics = features.map(({ graphic }) => graphic);
        console.log(graphics);
        view.popup.open({
          title: "Data",
          location: event.mapPoint,
          features: graphics,
        });
      });
    });

    const watchBasemap = addWatchHandlerToView("map.basemap", (newValue: any, oldValue: any, propertyName: any, target: any, view: MapView) => {
      console.log(newValue, oldValue, propertyName, target, view);
    });

    viewHandlers.current = {
      ...viewHandlers.current,
      watchBasemap,
      viewOnClick
    }

  }, [addEventHandlerToView, addWatchHandlerToView]);

  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>TrailsMV</div>
      <div className={classes.basemapButtons}>
        {ESRI_BASEMAPS.map((basemap) => (
          <button
            key={`button-${basemap}`}
            onClick={() => {
              setBasemap(basemap);
              hideLayer("pois");
            }}
          >
            {basemap.toUpperCase().replace(/-/g, " ")}
          </button>
        ))}
        <button
          onClick={() => {
            setRenderer(LAYER_IDS.MvTrails, dottedLine());
          }}
        >
          Update Trails Renderer
        </button>
        <button
          onClick={() => {
            setRenderer(LAYER_IDS.Population, dotDensityCallback());
          }}
        >
          Update Population Renderer
        </button>
        <button
          onClick={async() => {
            const features = await queryLayerViewFeatures(LAYER_IDS.Population, {
              where: "State = 'Delaware'",
              returnGeometry: true
            });

            console.log(features)
          }}
        >
          Query LayerView
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
