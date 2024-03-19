import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';
import { AllRecipesComponent } from './component/all-recipes/all-recipes.component';
import { RecipeDetailsComponent } from './component/recipe-details/recipe-details.component';
import { EditRecipeComponent } from './component/edit-recipe/edit-recipe.component';
import { recipGuard } from '../recip.guard';
// import { recipGuard } from '../recip.guard';



const RECIPE_ROUTES: Route[] = [
  { path: '', redirectTo: 'add-recipe', pathMatch: 'full' },
  { path: 'add-recipe', component: AddRecipeComponent,canActivate: [recipGuard]},
  { path: 'all-recipes', component: AllRecipesComponent },
  { path: 'recipe-details', component: RecipeDetailsComponent ,canActivate: [recipGuard]},
  { path: 'edit-recipe', component: EditRecipeComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(RECIPE_ROUTES)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }

// /**canActivate: [recipGuard] */
