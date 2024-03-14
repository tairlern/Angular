import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../recipe.service';
import { RecipeModule } from '../../recipe.module';
@Component({
    selector: 'app-all-recipes',
    templateUrl: './all-recipes.component.html',
    styleUrl: './all-recipes.component.css',
})
export class AllRecipesComponent implements OnInit{
    public listRecipe: Recipe[]=[];
   public selectedRecipe!: Recipe;

    
    constructor(private _recipeService: RecipeService) { }
    ngOnInit(): void {
        this._recipeService.getRecipeFromServer().subscribe({
            next: (res) => {
                console.log("sucssid to get list")
                this.listRecipe = res;
                console.log(this.listRecipe)
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
    onRecipeDeleted(): void {
        this._recipeService.getRecipeFromServer().subscribe({
          next: (res) => {
            console.log("Successfully refreshed list after delete");
            this.listRecipe = res;
            console.log(this.listRecipe);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
}
