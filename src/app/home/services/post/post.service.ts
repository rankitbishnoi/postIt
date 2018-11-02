import { Injectable } from '@angular/core';
import { Post } from '../../../../models/post.modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StoreService } from '../../store/store.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public baseUrl = 'https://jsonplaceholder.typicode.com';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    })
  };
  constructor(private http: HttpClient, private store: StoreService) {}

  // to fetch all posts from API
  getAllPosts(): Observable<Post[]> {
    // check if they are already fetched
    // if true pass on the saved list
    if (this.store.getPostFetchingStatus()) {
      return of(this.store.getAllPosts());
    }

    // fetch from server
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      tap(response => {
        this.store.savePostList(response);
      }),
      catchError(this.Errorhandling('getAllPosts', []))
    );
  }

  // to Post By ID
  getPostById(id: number): Observable<Post> {
    // check if they are already fetched
    // if true pass on the saved list
    const tempPostObj = this.store.getPostById(id);
    if (tempPostObj) {
      return of(tempPostObj);
    }

    // fetch from server
    return this.http
      .get<Post>(`${this.baseUrl}/posts/${id}`)
      .pipe(catchError(this.Errorhandling('getPostById', null)));
  }

  createPost(title: string, body: string, authorId: number): Observable<Post> {
    const dataObj = {};

    return this.http.post<Post>(
      `${this.baseUrl}/posts`,
      dataObj,
      this.httpOptions
    );
  }

  updatePost(data: Post): Observable<Post> {
    return this.http.put<Post>(
      `${this.baseUrl}/posts/${data.id}`,
      data,
      this.httpOptions
    );
  }

  deletePost(postId: number) {
    return this.http.delete(`${this.baseUrl}/posts/${postId}`);
  }

  // handle error during api fetch, console the error and return observable to let the app running
  private Errorhandling<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
