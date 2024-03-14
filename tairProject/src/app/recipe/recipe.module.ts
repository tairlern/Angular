import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesComponent } from './component/all-recipes/all-recipes.component';
import { AddRecipeComponent } from './component/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './component/recipe-details/recipe-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SmallRecipeComponent } from './component/small-recipe/small-recipe.component';
import { TimePipe } from "./time.pipe";
import { MatIconModule } from '@angular/material/icon';
import { EditRecipeComponent } from './component/edit-recipe/edit-recipe.component';


@NgModule({
    declarations: [
        SmallRecipeComponent, AllRecipesComponent, AddRecipeComponent, RecipeDetailsComponent,EditRecipeComponent
    ],
    exports: [RecipeRoutingModule],
    imports: [
        CommonModule, ReactiveFormsModule, RecipeRoutingModule, HttpClientModule, FormsModule,
        TimePipe,MatIconModule
       
    ]
})
export class RecipeModule { }
