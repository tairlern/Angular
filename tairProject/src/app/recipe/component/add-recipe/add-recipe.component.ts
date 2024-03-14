import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  public recipe!: Recipe;
  public addForm!: FormGroup;
  selectedPreparation!: string; 
  private idn:number=200;
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
      preparation: this.formBuilder.array([]),
      userId:[this.recipe?.userId],
      listIngredients: this.formBuilder.array([]) // Initialize listIngredients as a FormArray
    });

    let id = this.route.snapshot.queryParamMap.get('name');
    if (id) {
      let idNumber: number = parseInt(id, 10);
      this._recipeService.addRecipe(this.recipe).subscribe({
        next: (res) => {
          console.log("sacssed")
          Swal.fire({
            icon: "success",
            title: "The recipe has been successfully added",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['../' + '/all-recipes'], {
            relativeTo: this.route
          })
        }
      });
    }
  }
  get per():FormArray{
    return this.addForm.get('preparation') as FormArray;
  }



  onAddPreparation() {
    console.log("focus");
    this.per.push(this.formBuilder.control(''));
}
}
