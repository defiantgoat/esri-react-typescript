import React from "react";
import {render} from "@testing-library/react";
import MapContainer from "../components/MapContainer";
import App from "../components/App";

describe("App", () => {
  it("tests", () => {
    const {container, debug} = render(<App/>);

    debug();
  });
});