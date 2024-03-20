import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../recipe.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../category.service';
import { Category } from '../../../models/category.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  private idn: number = 200;
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
  public categoryArry!: Category[];
  public userList!: User[];
  public user: User|undefined;
  inputFields: any = [''];
  inputFieldsP: any = [''];
  constructor(
    private _UserService: UserService,
    private _CategoryService: CategoryService,
    private route: ActivatedRoute,
    private _recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router) { }
    ngOnInit(): void {
      this._UserService.getUserFromServer().subscribe({
        next: (res) => {
          this.userList = res;
          this.user = this.userList.find(u => u.name == sessionStorage.getItem('name') && u.password == sessionStorage.getItem('password'));
    
          this._CategoryService.getCategoryFromServer().subscribe({
            next: (res) => {
              this.categoryArry = res;
              this.updateForm();
            },
            error: (res) => {
              console.log(res);
            }
          });
        }
      });
    }
    
    updateForm() {
      this.addForm = this.formBuilder.group({
        id: [this.idn + 1],
        categoryId: [this.categoryArry[0]?.id || null, [Validators.required]],
        preparationTime: ['' || null, [Validators.required]],
        nameRecipe: ['' || null, [Validators.required]],
        urlImage: ['' || null, [Validators.required]],
        dateAdd: [Date.now],
        levelOfDifficulty: [null || null, [Validators.required, Validators.min(1), Validators.max(5)]],
        userId: [this.user?.id],
        listIngredients: this.formBuilder.array([]),
        preparation: this.formBuilder.array([])
      });
    }
    
    save() {
        console.log(this.addForm.value);
        
        if (this.user && this.categoryArry.length > 0&&this.addForm.value.listIngredients.length>0&&this.addForm.value.preparation.length>0) {
          this._recipeService.addRecipe(this.addForm.value).subscribe({
            next: (res) => {
              this.router.navigate(['../' + '/all-recipes'], {
                relativeTo: this.route
              });
              Swal.fire({
                icon: "success",
                title: "The recipe was successfully added",
                showConfirmButton: false,
                timer: 1500
              });
            },
            error: (res) => {
              console.log(res)
            }
          });
        } else {
          console.log('User or category data not loaded yet.');

          Swal.fire({
            icon: "error",
            title: "The lists must be complete",
            showConfirmButton: false,
            timer: 1500
          });

        }
    }
    addEmptyInput(index: number) {
      const inputValue = (document.querySelectorAll('input')[index] as HTMLInputElement).value.trim();
      if (inputValue) {
        const listIngredients = this.addForm.get('listIngredients') as FormArray;
        listIngredients.push(this.formBuilder.control(inputValue));
      }
      this.inputFields.splice(index + 1, 0, '');
    }
    
    addEmptyInputP(index: number) {
      const inputValue = (document.querySelectorAll('input')[index] as HTMLInputElement).value.trim();
      if (inputValue) {
        const preparation = this.addForm.get('preparation') as FormArray;
        preparation.push(this.formBuilder.control(inputValue));
      }
      this.inputFieldsP.splice(index + 1, 0, '');
    }
  cencel() {
    this.router.navigate(['../' + '/all-recipes'], {
      relativeTo: this.route
    })

  }
}
