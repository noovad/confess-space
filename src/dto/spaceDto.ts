export interface SpaceDto {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  description: string;
  member_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface SpaceListResponse {
  spaces: SpaceDto[];
  total: number;
  limit: number;
  page: number;
  total_pages: number;
}

