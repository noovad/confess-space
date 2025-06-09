export interface UserDto {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarType: string | 'notionists' | 'bottts' | 'dylan' | 'micah' | 'croodles' | 'adventurer' | 'pixel-art';
}