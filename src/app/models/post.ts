export class Post {
  created: Date;
  constructor(public title: string, public content: string) {
    this.created = new Date();
  }
}
