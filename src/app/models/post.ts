import { User } from './user';

export class BackendPost {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  userId: string;
  comments?: string[];
}

export class Post extends BackendPost {
  user: User;
}
