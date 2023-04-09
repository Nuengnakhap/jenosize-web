import api from "../api";

export type Restaurant = {
  business_status: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos?: Photo[];
  place_id: string;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
  plus_code?: PlusCode;
  price_level?: number;
};

type Geometry = {
  location: Location;
  viewport: Viewport;
};

type Location = {
  lat: number;
  lng: number;
};

type Viewport = {
  northeast: Location;
  southwest: Location;
};

type OpeningHours = {
  open_now: boolean;
};

type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

type PlusCode = {
  compound_code: string;
  global_code: string;
};

export function restaurant(data: { query: string }) {
  return api.post<Restaurant[]>("/search/restaurant", data);
}
