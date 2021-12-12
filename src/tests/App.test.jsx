import React from "react";
import {render} from "@testing-library/react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import App from "../components/App";
import MapContext from "../components/MapContext";

jest.mock("../components/Toolbar", () => {
  return {
    __esModule: true,
    default: () => {
      return <div>toolbar</div>;
    },
  };
});

jest.mock("@arcgis/core/core/uuid.js", () => ({
  generateUUID: () => "mock-esri-uuid"
}));

jest.mock("@arcgis/core/Map");
jest.mock("@arcgis/core/views/MapView");

Map.mockImplementation(() => ({
  basemap: "dark-gray-vector",
}));

MapView.mockImplementation(() => ({
  map: new Map(),
  container: "mapContainer",
  center: [-77.091, 38.8816],
  zoom: 12,
}));

describe("App", () => {

  it("view is rendered", () => {
    const mockMapView = new MapView();

    const {container} = render(<MapContext.Provider value={mockMapView}><App/></MapContext.Provider>);

    expect(container).not.toBeUndefined();
  });

});