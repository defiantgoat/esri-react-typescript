import React, { useEffect, useLayoutEffect, useState } from "react";
import EsriMap from "@arcgis/core/Map";
import EsriMapView from "@arcgis/core/views/MapView";
import EsriSceneView from "@arcgis/core/views/SceneView";
import MapContext from "../MapContext";
import { MAP_DEFAULTS } from "../../config";
// import { ESRI_API_KEY } from "../../keys";
import App from "../App";
import AuthContext from "../AuthContext";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import IdentityManager from "@arcgis/core/identity/IdentityManager";

const AppContainer = (): JSX.Element => {
  const [esriMapView, setEsriMapView] = useState(null as any);
  const [viewType, setViewType] = useState<"2D" | "3D">("2D");
  const [identityManager, setIdentityManager] = useState(null as any);
  const appId = "YJKLJ8KeciDM8MuH";

  useEffect(() => {
    const _identityManager = IdentityManager;

    const infoCode = new OAuthInfo({
      // Swap this ID out with registered application ID
      appId,
      // Uncomment the next line and update if using your own portal
      // portalUrl: "https://<host>:<port>/arcgis"
      // Uncomment the next line to prevent the user's signed in state from being shared with other apps on the same domain with the same authNamespace value.
      // authNamespace: "portal_oauth_inline",
      flowType: "auto", // set to this if using a popup for  signing in.
      popup: false,
      // popupCallbackUrl: "oauth-callback.html" // page should be relative to application. Make sure it's updated to handle two-step flow, see https://github.com/Esri/jsapi-resources/blob/master/oauth/oauth-callback.html for a sample of this.
    });

    _identityManager.registerOAuthInfos([infoCode]);
    setIdentityManager(_identityManager);
  }, []);

  useLayoutEffect(() => {
    const { BASEMAP, CENTER, ZOOM, UI } = MAP_DEFAULTS;

    const map = new EsriMap({
      basemap: BASEMAP,
      ground: "world-elevation",
    });

    let view = null as any;

    if (viewType === "2D") {
      view = new EsriMapView({
        map,
        container: "mapContainer",
        center: CENTER,
        zoom: ZOOM,
        popup: {
          autoOpenEnabled: false,
        },
        ui: {
          components: [],
        },
      });
    } else {
      const [x, y] = CENTER;
      view = new EsriSceneView({
        map,
        container: "mapContainer",
        camera: {
          position: {
            x,
            y,
            z: 2000,
          },
          tilt: 74,
        },
      });
    }

    UI.forEach(([widget, position]) => view.ui.add(widget(view), position));

    setEsriMapView(view);
  }, [viewType]);

  return (
    <AuthContext.Provider value={identityManager}>
      <MapContext.Provider value={esriMapView}>
        <App />
      </MapContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppContainer;
