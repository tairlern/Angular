import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 public baseUrl="https://localhost:7090/api/Recipe";
  constructor(private http:HttpClient) { }
  getRecipeFromServer(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>("https://localhost:7090/api/Recipe")
  }
  addRecipe(recipe: Recipe): Observable<void> {
    // this.productsList.push(product)
    return this.http.post<void>("https://localhost:7090/api/Recipe", recipe)
  }
  getRecipeById(id: number): Observable<Recipe> {
    console.log("enter");
     
     return this.http.get<Recipe>(`https://localhost:7090/api/Recipe/${id}`)
  }
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7090/api/Recipe/${id}`);
  }
  putRepcip(id: number, recip: Recipe): Observable<void> {
    return this.http.put<void>(`https://localhost:7090/api/Recipe/${id}`, recip);
}
  
}
