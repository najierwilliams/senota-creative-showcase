/**
 * Utility functions to fetch and process GeoJSON map data
 * Converts geographic coordinates to canvas pixels for globe texture rendering
 */

export interface GeoJSONFeature {
  type: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: any[];
  };
}

export interface GeoJSONFeatureCollection {
  type: string;
  features: GeoJSONFeature[];
}

/**
 * Convert latitude/longitude to canvas pixel coordinates
 * Assumes standard Web Mercator projection
 */
export function latLngToCanvasPixel(lat: number, lng: number, canvasWidth: number, canvasHeight: number) {
  // Normalize longitude to 0-360
  const normalizedLng = ((lng + 180) % 360 + 360) % 360;
  const x = (normalizedLng / 360) * canvasWidth;

  // Mercator projection for latitude
  const latRad = (lat * Math.PI) / 180;
  const mercatorLat = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const normalizedLat = (mercatorLat / Math.PI + 1) / 2;
  const y = (1 - normalizedLat) * canvasHeight;

  return { x, y };
}

/**
 * Draw a polygon from GeoJSON coordinates onto canvas
 */
export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  coordinates: number[][][],
  canvasWidth: number,
  canvasHeight: number,
  fillColor: string,
  strokeColor: string,
  lineWidth: number = 1
) {
  coordinates.forEach((ring) => {
    if (ring.length < 2) return;

    ctx.beginPath();
    const firstPoint = latLngToCanvasPixel(ring[0][1], ring[0][0], canvasWidth, canvasHeight);
    ctx.moveTo(firstPoint.x, firstPoint.y);

    for (let i = 1; i < ring.length; i++) {
      const point = latLngToCanvasPixel(ring[i][1], ring[i][0], canvasWidth, canvasHeight);
      ctx.lineTo(point.x, point.y);
    }

    ctx.closePath();
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  });
}

/**
 * Draw a LineString from GeoJSON coordinates onto canvas
 */
export function drawLineString(
  ctx: CanvasRenderingContext2D,
  coordinates: number[][],
  canvasWidth: number,
  canvasHeight: number,
  strokeColor: string,
  lineWidth: number = 1
) {
  if (coordinates.length < 2) return;

  ctx.beginPath();
  const firstPoint = latLngToCanvasPixel(coordinates[0][1], coordinates[0][0], canvasWidth, canvasHeight);
  ctx.moveTo(firstPoint.x, firstPoint.y);

  for (let i = 1; i < coordinates.length; i++) {
    const point = latLngToCanvasPixel(coordinates[i][1], coordinates[i][0], canvasWidth, canvasHeight);
    ctx.lineTo(point.x, point.y);
  }

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

/**
 * Draw MultiPolygon from GeoJSON coordinates
 */
export function drawMultiPolygon(
  ctx: CanvasRenderingContext2D,
  coordinates: number[][][][],
  canvasWidth: number,
  canvasHeight: number,
  fillColor: string,
  strokeColor: string,
  lineWidth: number = 1
) {
  coordinates.forEach((polygon) => {
    drawPolygon(ctx, polygon, canvasWidth, canvasHeight, fillColor, strokeColor, lineWidth);
  });
}

/**
 * Process GeoJSON features and draw them on canvas
 */
export function renderGeoJSONFeatures(
  ctx: CanvasRenderingContext2D,
  features: GeoJSONFeature[],
  canvasWidth: number,
  canvasHeight: number,
  fillColor: string,
  strokeColor: string,
  lineWidth: number = 1
) {
  features.forEach((feature) => {
    const { geometry } = feature;

    if (geometry.type === "Polygon") {
      drawPolygon(ctx, geometry.coordinates, canvasWidth, canvasHeight, fillColor, strokeColor, lineWidth);
    } else if (geometry.type === "MultiPolygon") {
      drawMultiPolygon(ctx, geometry.coordinates, canvasWidth, canvasHeight, fillColor, strokeColor, lineWidth);
    } else if (geometry.type === "LineString") {
      drawLineString(ctx, geometry.coordinates, canvasWidth, canvasHeight, strokeColor, lineWidth);
    } else if (geometry.type === "MultiLineString") {
      geometry.coordinates.forEach((lineString) => {
        drawLineString(ctx, lineString, canvasWidth, canvasHeight, strokeColor, lineWidth);
      });
    }
  });
}
