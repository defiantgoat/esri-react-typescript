import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";

type RGBAColor = [number, number, number, number];


export const heatmap = ({
  field,
  colorStops,
  minDensity,
  maxDensity,
  radius,
}: {
  field?: string;
  colorStops: any[];
  minDensity?: number;
  maxDensity?: number;
  radius?: number;
}) => ({
  type: "heatmap",
  field: field || undefined,
  colorStops,
  minDensity: minDensity || 0,
  maxDensity: maxDensity || 500,
  radius: radius || undefined,
});

export const pieChart = ({attributes}: {attributes: any[]}, otherProps = {}) => ({
  type: "pie-chart",
  attributes,
  ...otherProps
})

export const dotDensity = ({attributes, referenceScale, dotValue}: {attributes: any[], referenceScale?: number, dotValue: number}, otherProps = {}) => ({
  type: "dot-density",
  dotValue,
  referenceScale: referenceScale || undefined,
  attributes,
  ...otherProps
});

export const simpleFill = ({
  fill,
  strokeColor,
  strokeWidth,
  strokeStyle,
}: {
  fill: RGBAColor | string;
  strokeColor: RGBAColor | string;
  strokeWidth?: number;
  strokeStyle?: string;
}) => ({
  type: "simple",
  symbol: {
    type: "simple-fill",
    color: fill,
    outline: {
      color: strokeColor || [255, 255, 255, 1],
      width: strokeWidth || 0,
      style: strokeStyle || "solid",
    },
  },
});

export const simpleLine = ({
  strokeColor,
  strokeWidth,
  strokeStyle,
}: {
  strokeColor: RGBAColor | string;
  strokeWidth?: number | string;
  strokeStyle?: string;
}) => ({
  type: "simple",
  symbol: {
    type: "simple-line",
    color: strokeColor,
    width: strokeWidth || 1,
    style: strokeStyle || "solid",
  },
});

// {
//   type: "simple",
//   symbol: new CIMSymbol({
//     data: cimPlayground({fill:[0, 0, 0, 255]}),
//   }),

