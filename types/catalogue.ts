export type VerificationStatus = "unverified" | "verified";

export interface CarMake {
  id: string;
  name: string;
  slug: string;
  country_origin: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarModel {
  id: string;
  make_id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  source_type: string | null;
  source_name: string | null;
  source_url: string | null;
  verification_status: VerificationStatus;
  verified_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarGeneration {
  id: string;
  model_id: string;
  name: string;
  year_start: number | null;
  year_end: number | null;
  body_type: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarVersion {
  id: string;
  generation_id: string;
  name: string;
  engine_description: string | null;
  source_type: string | null;
  source_name: string | null;
  source_url: string | null;
  verification_status: VerificationStatus;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarModelWithMake extends CarModel {
  car_makes: Pick<CarMake, "id" | "name" | "slug"> | null;
}
