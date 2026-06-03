import { useEffect, useState } from "react";

export interface AQIData {
  aqi: number;
  level: string;
  healthTitle: string;
  healthDesc: string;
  trendTitle: string;
  trendDesc: string;
  lastUpdated: string;
  city: string;
  pm25?: number;
  pm10?: number;
  no2?: number;
  co?: number;
  o3?: number;
  so2?: number;
  temp?: number;
  humidity?: number;
}

function getAQILevel(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 150) return "Lightly Polluted";
  if (aqi <= 200) return "Moderately Polluted";
  if (aqi <= 300) return "Heavily Polluted";
  return "Severe";
}

function getHealthAdvice(aqi: number): { title: string; desc: string } {
  if (aqi <= 50) {
    return {
      title: "Air Quality Good",
      desc: "Air quality is satisfactory. Enjoy outdoor activities.",
    };
  }
  if (aqi <= 100) {
    return {
      title: "Air Quality Acceptable",
      desc: "Air quality is acceptable. Sensitive individuals should limit prolonged activities.",
    };
  }
  if (aqi <= 150) {
    return {
      title: "Sensitive Groups",
      desc: "Members of sensitive groups may experience health effects. Reduce prolonged activities.",
    };
  }
  if (aqi <= 200) {
    return {
      title: "Health Advisory",
      desc: "Everyone may begin to experience health effects. Reduce outdoor activities.",
    };
  }
  if (aqi <= 300) {
    return {
      title: "Health Alert",
      desc: "Health warning of emergency conditions. Everyone should avoid outdoor activities.",
    };
  }
  return {
    title: "Health Emergency",
    desc: "Hazardous air quality. Avoid all outdoor activities immediately.",
  };
}

function getTrendInfo(aqi: number): { title: string; desc: string } {
  if (aqi <= 50) {
    return {
      title: "Pollution Trend",
      desc: "Air quality is improving. Conditions are favorable.",
    };
  }
  if (aqi <= 100) {
    return {
      title: "Pollution Trend",
      desc: "Air quality is stable with minor variations.",
    };
  }
  return {
    title: "Pollution Alert",
    desc: "High pollution levels detected. Check local advisories.",
  };
}

export function getMockAQIData(city: string): AQIData {
  const defaults: Record<string, { aqi: number; temp: number; humidity: number }> = {
    "Delhi": { aqi: 247, temp: 34, humidity: 42 },
    "Amritsar": { aqi: 134, temp: 31, humidity: 55 },
    "Ludhiana": { aqi: 162, temp: 32, humidity: 50 },
    "Rohtak": { aqi: 156, temp: 33, humidity: 48 },
    "Lucknow": { aqi: 188, temp: 35, humidity: 40 },
  };

  const mockInfo = defaults[city] || defaults["Delhi"];
  const aqi = mockInfo.aqi;
  const level = getAQILevel(aqi);
  const { title: healthTitle, desc: healthDesc } = getHealthAdvice(aqi);
  const { title: trendTitle, desc: trendDesc } = getTrendInfo(aqi);

  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    aqi,
    level,
    healthTitle,
    healthDesc,
    trendTitle,
    trendDesc,
    lastUpdated,
    city,
    pm25: aqi,
    pm10: Math.round(aqi * 1.3),
    no2: Math.round(15 + aqi * 0.1),
    co: Math.round((0.4 + aqi * 0.005) * 10) / 10,
    o3: Math.round(20 + aqi * 0.12),
    so2: Math.round(5 + aqi * 0.04),
    temp: mockInfo.temp,
    humidity: mockInfo.humidity,
  };
}

export async function fetchAQIData(city: string = "Delhi"): Promise<AQIData | null> {
  try {
    const apiKey = import.meta.env.VITE_WAQI_API_KEY;
    if (!apiKey) {
      console.warn("VITE_WAQI_API_KEY is not defined. Falling back to mock data.");
      return getMockAQIData(city);
    }

    const response = await fetch(
      `https://api.waqi.info/feed/${city}/?token=${apiKey}`,
      { mode: "cors" }
    );

    if (!response.ok) throw new Error("Failed to fetch AQI data");

    const data = await response.json();

    if (data.status !== "ok" || !data.data) {
      console.warn(`WAQI API status not OK or no data. Falling back to mock data for ${city}.`);
      return getMockAQIData(city);
    }

    const aqi = Math.round(data.data.aqi);
    const level = getAQILevel(aqi);
    const { title: healthTitle, desc: healthDesc } = getHealthAdvice(aqi);
    const { title: trendTitle, desc: trendDesc } = getTrendInfo(aqi);

    const lastUpdated = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const iaqi = data.data.iaqi || {};
    const pm25 = iaqi.pm25 ? Math.round(iaqi.pm25.v) : aqi;
    const pm10 = iaqi.pm10 ? Math.round(iaqi.pm10.v) : Math.round(aqi * 1.3);
    const no2 = iaqi.no2 ? Math.round(iaqi.no2.v) : Math.round(15 + aqi * 0.1);
    const co = iaqi.co ? Math.round(iaqi.co.v * 10) / 10 : Math.round((0.4 + aqi * 0.005) * 10) / 10;
    const o3 = iaqi.o3 ? Math.round(iaqi.o3.v) : Math.round(20 + aqi * 0.12);
    const so2 = iaqi.so2 ? Math.round(iaqi.so2.v) : Math.round(5 + aqi * 0.04);
    
    // weather
    const temp = iaqi.t ? Math.round(iaqi.t.v) : undefined;
    const humidity = iaqi.h ? Math.round(iaqi.h.v) : undefined;

    return {
      aqi,
      level,
      healthTitle,
      healthDesc,
      trendTitle,
      trendDesc,
      lastUpdated,
      city,
      pm25,
      pm10,
      no2,
      co,
      o3,
      so2,
      temp,
      humidity
    };
  } catch (error) {
    console.error("Error fetching AQI data, falling back to mock:", error);
    return getMockAQIData(city);
  }
}

export function useAQI(city: string = "Delhi", refreshInterval: number = 600000) {
  const [data, setData] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchAQIData(city);
      if (!active) return;
      if (result) {
        setData(result);
        setError(null);
      } else {
        setError("Unable to fetch AQI data");
      }
      setLoading(false);
    };

    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [city, refreshInterval]);

  return { data, loading, error };
}
