import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../../models/recipe.model';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrls: ['./small-recipe.component.css']
})

export class SmallRecipeComponent implements OnInit {

  @Input() selectedRecipe!: Recipe;
  public category!:Category
  constructor(private _CategoryService:CategoryService,private router: Router){}
  ngOnInit(): void {

    this._CategoryService.getCategoryById(this.selectedRecipe.categoryId).subscribe({
      next: (res) => {
          this.category = res;
      },
      error: (err) => {
          console.log(err);
      }
  });
  }
  view(){
    this.router.navigate(['/recipe-details'], { queryParams: { name: this.selectedRecipe.id } })
  }
}