import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../recipe.service';
import { RecipeModule } from '../../recipe.module';
import { CategoryService } from '../../category.service';
import { Category } from '../../../models/category.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
    selector: 'app-all-recipes',
    templateUrl: './all-recipes.component.html',
    styleUrls: ['./all-recipes.component.css'],
})
export class AllRecipesComponent implements OnInit {
    public listRecipe: Recipe[] = [];
    public listCategory: Category[] = [];
    public selectedRecipe!: Recipe;
    public showElement = false;
    public selectForm: FormGroup = this.formBuilder.group({
        categoryId: [''],
        preparationTime: [''],
        nameRecipe: [''],
    });;
    public listRecipeName: string[] = [];
    public listRecipetime: number[] = [];


    constructor(private _recipeService: RecipeService, private _CateroryService: CategoryService, private formBuilder: FormBuilder,) { }
    ngOnInit(): void {
        this._recipeService.getRecipeFromServer().subscribe({
            next: (res) => {
                console.log("Successfully retrieved list");
                this.listRecipe = res;
                const recipeNamesSet = new Set<string>(this.listRecipe.map((recipe) => recipe.nameRecipe));
                const preparationTimesSet = new Set<number>(this.listRecipe.map((recipe) => recipe.preparationTime));
                this.listRecipeName = Array.from(recipeNamesSet);
                this.listRecipetime = Array.from(preparationTimesSet);
            },
            error: (err) => {
                console.log(err);
            }
        });
    
        this._CateroryService.getCategoryFromServer().subscribe({
            next: (res) => {
                this.listCategory = res;
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
    openModal(): void {
        this.showElement = !this.showElement;
        if (this.showElement) {
            this._recipeService.getRecipeFromServer().subscribe({
                next: (res) => {
                    console.log("sucssid to get list")
                    this.listRecipe = res
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }
    }
    submit() {

        this._recipeService.getRecipeFromServer().subscribe({
            next: (res) => {
                console.log("sucssid to get list")
                this.listRecipe = res.filter(u =>
                    (!this.selectForm.value.nameRecipe || u.nameRecipe == this.selectForm.value.nameRecipe) &&
                    (!this.selectForm.value.categoryId || u.categoryId == this.selectForm.value.categoryId) &&
                    (!this.selectForm.value.preparationTime || u.preparationTime == this.selectForm.value.preparationTime)
                );
                this.showElement = !this.showElement;
                this.selectForm = this.formBuilder.group({
                    categoryId: [''],
                    preparationTime: [''],
                    nameRecipe: [''],
                });

            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
