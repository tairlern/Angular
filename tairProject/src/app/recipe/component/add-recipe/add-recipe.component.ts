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
  private idn:number=200; 
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
  public categoryArry!:Category[];
public userList!:User[];
public user!:User;
inputFields: any = [''];
inputFieldsP: any = [''];
  constructor(
    private _UserService:UserService,
    private _CategoryService:CategoryService,
    private route: ActivatedRoute, 
    private _recipeService: RecipeService, 
    private formBuilder: FormBuilder, 
    private router: Router) { }
  ngOnInit(): void {
this._UserService.getUserFromServer().subscribe({
  next:(res)=>{
    this.userList=res;
    this.user!=this.userList.find(u=>u.name==sessionStorage.getItem('name')&&u.password==sessionStorage.getItem('password'))||null;
    this._CategoryService.getCategoryFromServer().subscribe({
      next:(res)=>{
        this.categoryArry=res;
      },
      error:(res)=>{
        console.log(res);
      }
    })
   
    this.addForm = this.formBuilder.group({
      id: [this.idn+1],
      categoryId: [ ''||null,[Validators.required]],
      preparationTime: [ ''||null,[Validators.required]],
      nameRecipe: [ ''||null,[Validators.required]],
      urlImage: [ ''||null,[Validators.required]],
      dateAdd: [Date.now],
      levelOfDifficulty: [null||null, [Validators.required, Validators.min(1), Validators.max(5)]],
      userId: [this.user?.id],
      // listIngredients: this.formBuilder.array(this.recipe?.listIngredients.map(ingredient => this.formBuilder.control(ingredient))),
      // preparation: this.formBuilder.array(this.recipe?.preparation.map(step => this.formBuilder.control(step)))
    });
  
  }

})
  }
  addEmptyInput(index: number) {
    this.inputFields.splice(index + 1, 0, ''); // Add a new empty input after the clicked input
  }
  addEmptyInputP(index: number) {
    this.inputFieldsP.splice(index + 1, 0, ''); // Add a new empty input after the clicked input
  }
}
