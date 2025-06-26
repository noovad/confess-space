export interface MessageDto {
  id: string;
  space_id: string;
  space: {
    id: string;
    name: string;
    slug: string;
    description: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
  };
  user_id: string;
  user: {
    id: string;
    username: string;
    name: string;
    email: string;
    avatar_type: string;
    created_at: string;
    updated_at: string;
  };
  content: string;
  created_at: string;
  updated_at: string;
}
