export class Post {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  userId: string;
  comments?: string[];
}
