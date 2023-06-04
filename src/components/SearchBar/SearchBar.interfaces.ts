export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1_code?: string;
  admin2_code?: string;
  admin3_code?: string;
  admin4_code?: string;
  timezone?: string;
  population?: number;
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  postcodes?: string[];
}
