import type { GeoCoords } from "@/lib/geolocation";

export type BuyerCategory =
  | "biogas"
  | "paper"
  | "mushroom"
  | "packaging"
  | "cattle"
  | "ethanol";

export type VerifiedBuyer = {
  id: string;
  name: string;
  type: string;
  location: string;
  latitude: number;
  longitude: number;
  pricePerTonne: number;
  rating: number;
  crops: string[];
  category: BuyerCategory;
  verified: boolean;
};

/** Verified buyers across Punjab, Haryana & Western UP (demo dataset). */
export const VERIFIED_BUYERS: VerifiedBuyer[] = [
  {
    id: "b1",
    name: "Green Energy Biogas",
    type: "Biogas plant",
    location: "Jalandhar, Punjab",
    latitude: 31.326,
    longitude: 75.5762,
    pricePerTonne: 17000,
    rating: 4.9,
    crops: ["rice", "wheat", "paddy"],
    category: "biogas",
    verified: true,
  },
  {
    id: "b2",
    name: "Dilli Paper Mill",
    type: "Paper industry",
    location: "Ludhiana, Punjab",
    latitude: 30.901,
    longitude: 75.8573,
    pricePerTonne: 11200,
    rating: 4.6,
    crops: ["rice", "wheat"],
    category: "paper",
    verified: true,
  },
  {
    id: "b3",
    name: "Sharma Mushroom Farm",
    type: "Mushroom farm",
    location: "Batala, Punjab",
    latitude: 31.8185,
    longitude: 75.203,
    pricePerTonne: 9600,
    rating: 4.8,
    crops: ["wheat", "paddy"],
    category: "mushroom",
    verified: true,
  },
  {
    id: "b4",
    name: "Punjab Bio-Pack Co.",
    type: "Packaging startup",
    location: "Amritsar, Punjab",
    latitude: 31.634,
    longitude: 74.8723,
    pricePerTonne: 14500,
    rating: 4.7,
    crops: ["rice", "maize", "sugarcane"],
    category: "packaging",
    verified: true,
  },
  {
    id: "b5",
    name: "Kapurthala Cattle Feed",
    type: "Cattle feed mill",
    location: "Kapurthala, Punjab",
    latitude: 31.3801,
    longitude: 75.382,
    pricePerTonne: 8800,
    rating: 4.5,
    crops: ["wheat", "maize"],
    category: "cattle",
    verified: true,
  },
  {
    id: "b6",
    name: "North India Ethanol Hub",
    type: "Ethanol distillery",
    location: "Bathinda, Punjab",
    latitude: 30.211,
    longitude: 74.9455,
    pricePerTonne: 15200,
    rating: 4.8,
    crops: ["sugarcane", "maize"],
    category: "ethanol",
    verified: true,
  },
  {
    id: "b7",
    name: "Ambala Agro Energy",
    type: "Biogas plant",
    location: "Ambala, Haryana",
    latitude: 30.3782,
    longitude: 76.7767,
    pricePerTonne: 16500,
    rating: 4.7,
    crops: ["rice", "paddy", "wheat"],
    category: "biogas",
    verified: true,
  },
  {
    id: "b8",
    name: "Karnal Stubble Solutions",
    type: "Paper & pulp",
    location: "Karnal, Haryana",
    latitude: 29.6857,
    longitude: 76.9905,
    pricePerTonne: 11800,
    rating: 4.6,
    crops: ["rice", "wheat"],
    category: "paper",
    verified: true,
  },
  {
    id: "b9",
    name: "Rohtak Green Mills",
    type: "Biomass power",
    location: "Rohtak, Haryana",
    latitude: 28.8955,
    longitude: 76.6066,
    pricePerTonne: 14200,
    rating: 4.5,
    crops: ["paddy", "wheat", "maize"],
    category: "biogas",
    verified: true,
  },
  {
    id: "b10",
    name: "Meerut Packaging Works",
    type: "Packaging industry",
    location: "Meerut, UP",
    latitude: 28.9845,
    longitude: 77.7064,
    pricePerTonne: 10900,
    rating: 4.4,
    crops: ["wheat", "rice"],
    category: "packaging",
    verified: true,
  },
  {
    id: "b11",
    name: "Panipat Energy Park",
    type: "Biogas plant",
    location: "Panipat, Haryana",
    latitude: 29.3909,
    longitude: 76.9635,
    pricePerTonne: 16800,
    rating: 4.9,
    crops: ["rice", "paddy", "sugarcane"],
    category: "biogas",
    verified: true,
  },
  {
    id: "b12",
    name: "Saharanpur Fodder Co.",
    type: "Cattle feed",
    location: "Saharanpur, UP",
    latitude: 29.968,
    longitude: 77.551,
    pricePerTonne: 9200,
    rating: 4.5,
    crops: ["wheat", "maize"],
    category: "cattle",
    verified: true,
  },
];

const EARTH_RADIUS_KM = 6371;

/** Great-circle distance in kilometres (Haversine). */
export function distanceKm(a: GeoCoords, b: { latitude: number; longitude: number }): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

export type NearbyBuyer = VerifiedBuyer & { distanceKm: number };

/** Default centre when GPS is unavailable (Amritsar, Punjab). */
export const DEFAULT_FARM_COORDS: GeoCoords = {
  latitude: 31.634,
  longitude: 74.8723,
};

export function getNearbyBuyers(
  coords: GeoCoords,
  maxRadiusKm = 150,
  cropFilter?: string,
): NearbyBuyer[] {
  return VERIFIED_BUYERS.map((buyer) => ({
    ...buyer,
    distanceKm: distanceKm(coords, buyer),
  }))
    .filter((b) => b.distanceKm <= maxRadiusKm)
    .filter((b) => !cropFilter || b.crops.includes(cropFilter))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  return `${Math.round(km)} km away`;
}