export const cimSymbol = (): any => ({
  type: "simple",
  //@ts-ignore
  symbol: new CIMSymbol({
    data: {
      type: "CIMSymbolReference",
      minScale: 15000, // only allow the symbol to be shown at certain scales
      maxScale: 100,
      symbol: {
        "type": "CIMPointSymbol",
        "symbolLayers": [
          {
            "type": "CIMVectorMarker",
            "enable": true,
            "anchorPointUnits": "Relative",
            "dominantSizeAxis3D": "Y",
            "size": 33,
            "billboardMode3D": "FaceNearPlane",
            "frame": {
              "xmin": 0,
              "ymin": 0,
              "xmax": 21,
              "ymax": 21
            },
            "markerGraphics": [
              {
                "type": "CIMMarkerGraphic",
                "geometry": {
                  "rings": [
                    [
                      [
                        10.5,
                        18
                      ],
                      [
                        11.74,
                        17.94
                      ],
                      [
                        12.98,
                        17.75
                      ],
                      [
                        14.14,
                        17.46
                      ],
                      [
                        15.15,
                        17.08
                      ],
                      [
                        15.95,
                        16.63
                      ],
                      [
                        16.53,
                        16.13
                      ],
                      [
                        16.88,
                        15.58
                      ],
                      [
                        17,
                        15
                      ],
                      [
                        17,
                        5
                      ],
                      [
                        16,
                        5
                      ],
                      [
                        16,
                        3.5
                      ],
                      [
                        15.85,
                        3.15
                      ],
                      [
                        15.5,
                        3
                      ],
                      [
                        14.5,
                        3
                      ],
                      [
                        14.15,
                        3.15
                      ],
                      [
                        14,
                        3.5
                      ],
                      [
                        14,
                        5
                      ],
                      [
                        7,
                        5
                      ],
                      [
                        7,
                        3.5
                      ],
                      [
                        6.85,
                        3.15
                      ],
                      [
                        6.5,
                        3
                      ],
                      [
                        5.5,
                        3
                      ],
                      [
                        5.15,
                        3.15
                      ],
                      [
                        5,
                        3.5
                      ],
                      [
                        5,
                        5
                      ],
                      [
                        4,
                        5
                      ],
                      [
                        4,
                        15
                      ],
                      [
                        4.12,
                        15.58
                      ],
                      [
                        4.47,
                        16.13
                      ],
                      [
                        5.05,
                        16.63
                      ],
                      [
                        5.85,
                        17.08
                      ],
                      [
                        6.86,
                        17.46
                      ],
                      [
                        8.02,
                        17.75
                      ],
                      [
                        9.26,
                        17.94
                      ],
                      [
                        10.5,
                        18
                      ]
                    ],
                    [
                      [
                        7,
                        16
                      ],
                      [
                        7,
                        15
                      ],
                      [
                        14,
                        15
                      ],
                      [
                        14,
                        16
                      ],
                      [
                        7,
                        16
                      ]
                    ],
                    [
                      [
                        7,
                        6.5
                      ],
                      [
                        7,
                        7.5
                      ],
                      [
                        6.86,
                        7.86
                      ],
                      [
                        6.5,
                        8
                      ],
                      [
                        5.5,
                        8
                      ],
                      [
                        5.14,
                        7.86
                      ],
                      [
                        5,
                        7.5
                      ],
                      [
                        5,
                        6.5
                      ],
                      [
                        5.15,
                        6.15
                      ],
                      [
                        5.5,
                        6
                      ],
                      [
                        6.5,
                        6
                      ],
                      [
                        6.85,
                        6.15
                      ],
                      [
                        7,
                        6.5
                      ]
                    ],
                    [
                      [
                        16,
                        6.5
                      ],
                      [
                        16,
                        7.5
                      ],
                      [
                        15.86,
                        7.86
                      ],
                      [
                        15.5,
                        8
                      ],
                      [
                        14.5,
                        8
                      ],
                      [
                        14.15,
                        7.86
                      ],
                      [
                        14,
                        7.5
                      ],
                      [
                        14,
                        6.5
                      ],
                      [
                        14.15,
                        6.15
                      ],
                      [
                        14.5,
                        6
                      ],
                      [
                        15.5,
                        6
                      ],
                      [
                        15.85,
                        6.15
                      ],
                      [
                        16,
                        6.5
                      ]
                    ],
                    [
                      [
                        16,
                        9
                      ],
                      [
                        16,
                        14
                      ],
                      [
                        5,
                        14
                      ],
                      [
                        5,
                        9
                      ],
                      [
                        16,
                        9
                      ]
                    ]
                  ]
                },
                "symbol": {
                  "type": "CIMPolygonSymbol",
                  "symbolLayers": [
                    {
                      "type": "CIMSolidStroke",
                      "enable": true,
                      "capStyle": "Round",
                      "joinStyle": "Round",
                      "lineStyle3D": "Strip",
                      "miterLimit": 10,
                      "width": 0,
                      "color": [
                        0,
                        0,
                        0,
                        255
                      ]
                    },
                    {
                      "type": "CIMSolidFill",
                      "enable": true,
                      "color": [
                        51,
                        51,
                        51,
                        255
                      ]
                    }
                  ]
                }
              }
            ],
            "scaleSymbolsProportionally": true,
            "respectFrame": true
          },
          {
            "type": "CIMVectorMarker",
            "enable": true,
            "anchorPoint": {
              "x": 0,
              "y": 0
            },
            "anchorPointUnits": "Relative",
            "dominantSizeAxis3D": "Y",
            "size": 40,
            "billboardMode3D": "FaceNearPlane",
            "frame": {
              "xmin": 0,
              "ymin": 0,
              "xmax": 17,
              "ymax": 17
            },
            "markerGraphics": [
              {
                "type": "CIMMarkerGraphic",
                "geometry": {
                  "rings": [
                    [
                      [
                        8.5,
                        0
                      ],
                      [
                        7.02,
                        0.13
                      ],
                      [
                        5.59,
                        0.51
                      ],
                      [
                        4.25,
                        1.14
                      ],
                      [
                        3.04,
                        1.99
                      ],
                      [
                        1.99,
                        3.04
                      ],
                      [
                        1.14,
                        4.25
                      ],
                      [
                        0.51,
                        5.59
                      ],
                      [
                        0.13,
                        7.02
                      ],
                      [
                        0,
                        8.5
                      ],
                      [
                        0.13,
                        9.98
                      ],
                      [
                        0.51,
                        11.41
                      ],
                      [
                        1.14,
                        12.75
                      ],
                      [
                        1.99,
                        13.96
                      ],
                      [
                        3.04,
                        15.01
                      ],
                      [
                        4.25,
                        15.86
                      ],
                      [
                        5.59,
                        16.49
                      ],
                      [
                        7.02,
                        16.87
                      ],
                      [
                        8.5,
                        17
                      ],
                      [
                        9.98,
                        16.87
                      ],
                      [
                        11.41,
                        16.49
                      ],
                      [
                        12.75,
                        15.86
                      ],
                      [
                        13.96,
                        15.01
                      ],
                      [
                        15.01,
                        13.96
                      ],
                      [
                        15.86,
                        12.75
                      ],
                      [
                        16.49,
                        11.41
                      ],
                      [
                        16.87,
                        9.98
                      ],
                      [
                        17,
                        8.5
                      ],
                      [
                        16.87,
                        7.02
                      ],
                      [
                        16.49,
                        5.59
                      ],
                      [
                        15.86,
                        4.25
                      ],
                      [
                        15.01,
                        3.04
                      ],
                      [
                        13.96,
                        1.99
                      ],
                      [
                        12.75,
                        1.14
                      ],
                      [
                        11.41,
                        0.51
                      ],
                      [
                        9.98,
                        0.13
                      ],
                      [
                        8.5,
                        0
                      ]
                    ]
                  ]
                },
                "symbol": {
                  "type": "CIMPolygonSymbol",
                  "symbolLayers": [
                    {
                      "type": "CIMSolidStroke",
                      "enable": true,
                      "capStyle": "Round",
                      "joinStyle": "Round",
                      "lineStyle3D": "Strip",
                      "miterLimit": 10,
                      "width": 0,
                      "color": [
                        0,
                        0,
                        0,
                        255
                      ]
                    },
                    {
                      "type": "CIMSolidFill",
                      "enable": true,
                      "color": [
                        233,
                        226,
                        226,
                        255
                      ]
                    }
                  ]
                }
              }
            ],
            "scaleSymbolsProportionally": true,
            "respectFrame": true
          }
        ]
      },
    },
  }),
});

