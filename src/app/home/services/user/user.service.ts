import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../../../models/user.modal';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient, private store: StoreService) {}

  // to fetch all Users from API
  getAllUsers(): Observable<User[]> {
    // check if they are already fetched
    // if true pass on the saved list
    if (this.store.getUserFetchingStatus()) {
      return of(this.store.getAllUsers());
    }

    // fetch from server
    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      tap(response => {
        this.store.saveUserList(response);
      }),
      catchError(this.Errorhandling('getAllPosts', []))
    );
  }

  // handle error during api fetch, console the error and return observable to let the app running
  private Errorhandling<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
