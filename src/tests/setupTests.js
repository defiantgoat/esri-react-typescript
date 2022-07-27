// Called by @arcgis/core/widgetrs/support/widgetUtils.js
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Called by @arcgis/core/core/pbj.js
global.TextDecoder = jest.fn().mockImplementation(() => ({
  decode: jest.fn(),
}));