export const cimPlayground = ({ fill }: { fill?: RGBAColor }): any => ({
  type: "CIMSymbolReference",
  minScale: 2000, // only allow the symbol to be shown at certain scales
  maxScale: 100,
  symbol: {
    type: "CIMPointSymbol",
    symbolLayers: [
      {
        type: "CIMVectorMarker",
        enable: true,
        anchorPointUnits: "Relative",
        dominantSizeAxis3D: "Y",
        size: 20,
        billboardMode3D: "FaceNearPlane",
        frame: {
          xmin: 0,
          ymin: 0,
          xmax: 21,
          ymax: 21,
        },
        markerGraphics: [
          {
            type: "CIMMarkerGraphic",
            geometry: {
              rings: [
                [
                  [16.54, 13.14],
                  [17.98, 10.76],
                  [19, 11],
                  [19, 9],
                  [15.97, 8.29],
                  [17.09, 6.43],
                  [16.23, 5.91],
                  [14.94, 8.05],
                  [10.96, 7.11],
                  [12, 4],
                  [12, 2],
                  [9, 2],
                  [9, 4.01],
                  [9.96, 6.87],
                  [6.77, 6.12],
                  [6.03, 3.42],
                  [5.07, 3.68],
                  [5.66, 5.86],
                  [2, 5],
                  [2, 7],
                  [2.91, 7.22],
                  [3.75, 10.29],
                  [3.92, 10.63],
                  [4.21, 10.88],
                  [4.56, 11],
                  [4.94, 10.97],
                  [5, 10.95],
                  [5.05, 10.93],
                  [7.49, 9.92],
                  [8.04, 8.42],
                  [12.94, 9.58],
                  [13.04, 11.76],
                  [15.11, 13.4],
                  [15.16, 13.44],
                  [15.21, 13.47],
                  [15.56, 13.6],
                  [15.94, 13.58],
                  [16.28, 13.42],
                  [16.54, 13.14],
                ],
                [
                  [13.73, 11.04],
                  [13.69, 9.75],
                  [15.59, 10.2],
                  [15.88, 10.37],
                  [14.91, 11.97],
                  [13.73, 11.04],
                ],
                [
                  [7.03, 9.03],
                  [5.64, 9.61],
                  [5.15, 7.8],
                  [5.27, 7.77],
                  [7.31, 8.25],
                  [7.03, 9.03],
                ],
                [
                  [5.5, 12],
                  [4.93, 12.11],
                  [4.44, 12.44],
                  [4.11, 12.93],
                  [4, 13.5],
                  [4.11, 14.07],
                  [4.44, 14.56],
                  [4.93, 14.89],
                  [5.5, 15],
                  [6.07, 14.89],
                  [6.56, 14.56],
                  [6.89, 14.07],
                  [7, 13.5],
                  [6.89, 12.93],
                  [6.56, 12.44],
                  [6.07, 12.11],
                  [5.5, 12],
                ],
                [
                  [14.5, 14],
                  [13.93, 14.11],
                  [13.44, 14.44],
                  [13.11, 14.93],
                  [13, 15.5],
                  [13.11, 16.07],
                  [13.44, 16.56],
                  [13.93, 16.89],
                  [14.5, 17],
                  [15.07, 16.89],
                  [15.56, 16.56],
                  [15.89, 16.07],
                  [16, 15.5],
                  [15.89, 14.93],
                  [15.56, 14.44],
                  [15.07, 14.11],
                  [14.5, 14],
                ],
              ],
            },
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMSolidStroke",
                  enable: true,
                  capStyle: "Round",
                  joinStyle: "Round",
                  lineStyle3D: "Strip",
                  miterLimit: 10,
                  width: 0,
                  color: [0, 0, 0, 255],
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [51, 51, 51, 255],
                },
              ],
            },
          },
        ],
        scaleSymbolsProportionally: true,
        respectFrame: true,
      },
      {
        type: "CIMVectorMarker",
        enable: true,
        anchorPoint: {
          x: 0,
          y: 0,
        },
        anchorPointUnits: "Relative",
        dominantSizeAxis3D: "Y",
        size: 30,
        billboardMode3D: "FaceNearPlane",
        frame: {
          xmin: 0,
          ymin: 0,
          xmax: 17,
          ymax: 17,
        },
        markerGraphics: [
          {
            type: "CIMMarkerGraphic",
            geometry: {
              rings: [
                [
                  [8.5, 0],
                  [7.02, 0.13],
                  [5.59, 0.51],
                  [4.25, 1.14],
                  [3.04, 1.99],
                  [1.99, 3.04],
                  [1.14, 4.25],
                  [0.51, 5.59],
                  [0.13, 7.02],
                  [0, 8.5],
                  [0.13, 9.98],
                  [0.51, 11.41],
                  [1.14, 12.75],
                  [1.99, 13.96],
                  [3.04, 15.01],
                  [4.25, 15.86],
                  [5.59, 16.49],
                  [7.02, 16.87],
                  [8.5, 17],
                  [9.98, 16.87],
                  [11.41, 16.49],
                  [12.75, 15.86],
                  [13.96, 15.01],
                  [15.01, 13.96],
                  [15.86, 12.75],
                  [16.49, 11.41],
                  [16.87, 9.98],
                  [17, 8.5],
                  [16.87, 7.02],
                  [16.49, 5.59],
                  [15.86, 4.25],
                  [15.01, 3.04],
                  [13.96, 1.99],
                  [12.75, 1.14],
                  [11.41, 0.51],
                  [9.98, 0.13],
                  [8.5, 0],
                ],
              ],
            },
            symbol: {
              type: "CIMPolygonSymbol",
              symbolLayers: [
                {
                  type: "CIMSolidStroke",
                  enable: true,
                  capStyle: "Round",
                  joinStyle: "Round",
                  lineStyle3D: "Strip",
                  miterLimit: 10,
                  width: 0,
                  color: [0, 0, 0, 255],
                },
                {
                  type: "CIMSolidFill",
                  enable: true,
                  color: [233, 226, 226, 255],
                },
              ],
            },
          },
        ],
        scaleSymbolsProportionally: true,
        respectFrame: true,
      },
    ],
  },
});


export const uniqueValue = ({field, uniqueValueInfos, visualVariables}: {field: string, uniqueValueInfos: any[], visualVariables?: any[]}) => ({
  type: "unique-value",
  field,
  defaultSymbol: simpleLine({strokeColor: "white", strokeWidth: 7}).symbol,
  uniqueValueInfos,
  visualVariables: visualVariables || undefined,
})
