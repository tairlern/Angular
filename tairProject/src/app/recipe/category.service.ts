import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public baseUrl="https://localhost:7090/api/Category";
  constructor(private http:HttpClient) { }
  getCategoryFromServer(): Observable<Category[]>{
    return this.http.get<Category[]>("https://localhost:7090/api/Category")
  }
  addRecipe(category: Category): Observable<Category[]> {
    // this.productsList.push(product)
    return this.http.post<Category[]>("https://localhost:7090/api/Category", category)
  }
  getCategoryById(id: number): Observable<Category> {
    console.log("enter to getCategoryById",id)
    return this.http.get<Category>(`https://localhost:7090/api/Category/${id}`)
  }
}
