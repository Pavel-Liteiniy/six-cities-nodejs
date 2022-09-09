export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  type: 'standard' | 'pro';
}
