import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Post {
  username: string;
  imageUrl: string;
  text: string;
  likes: any[];
  comments: any[];
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  saveNewPost(post: any) {
    return this.http.post('http://localhost:3000/posts', post);
  }

  getPost() {
    return this.http.get('http://localhost:3000/posts');
  }
}
