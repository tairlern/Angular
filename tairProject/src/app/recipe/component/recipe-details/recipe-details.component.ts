import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  public recipe!: Recipe;
  public isUser: boolean = false;
  public category!:Category;
  @Output() recipeDeleted: EventEmitter<void> = new EventEmitter<void>();
  constructor(private router: Router, private _recipeService: RecipeService, private route: ActivatedRoute, private _usrService: UserService,private _CategoryService:CategoryService) { }
  ngOnInit(): void {
    let user!: User;
    let idNumber!: number;
let n !:Recipe;
    const idString = this.route.snapshot.queryParamMap.get('name');
    console.log(idString, "param")


    if (idString) {
      idNumber = parseInt(idString, 10);
      console.log(idNumber, "param")
      this._recipeService.getRecipeById(idNumber).subscribe({
        next: (res) => {
          this.recipe = res;
          console.log(this.recipe, "recipe");
      
          // move the remaining code that depends on this.recipe inside this block
          this._usrService.getUserById(this.recipe?.userId).subscribe({
            next: (usrRes) => {
              console.log("this.recipe?.userId",this.recipe?.userId)
              console.log(usrRes, "enter", "g");
              user = usrRes;
              console.log(user,"user");
      
              console.log(this.recipe);
              console.log(this.isUser);
              console.log(user?.name, sessionStorage.getItem('name'), user?.password, sessionStorage.getItem('password'));
      
              if (user?.name == sessionStorage.getItem('name') && user?.password == sessionStorage.getItem('password')) {
                this.isUser = true;
                console.log(this.isUser,"ressssult");
              }
            },
            error: (err) => {
              console.log(err);
            }
          });
          this._CategoryService.getCategoryById(this.recipe?.categoryId).subscribe({
            next:(res)=>{
              console.log("res category",res)
              this.category=res;
            }
          })
        },
        error: (err) => {
          console.log(err);
        }
      });
     
    }
  }
  cencel() {
    this.router.navigate(['../' + '/all-recipes'], {
      relativeTo: this.route
    })

  }
  deleteRecipe(): void {
    this._recipeService.deleteById(this.recipe.id).subscribe({
      next: (res) => {
        console.log("Recipe deleted successfully");
        this.recipeDeleted.emit(); // Notify parent component
        this.router.navigate(['../' + '/all-recipes'], {
          relativeTo: this.route
        })
      },
      error: (err) => {
        console.error("Error deleting recipe:", err);
      }
    });}
  editRecipe(){
    this.router.navigate(['../' + '/edit-recipe'], {
      relativeTo: this.route, 
      queryParams: { name: this.recipe.id }
    } )
  }
}



