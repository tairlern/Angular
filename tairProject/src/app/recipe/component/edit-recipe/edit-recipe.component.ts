import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  public recipe!: Recipe;
  public addForm: FormGroup = this.formBuilder.group({
    id: [''],
    categoryId: [''],
    preparationTime: [''],
    nameRecipe: [''],
    urlImage: [''],
    dateAdd: [''],
    levelOfDifficulty: [''],
    userId: [''],
    listIngredients: this.formBuilder.array([]),
    preparation: this.formBuilder.array([])
  });

  constructor(private route: ActivatedRoute, private _recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('name');
    if (id) {
      let idNumber: number = parseInt(id, 10);
      this._recipeService.getRecipeById(idNumber).subscribe({
        next: (res) => {
          this.recipe = res;
          this.addForm = this.formBuilder.group({
            id: [this.recipe?.id],
            categoryId: [this.recipe?.categoryId || ''],
            preparationTime: [this.recipe?.preparationTime || ''],
            nameRecipe: [this.recipe?.nameRecipe || ''],
            urlImage: [this.recipe?.urlImage || ''],
            dateAdd: [this.recipe?.dateAdd || ''],
            levelOfDifficulty: [this.recipe?.levelOfDifficulty || ''],
            userId: [this.recipe?.userId],
            listIngredients: this.formBuilder.array(this.recipe?.listIngredients.map(ingredient => this.formBuilder.control(ingredient))),
            preparation: this.formBuilder.array(this.recipe?.preparation.map(step => this.formBuilder.control(step)))
          });
        },
        error:(res)=>
        {
          console.log("error",res)
        }
      });
    }
  }

  get listIngredients(): FormArray {
    return this.addForm.get('listIngredients') as FormArray;
  }

  get preparationArray(): FormArray {
    return this.addForm.get('preparation') as FormArray;
  }

  onAddIngredient() {
    this.listIngredients.push(this.formBuilder.control(''));
  }

  onAddPreparation() {
    this.preparationArray.push(this.formBuilder.control(''));
  }

  cancel() {
    this.router.navigate(['/recipe-details'], { queryParams: { name: this.recipe.id } });
  }

  save() {
    console.log("post addfrom",this.addForm?.value)
    this._recipeService.putRepcip(this.recipe.id, this.addForm.value).subscribe({
      next: (res) => {
        console.log("Successfully updated recipe");
        this.router.navigate(['../all-recipes'], { relativeTo: this.route });
      }
    });
  }

  updateIngredient(index: number, value: string) {
    const control = this.listIngredients.at(index) as FormControl;
    if (control) {
      control.patchValue(value);
    }
  }

  removeIngredient(index: number) {
    this.listIngredients.removeAt(index);
  }
}