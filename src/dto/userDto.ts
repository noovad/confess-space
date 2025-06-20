export interface UserDto {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar_type: string | 'notionists' | 'bottts' | 'dylan' | 'micah' | 'croodles' | 'adventurer' | 'pixel-art';
}