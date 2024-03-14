import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl="https://localhost:7090/api/User";

  constructor(private http:HttpClient) { }
  getUserFromServer(): Observable<User[]>{
    return this.http.get<User[]>("https://localhost:7090/api/User")
  }
  addUser(user: User): Observable<User[]> {
    // this.productsList.push(product)
    return this.http.post<User[]>("https://localhost:7090/api/User", user)
  }
  getUserById(id: number): Observable<User> {
    // const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(`https://localhost:7090/api/User/${id}`)
  }

}
