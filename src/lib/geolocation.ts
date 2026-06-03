export type GeoCoords = {
  latitude: number;
  longitude: number;
};

export type GeolocationErrorCode =
  | "unsupported"
  | "denied"
  | "unavailable"
  | "timeout"
  | "unknown";

export class GeolocationError extends Error {
  code: GeolocationErrorCode;

  constructor(code: GeolocationErrorCode, message?: string) {
    super(message ?? code);
    this.name = "GeolocationError";
    this.code = code;
  }
}

const GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 15_000,
  maximumAge: 60_000,
};

function mapPositionError(error: GeolocationPositionError): GeolocationError {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return new GeolocationError("denied");
    case error.POSITION_UNAVAILABLE:
      return new GeolocationError("unavailable");
    case error.TIMEOUT:
      return new GeolocationError("timeout");
    default:
      return new GeolocationError("unknown");
  }
}

/** Request the device's current position via the browser Geolocation API. */
export function getCurrentCoordinates(): Promise<GeoCoords> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new GeolocationError("unsupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(mapPositionError(error)),
      GEO_OPTIONS,
    );
  });
}
