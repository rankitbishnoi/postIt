import { Injectable } from '@angular/core';
import { Post } from '../../../models/post.modal';
import { User } from '../../../models/user.modal';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private postList: Post[] = [];
  private allPostFetched = false;

  private userList: User[] = [];
  private allUsersFetched = false;
  constructor() {}

  getPostFetchingStatus(): boolean {
    return this.allPostFetched;
  }

  getAllPosts(): Post[] {
    return this.postList;
  }

  getPostById(id: number): Post {
    return this.postList.find(post => post.id === id);
  }

  savePostList(list: Post[]) {
    this.postList = [...list];
    this.allPostFetched = list.length > 1 ? true : false;
  }

  addNewPost(post: Post) {
    this.postList.push({ ...post });
  }

  deletePost(postId: number) {
    const index = this.postList.findIndex(post => postId === post.id);
    if (index && index >= 0) {
      this.postList.splice(index, 1);
    }
  }

  updatePost(data: Post) {
    const index = this.postList.findIndex(post => data.id === post.id);
    this.postList[index].title = data.title;
    this.postList[index].body = data.body;
    this.postList[index].userId = data.userId;
  }

  getUserFetchingStatus(): boolean {
    return this.allUsersFetched;
  }

  getAllUsers(): User[] {
    return this.userList;
  }

  saveUserList(list: User[]) {
    this.userList = [...list];
    this.allUsersFetched = list.length > 1 ? true : false;
  }

  getUserById(id: number): User {
    return this.userList.find(user => user.id === id);
  }
}
