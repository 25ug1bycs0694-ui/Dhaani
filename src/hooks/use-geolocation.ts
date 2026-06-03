import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCurrentCoordinates,
  GeolocationError,
  type GeoCoords,
  type GeolocationErrorCode,
} from "@/lib/geolocation";

type UseGeolocationOptions = {
  /** Automatically request location when the hook mounts (or when enabled flips to true). */
  autoDetect?: boolean;
};

export function useGeolocation({ autoDetect = false }: UseGeolocationOptions = {}) {
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<GeolocationErrorCode | null>(null);
  const hasAutoDetected = useRef(false);

  const detect = useCallback(async () => {
    setLoading(true);
    setErrorCode(null);
    try {
      const position = await getCurrentCoordinates();
      setCoords(position);
      return position;
    } catch (err) {
      const code = err instanceof GeolocationError ? err.code : "unknown";
      setErrorCode(code);
      setCoords(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoDetect || hasAutoDetected.current) return;
    hasAutoDetected.current = true;
    void detect();
  }, [autoDetect, detect]);

  const resetAutoDetect = useCallback(() => {
    hasAutoDetected.current = false;
  }, []);

  return { coords, loading, errorCode, detect, resetAutoDetect };
}
