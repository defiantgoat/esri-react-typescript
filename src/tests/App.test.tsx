import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../components/App";

describe("App tests", () => {

  afterEach(cleanup);

  it("renders App", async ()=> {
    const { container } = render(<App />);
    
    expect(container).not.toBeNull();
    expect(container).not.toBeUndefined();
  });
  
});
