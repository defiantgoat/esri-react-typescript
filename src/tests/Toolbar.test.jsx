import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapContext from "../components/MapContext";
import Toolbar, { ESRI_BASEMAPS } from "../components/Toolbar";

jest.mock("@arcgis/core/core/uuid.js", () => ({
  generateUUID: () => "mock-esri-uuid",
}));

jest.mock("@arcgis/core/Map");
jest.mock("@arcgis/core/views/MapView");

const setMock = jest.fn();

Map.mockImplementation(() => ({
  basemap: "dark-gray-vector",
  set: setMock,
}));

MapView.mockImplementation(() => ({
  map: new Map(),
  container: "mapContainer",
  center: [-77.091, 38.8816],
  zoom: 12,
}));

describe("Toolbar", () => {
  it("view is rendered with buttons", () => {
    const mockMapView = new MapView();

    const { container, getByText } = render(
      <MapContext.Provider value={mockMapView}>
        <Toolbar />
      </MapContext.Provider>
    );

    expect(container).not.toBeUndefined();

    ESRI_BASEMAPS.forEach((basemap) => {
      expect(
        getByText(basemap.toUpperCase().replace(/-/g, " "))
      ).not.toBeUndefined();
    });
  });

  it("updates basemap when button is clicked", () => {
    const mockMapView = new MapView();

    const { getByText } = render(
      <MapContext.Provider value={mockMapView}>
        <Toolbar />
      </MapContext.Provider>
    );

    const satelliteButton = getByText("SATELLITE");
    expect(satelliteButton.tagName).toEqual("BUTTON");

    act(() => {
      fireEvent.click(satelliteButton);
    });

    expect(setMock).toHaveBeenCalledWith("basemap", "satellite");
  });
});
