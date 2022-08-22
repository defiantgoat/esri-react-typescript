import React, { useCallback, useEffect, useRef, useState } from "react";
import useStyles from "./use-styles";
import useMapTools from "../../hooks/useMapTools";
import { ESRI_BASEMAPS, LAYER_IDS, populationDotDensity } from "../../config";
import { simpleLine } from "../../renderers";
import MapView from "@arcgis/core/views/MapView";

const Toolbar = (): JSX.Element => {
  const classes = useStyles();
  const {
    reorderLayer,
    getMapView,
    setBasemap,
    hideLayer,
    setRenderer,
    getMapViewProperty,
    addEventHandlerToView,
    addWatchHandlerToView,
    queryLayerViewFeatures,
    queryLayerFeatures,
  } = useMapTools();
  const viewHandlers = useRef({} as any);
  const [busy, setBusy] = useState(false);

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
  };
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

    const viewOnClick = addEventHandlerToView(
      "click",
      (event: any, view: MapView) => {
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
      }
    );

    const watchBasemap = addWatchHandlerToView(
      "map.basemap",
      (
        newValue: any,
        oldValue: any,
        propertyName: any,
        target: any,
        view: MapView
      ) => {
        console.log(newValue, oldValue, propertyName, target, view);
      }
    );

    viewHandlers.current = {
      ...viewHandlers.current,
      watchBasemap,
      viewOnClick,
    };
  }, [addEventHandlerToView, addWatchHandlerToView]);

  return (
    <div className={classes.sidebar}>
      <div className={classes.title}>JS Study</div>
      <div className={classes.basemapButtons}>
        {/* {ESRI_BASEMAPS.map((basemap) => (
          <button
            key={`button-${basemap}`}
            onClick={() => {
              setBasemap(basemap);
              hideLayer("pois");
            }}
          >
            {basemap.toUpperCase().replace(/-/g, " ")}
          </button>
        ))} */}
        <button
          onClick={() => {
            setRenderer(LAYER_IDS.MvTrails, dottedLine());
          }}
        >
          Update Trails Renderer
        </button>
        <button
          onClick={() => {
            reorderLayer(LAYER_IDS.MvTrails, 0);
          }}
        >
          Move TrailHeadPois
        </button>
        <button
          onClick={() => {
            setRenderer(LAYER_IDS.Population, dotDensityCallback());
          }}
        >
          Update Population Renderer
        </button>
        <button
          onClick={async () => {
            const { features } = (await queryLayerFeatures(
              LAYER_IDS.Population,
              {
                where: "State = 'Delaware'",
                returnGeometry: true,
              }
            )) as any;
            const view = getMapView();
            if (view) {
              await view.goTo(features);
            }
            // console.log(features)
          }}
        >
          Query LayerView (Client)
        </button>
        <button
          disabled={busy}
          style={{ opacity: busy ? 0.4 : 1 }}
          onClick={async () => {
            try {
              setBusy(true);
              const view = getMapView();
              if (view) {
                setBusy(true);
                const features = await queryLayerFeatures(
                  LAYER_IDS.Population,
                  {
                    returnGeometry: true,
                    geometry: view.center,
                    distance: 50,
                    units: "miles",
                    spatialRelationship: "intersects",
                    outFields: ["*"],
                    f: "pjson",
                    outSpatialReference: { wkid: 102100 },
                  }
                );

                console.log(features);
              }
            } catch (e) {
            } finally {
              setBusy(false);
            }
          }}
        >
          Query Layer By Map Center (Spatial)
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
