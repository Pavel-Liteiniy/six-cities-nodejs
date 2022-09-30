export type UserLevel = 'standard' | 'pro';

export type User = {
  name: string;
  email: string;
  avatarPath?: string;
  password: string;
  type: UserLevel;
}
