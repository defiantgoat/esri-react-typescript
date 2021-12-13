import React from "react";
import { render } from "@testing-library/react";
import MapContainer from "../components/MapContainer";

describe("MapContainer", () => {
  it("is rendered", () => {

    const { container, debug } = render(
      <MapContainer />
    );

    expect(container).not.toBeUndefined();
    const [mapDiv] = container.children;
    expect(mapDiv.getAttribute("id")).toEqual("mapContainer")  
  });
});
