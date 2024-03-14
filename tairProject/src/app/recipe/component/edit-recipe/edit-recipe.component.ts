import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeModule } from '../../recipe.module';
import { log } from 'console';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
 
    public recipe!: Recipe;
    public addForm!: FormGroup;
  
    constructor(private route: ActivatedRoute, private _recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router) { }
  
    ngOnInit(): void {
      this.addForm = this.formBuilder.group({
        id:[this.recipe?.id],
        categoryId: ['', [Validators.required]],
       preparationTime: ['', Validators.required],
        nameRecipe: ['', [Validators.required, Validators.minLength(3)]],
        urlImage: ['', [Validators.required, Validators.minLength(3)]],
        dateAdd :[Date.now],
        levelOfDifficulty: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
        preparation:  this.recipe?.preparation,//this.formBuilder.array([]),
        userId:[this.recipe?.userId],
        listIngredients: this.recipe?.listIngredients // this.formBuilder.array([]) Initialize listIngredients as a FormArray
        
      });
  
      let id = this.route.snapshot.queryParamMap.get('name');
      if (id) {
        let idNumber: number = parseInt(id, 10);
        this._recipeService.getRecipeById(idNumber).subscribe({
          next: (res) => {
            this.recipe = res;
console.log(res.listIngredients)
            this.addForm.patchValue({
              id:this.recipe.id,
              categoryId: this.recipe.categoryId || '',
              preparationTime: this.recipe.preparationTime || '',
              nameRecipe: this.recipe.nameRecipe || '',
              urlImage: this.recipe.urlImage || '',
              dateAdd:this.recipe.dateAdd,
              levelOfDifficulty: this.recipe.levelOfDifficulty || '',
              userId:this.recipe.userId,
              // Set listIngredients and preparation based on Recipe data
              listIngredients: res.listIngredients , // Assuming listIngredients is an array
              preparation: this.recipe.preparation || ['', '', ''] // Assuming preparation is an array,
             
            });
            console.log(this.addForm.value.listIngredients)
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

    onAddpreparation() {
      this.preparationArray.push(this.formBuilder.control(''));
    }

    cencel() {
      this.router.navigate(['/recipe-details'], { queryParams: { name: this.recipe.id } });
    }

    Save(){
this._recipeService.putRepcip(this.recipe.id,this.addForm.value).subscribe({
  next:(res)=>{
    console.log("sacssed put recipe")
    this.router.navigate(['../' + '/all-recipes'], {
      relativeTo: this.route
    })
  }})}

    
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
